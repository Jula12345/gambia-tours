const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");
const sharp = require("sharp");
const cheerio = require("cheerio");
const base = path.join(path.dirname(path.resolve(__dirname, "..", process.env.DATA_FILE || "data/submissions.jsonl")), "offer-images");
const MAX_UPLOAD = 2 * 1024 * 1024;
const error = message => Object.assign(new Error(message), { status: 400 });
const plain = html => cheerio.load(String(html || "")).text().replace(/\s+/g, " ").trim();
const imagePath = (submissionId, id, extension) => `offer-images/${crypto.createHash("sha256").update(submissionId).digest("hex")}/${id}.${extension}`;

async function writeImageFile(submissionId, id, extension, data) {
  const filename = imagePath(submissionId, id, extension);
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import("@vercel/blob");
    await put(filename, data, { access: "private", addRandomSuffix: false, contentType: extension === "jpg" ? "image/jpeg" : "application/json" });
  } else {
    if (process.env.VERCEL) throw new Error("Connect a private Blob store to save photos.");
    const local = path.join(base, filename.slice("offer-images/".length));
    await fs.mkdir(path.dirname(local), { recursive: true });
    await fs.writeFile(local, data, { mode: 0o600 });
  }
}

async function readImageFile(submissionId, id, extension) {
  if (!submissionId || !/^[a-f0-9-]{36}$/.test(id || "")) return null;
  const filename = imagePath(submissionId, id, extension);
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { get } = await import("@vercel/blob");
    const result = await get(filename, { access: "private", useCache: false });
    if (!result) return null;
    if (result.statusCode !== 200) throw new Error("The offer photo could not be read.");
    return Buffer.from(await new Response(result.stream).arrayBuffer());
  }
  if (process.env.VERCEL) throw new Error("Connect a private Blob store to read photos.");
  return fs.readFile(path.join(base, filename.slice("offer-images/".length))).catch(e => {
    if (e.code === "ENOENT") return null;
    throw e;
  });
}

async function getImage(submissionId, id) {
  const data = await readImageFile(submissionId, id, "json");
  return data ? JSON.parse(data.toString()) : null;
}

async function normalizeImage(data) {
  try {
    const image = sharp(data, { limitInputPixels: 40000000, animated: false });
    const metadata = await image.metadata();
    if (!["jpeg", "png", "webp"].includes(metadata.format)) throw error("Use a JPG, PNG or WebP photo.");
    if (metadata.width < 400 || metadata.height < 200) throw error("Choose a photo at least 400 pixels wide and 200 pixels tall.");
    return await image.rotate().resize({ width: 1600, height: 1200, fit: "inside", withoutEnlargement: true }).flatten({ background: "#ffffff" }).jpeg({ quality: 85 }).toBuffer();
  } catch (e) {
    if (e.status) throw e;
    throw error("This image could not be opened. Use a valid JPG, PNG or WebP photo.");
  }
}

async function saveImage(submissionId, bytes, details) {
  const jpeg = await normalizeImage(bytes);
  const image = { id: crypto.randomUUID(), ...details };
  await writeImageFile(submissionId, image.id, "jpg", jpeg);
  await writeImageFile(submissionId, image.id, "json", JSON.stringify(image));
  return image;
}

async function uploadImage(submissionId, input) {
  if (input.rightsConfirmed !== true) throw error("Confirm that you have permission to use this photo.");
  if (typeof input.data !== "string" || !/^[A-Za-z0-9+/]+={0,2}$/.test(input.data) || input.data.length > Math.ceil(MAX_UPLOAD / 3) * 4) throw error("Choose a photo no larger than 2 MB.");
  const bytes = Buffer.from(input.data, "base64");
  if (!bytes.length || bytes.length > MAX_UPLOAD) throw error("Choose a photo no larger than 2 MB.");
  return saveImage(submissionId, bytes, { source: "upload", title: String(input.name || "Uploaded photo").slice(0, 120), credit: String(input.credit || "Photo supplied by GambianTour.com").slice(0, 240) });
}

function candidatesFrom(result, excludedSource) {
  return Object.values(result.query?.pages || {}).sort((a, b) => (a.index || 0) - (b.index || 0)).flatMap(page => {
    const info = page.imageinfo?.[0];
    if (!info || !["image/jpeg", "image/png", "image/webp"].includes(info.mime) || info.width < 800 || info.height < 300 || info.width < info.height) return [];
    const metadata = info.extmetadata || {};
    const license = plain(metadata.LicenseShortName?.value);
    if (!/^(?:CC BY(?:-SA)? [\d.]+|CC0(?: [\d.]+)?|Public domain)$/i.test(license)) return [];
    const licenseUrl = metadata.LicenseUrl?.value || "";
    if (license !== "Public domain" && !/^https?:\/\/creativecommons\.org\//.test(licenseUrl)) return [];
    const source = info.descriptionurl;
    const url = info.thumburl || info.url;
    if (!/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/.test(source || "") || source === excludedSource) return [];
    if (!/^https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\//.test(url || "")) return [];
    const title = plain(metadata.ObjectName?.value || page.title.replace(/^File:/, ""));
    const author = plain(metadata.Artist?.value).slice(0, 120) || "Wikimedia Commons contributor";
    return [{ url, source, title: title.slice(0, 160), credit: `${title.slice(0, 100)} - ${author}. ${license}: ${licenseUrl}. Wikimedia Commons. Resized and cropped.` }];
  });
}

async function searchImage(submissionId, query, previousImage) {
  query = String(query || "").trim().slice(0, 150);
  if (!query) throw error("Describe the photo you want to find.");
  const url = new URL("https://commons.wikimedia.org/w/api.php");
  url.search = new URLSearchParams({ action: "query", format: "json", generator: "search", gsrsearch: query, gsrnamespace: "6", gsrlimit: "8", prop: "imageinfo", iiprop: "url|size|mime|extmetadata", iiurlwidth: "1600", iiextmetadatafilter: "Artist|LicenseShortName|LicenseUrl|ObjectName" }).toString();
  const headers = { "User-Agent": "GambianTour/1.0 (https://gambiantour.com; info@gambiantour.com)" };
  const response = await fetch(url, { headers, signal: AbortSignal.timeout(12000) });
  if (!response.ok) throw error("Photo search is temporarily unavailable. Try again or upload your own photo.");
  const candidates = candidatesFrom(await response.json(), previousImage?.source);
  for (const candidate of candidates.slice(0, 3)) {
    try {
      const download = await fetch(candidate.url, { headers, redirect: "error", signal: AbortSignal.timeout(10000) });
      if (!download.ok || Number(download.headers.get("content-length")) > 5 * 1024 * 1024) continue;
      const chunks = []; let size = 0;
      for await (const chunk of download.body) {
        size += chunk.length;
        if (size > 5 * 1024 * 1024) throw error("Stock photo is too large.");
        chunks.push(chunk);
      }
      return await saveImage(submissionId, Buffer.concat(chunks), { source: candidate.source, title: candidate.title, credit: candidate.credit, query });
    } catch (e) { if (!e.status && !(e instanceof TypeError) && e.name !== "TimeoutError") throw e; }
  }
  throw error("No suitable licensed landscape photo was found. Try a different description or upload your own photo.");
}

module.exports = { uploadImage, searchImage, getImage, readImageFile, candidatesFrom };
