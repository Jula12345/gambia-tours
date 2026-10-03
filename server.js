const http = require("node:http");
const crypto = require("node:crypto");
const path = require("node:path");
const fs = require("node:fs");
const fsp = require("node:fs/promises");

const ROOT = __dirname;
const SESSION_TTL_SECONDS = 8 * 60 * 60;
const MAX_BODY_BYTES = 64 * 1024;
const loginAttempts = new Map();
const submissionAttempts = new Map();

loadEnvFile(path.join(ROOT, ".env"));

const PORT = Number(process.env.PORT || 3000);
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const SESSION_SECRET = process.env.SESSION_SECRET;
const FORM_RECIPIENT_EMAIL = process.env.FORM_RECIPIENT_EMAIL || "info@gambiantour.com";
const DATA_FILE = path.resolve(ROOT, process.env.DATA_FILE || "data/submissions.jsonl");
const DISABLE_EMAIL_FORWARDING = process.env.DISABLE_EMAIL_FORWARDING === "true";
const USE_BLOB_STORAGE = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

const CONFIG_ERROR = !ADMIN_USERNAME || !ADMIN_PASSWORD || !SESSION_SECRET
  ? "Missing ADMIN_USERNAME, ADMIN_PASSWORD or SESSION_SECRET."
  : SESSION_SECRET.length < 32
    ? "SESSION_SECRET must be at least 32 characters long."
    : "";

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".mp4": "video/mp4",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8"
};

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separator = trimmed.indexOf("=");
    if (separator < 1) continue;
    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

function sendJson(response, status, payload, extraHeaders = {}) {
  const body = JSON.stringify(payload);
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    "Cache-Control": "no-store",
    ...extraHeaders
  });
  response.end(body);
}

function clientIp(request) {
  return String(request.headers["x-forwarded-for"] || request.socket.remoteAddress || "unknown").split(",")[0].trim();
}

function isRateLimited(bucket, key, limit, windowMs) {
  const now = Date.now();
  const recent = (bucket.get(key) || []).filter((timestamp) => now - timestamp < windowMs);
  recent.push(now);
  bucket.set(key, recent);
  return recent.length > limit;
}

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(String(left || ""));
  const rightBuffer = Buffer.from(String(right || ""));
  return leftBuffer.length === rightBuffer.length && crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function parseCookies(request) {
  return Object.fromEntries(
    String(request.headers.cookie || "")
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const index = part.indexOf("=");
        return [part.slice(0, index), decodeURIComponent(part.slice(index + 1))];
      })
  );
}

function sign(value) {
  return crypto.createHmac("sha256", SESSION_SECRET).update(value).digest("base64url");
}

function createSession() {
  const payload = Buffer.from(
    JSON.stringify({ user: ADMIN_USERNAME, expiresAt: Date.now() + SESSION_TTL_SECONDS * 1000 })
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

function validSession(request) {
  const token = parseCookies(request).gt_admin_session;
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature || !safeEqual(sign(payload), signature)) return false;
  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return session.user === ADMIN_USERNAME && Number(session.expiresAt) > Date.now();
  } catch {
    return false;
  }
}

function sessionCookie(token, request, maxAge = SESSION_TTL_SECONDS) {
  const secure = request.headers["x-forwarded-proto"] === "https" || request.socket.encrypted;
  return `gt_admin_session=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${secure ? "; Secure" : ""}`;
}

function sameOrigin(request) {
  const origin = request.headers.origin;
  if (!origin) return true;
  try {
    return new URL(origin).host === request.headers.host;
  } catch {
    return false;
  }
}

async function readJson(request) {
  if (request.body !== undefined && request.body !== null) {
    let value;
    try {
      value = typeof request.body === "string" ? JSON.parse(request.body || "{}") : request.body;
    } catch {
      throw Object.assign(new Error("Invalid JSON."), { status: 400 });
    }
    if (Buffer.byteLength(JSON.stringify(value)) > MAX_BODY_BYTES) {
      throw Object.assign(new Error("Request is too large."), { status: 413 });
    }
    return value;
  }

  let size = 0;
  const chunks = [];
  for await (const chunk of request) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) throw Object.assign(new Error("Request is too large."), { status: 413 });
    chunks.push(chunk);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
  } catch {
    throw Object.assign(new Error("Invalid JSON."), { status: 400 });
  }
}

function cleanText(value, maxLength = 500) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function normalizeSubmission(input, request) {
  const submission = {
    id: cleanText(input.requestId || input.id || input["Request ID"], 64) || `GT-${crypto.randomBytes(4).toString("hex").toUpperCase()}`,
    createdAt: new Date().toISOString(),
    source: cleanText(input.source || "website", 80),
    language: cleanText(input.language || "en", 10),
    tour: cleanText(input.tour || input.Tour, 180),
    date: cleanText(input.date || input.startDate || input.Date, 40),
    endDate: cleanText(input.endDate || input["End date"], 40),
    tourPeriod: cleanText(input.tourPeriod || input["Tour period"], 180),
    guests: cleanText(input.guests || input.Guests, 20),
    name: cleanText(input.name || input.Name, 120),
    email: cleanText(input.email || input.Email || input._replyto, 180),
    phone: cleanText(input.phone || input["Phone or WhatsApp"], 80),
    pickup: cleanText(input.pickup || input["Hotel / pickup area"], 240),
    notes: cleanText(input.notes || input.Notes, 3000),
    page: cleanText(input.page, 300)
  };

  if (!submission.tour || !submission.name || !submission.email) {
    throw Object.assign(new Error("Tour, name and email are required."), { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.email)) {
    throw Object.assign(new Error("Enter a valid email address."), { status: 400 });
  }
  return submission;
}

async function saveSubmission(submission) {
  if (USE_BLOB_STORAGE) {
    const { put } = await import("@vercel/blob");
    const timestamp = submission.createdAt.replace(/[^0-9]/g, "");
    const safeId = submission.id.replace(/[^a-zA-Z0-9_-]/g, "-");
    await put(`submissions/${timestamp}-${safeId}.json`, JSON.stringify(submission), {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: true
    });
    return;
  }

  if (process.env.VERCEL) {
    throw Object.assign(new Error("Booking storage is not configured. Connect a private Vercel Blob store."), { status: 503 });
  }

  await fsp.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fsp.appendFile(DATA_FILE, `${JSON.stringify(submission)}\n`, { encoding: "utf8", mode: 0o600 });
}

async function readSubmissions() {
  if (USE_BLOB_STORAGE) {
    const { get, list } = await import("@vercel/blob");
    const records = [];
    let cursor;

    do {
      const page = await list({ prefix: "submissions/", limit: 1000, cursor });
      records.push(...page.blobs);
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor && records.length < 5000);

    const submissions = await Promise.all(records.map(async (blob) => {
      try {
        const result = await get(blob.pathname, { access: "private" });
        if (!result || result.statusCode !== 200) return null;
        return JSON.parse(await new Response(result.stream).text());
      } catch (error) {
        console.error(`Could not read ${blob.pathname}:`, error.message);
        return null;
      }
    }));

    return submissions
      .filter(Boolean)
      .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  }

  if (process.env.VERCEL) {
    throw Object.assign(new Error("Booking storage is not configured. Connect a private Vercel Blob store."), { status: 503 });
  }

  try {
    const content = await fsp.readFile(DATA_FILE, "utf8");
    return content
      .split(/\r?\n/)
      .filter(Boolean)
      .map((line) => {
        try {
          return JSON.parse(line);
        } catch {
          return null;
        }
      })
      .filter(Boolean)
      .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

async function forwardSubmission(submission) {
  if (DISABLE_EMAIL_FORWARDING) return false;
  const payload = {
    _subject: `GambianTour request ${submission.id}: ${submission.tour}`,
    _template: "table",
    _captcha: "false",
    _replyto: submission.email,
    website: "GambianTour.com",
    "Request ID": submission.id,
    "Created at": submission.createdAt,
    Language: submission.language,
    Tour: submission.tour,
    Date: submission.date || "Not provided",
    "End date": submission.endDate || "Not applicable",
    "Tour period": submission.tourPeriod || "Not provided",
    Guests: submission.guests || "Not provided",
    Name: submission.name,
    Email: submission.email,
    "Phone or WhatsApp": submission.phone || "Not provided",
    "Hotel / pickup area": submission.pickup || "Not provided",
    Notes: submission.notes || "None"
  };
  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(FORM_RECIPIENT_EMAIL)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(10000)
  });
  if (!response.ok) throw new Error(`Email forwarding returned ${response.status}.`);
  return true;
}

async function handleApi(request, response, url) {
  if (CONFIG_ERROR) {
    console.error(CONFIG_ERROR);
    return sendJson(response, 503, { error: "The server is not fully configured." });
  }

  if (!sameOrigin(request)) return sendJson(response, 403, { error: "Origin not allowed." });

  if (request.method === "POST" && url.pathname === "/api/submissions") {
    if (isRateLimited(submissionAttempts, clientIp(request), 12, 10 * 60 * 1000)) {
      return sendJson(response, 429, { error: "Too many requests. Please try again later." });
    }
    const input = await readJson(request);
    if (cleanText(input._honey, 100)) return sendJson(response, 200, { ok: true });
    const submission = normalizeSubmission(input, request);
    await saveSubmission(submission);
    let emailForwarded = false;
    try {
      emailForwarded = await forwardSubmission(submission);
    } catch (error) {
      console.error(`Submission ${submission.id} was saved, but email forwarding failed:`, error.message);
    }
    return sendJson(response, 201, { ok: true, id: submission.id, emailForwarded });
  }

  if (request.method === "POST" && url.pathname === "/api/admin/login") {
    const ip = clientIp(request);
    if (isRateLimited(loginAttempts, ip, 8, 15 * 60 * 1000)) {
      return sendJson(response, 429, { error: "Too many login attempts. Try again later." });
    }
    const credentials = await readJson(request);
    const valid = safeEqual(credentials.username, ADMIN_USERNAME) && safeEqual(credentials.password, ADMIN_PASSWORD);
    if (!valid) return sendJson(response, 401, { error: "Incorrect username or password." });
    loginAttempts.delete(ip);
    return sendJson(response, 200, { ok: true, username: ADMIN_USERNAME }, {
      "Set-Cookie": sessionCookie(createSession(), request)
    });
  }

  if (request.method === "POST" && url.pathname === "/api/admin/logout") {
    return sendJson(response, 200, { ok: true }, {
      "Set-Cookie": sessionCookie("", request, 0)
    });
  }

  if (request.method === "GET" && url.pathname === "/api/admin/session") {
    return sendJson(response, 200, { authenticated: validSession(request) });
  }

  if (request.method === "GET" && url.pathname === "/api/admin/submissions") {
    if (!validSession(request)) return sendJson(response, 401, { error: "Authentication required." });
    return sendJson(response, 200, { submissions: await readSubmissions() });
  }

  return sendJson(response, 404, { error: "Not found." });
}

async function serveStatic(response, url) {
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === "/") pathname = "/index.html";
  if (pathname === "/admin") pathname = "/admin.html";

  const relativePath = pathname.replace(/^\/+/, "");
  const denied = relativePath.startsWith(".") || relativePath.startsWith("data/") || ["server.js", "package.json", "package-lock.json"].includes(relativePath);
  const filePath = path.resolve(ROOT, relativePath);
  if (denied || !filePath.startsWith(`${ROOT}${path.sep}`)) {
    response.writeHead(404).end("Not found");
    return;
  }

  try {
    const stat = await fsp.stat(filePath);
    if (!stat.isFile()) throw Object.assign(new Error("Not a file"), { code: "ENOENT" });
    response.writeHead(200, {
      "Content-Type": MIME_TYPES[path.extname(filePath).toLowerCase()] || "application/octet-stream",
      "Content-Length": stat.size,
      "Cache-Control": path.extname(filePath) === ".html" ? "no-cache" : "public, max-age=3600",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "X-Frame-Options": "SAMEORIGIN"
    });
    fs.createReadStream(filePath).pipe(response);
  } catch (error) {
    if (error.code !== "ENOENT") console.error(error);
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Not found");
  }
}

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);
    if (url.pathname.startsWith("/api/")) await handleApi(request, response, url);
    else if (request.method === "GET" || request.method === "HEAD") await serveStatic(response, url);
    else sendJson(response, 405, { error: "Method not allowed." });
  } catch (error) {
    console.error(error);
    sendJson(response, error.status || 500, { error: error.status ? error.message : "Server error." });
  }
});

if (require.main === module) {
  if (CONFIG_ERROR) {
    console.error(`${CONFIG_ERROR} Create a .env file using .env.example.`);
    process.exit(1);
  }
  server.listen(PORT, () => {
    console.log(`GambianTour is running at http://localhost:${PORT}`);
    console.log(`Admin panel: http://localhost:${PORT}/admin`);
  });
}

module.exports = { handleApi };
