const { test, after } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const syncFs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const crypto = require("node:crypto");
const directory = syncFs.mkdtempSync(path.join(os.tmpdir(), "gambiantour-tests-"));
process.env.DATA_FILE = path.join(directory, "submissions.jsonl");
process.env.ADMIN_USERNAME = "test-admin";
process.env.ADMIN_PASSWORD = "test-password";
process.env.SESSION_SECRET = "test-secret-with-at-least-thirty-two-characters";
process.env.BLOB_READ_WRITE_TOKEN = "";
process.env.VERCEL = "";
process.env.OPENAI_API_KEY = "";
process.env.DISABLE_EMAIL_FORWARDING = "true";
const { handleApi } = require("../server");
const { saveOffer, getOffers, getOffer, getOfferPdf } = require("../lib/offer-store");
const { sampleOffer } = require("./offer-fixture");
after(() => fs.rm(directory, { recursive: true, force: true }));

function cookie() {
  const payload = Buffer.from(JSON.stringify({ user: "test-admin", expiresAt: Date.now() + 10000 })).toString("base64url");
  return "gt_admin_session=" + payload + "." + crypto.createHmac("sha256", process.env.SESSION_SECRET).update(payload).digest("base64url");
}
async function call(url, body, authenticated = false) {
  let status;
  let result;
  await handleApi({
    method: body ? "POST" : "GET", body, socket: { remoteAddress: "127.0.0.1" },
    headers: { host: "localhost", ...(authenticated ? { cookie: cookie() } : {}) }
  }, {
    writeHead(value) { status = value; },
    end(value) { result = JSON.parse(value); }
  }, new URL(url, "http://localhost"));
  return { status, result };
}

test("concurrent and repeated booking clicks create one stored request", async () => {
  const booking = { tour: "7-Day Gambia & Casamance Discovery", name: "Test", email: "test@example.com", guests: "2", date: "2027-01-05" };
  const results = await Promise.all([1, 2, 3].map(i => call("/api/submissions", { ...booking, requestId: "GT-CLICK-" + i })));
  assert.equal(new Set(results.map(r => r.result.id)).size, 1);
  const repeated = await call("/api/submissions", { ...booking, requestId: "GT-CLICK-4" });
  assert.equal(repeated.result.duplicate, true);
  const lines = (await fs.readFile(process.env.DATA_FILE, "utf8")).trim().split("\n");
  assert.equal(lines.length, 1);
});

test("offer generation and PDF routes require authentication", async () => {
  assert.equal((await call("/api/admin/offers")).status, 401);
  assert.equal((await call("/api/admin/offer-pdf?submissionId=GT-TEST")).status, 401);
});

test("saved offers keep revisions private to their booking request", async () => {
  const offer = sampleOffer();
  await saveOffer(offer);
  await saveOffer({ ...offer, id: crypto.randomUUID(), revision: 2, createdAt: new Date(Date.now() + 10).toISOString() });
  const versions = await getOffers(offer.submissionId);
  assert.equal(versions.length, 2);
  assert.equal(versions[0].revision, 2);
  assert.equal((await getOffers("GT-OTHER")).length, 0);
});

test("configured admin can see catalog and missing-key status", async () => {
  const response = await call("/api/admin/offers", null, true);
  assert.equal(response.status, 200);
  assert.equal(response.result.tours.length, 9);
  assert.equal(response.result.configured, false);
});

test("PDF downloads are cached, authenticated attachments with booking isolation", async () => {
  const offer = { ...sampleOffer(), id: crypto.randomUUID() };
  await saveOffer(offer);
  async function download(submissionId = offer.submissionId) {
    let status, headers, body;
    await handleApi({ method: "GET", headers: { cookie: cookie() } }, {
      writeHead(value, fields) { status = value; headers = fields; },
      end(value) { body = value; }
    }, new URL(`/api/admin/offer-pdf?submissionId=${submissionId}&offerId=${offer.id}`, "http://localhost"));
    return { status, headers, body };
  }
  const first = await download();
  assert.equal(first.status, 200);
  assert.equal(first.headers["Content-Type"], "application/pdf");
  assert.match(first.headers["Content-Disposition"], /^attachment;/);
  assert.equal(first.body.subarray(0, 4).toString(), "%PDF");
  assert.deepEqual(await getOfferPdf(offer), first.body);
  assert.deepEqual((await download()).body, first.body);
  assert.equal((await download("GT-OTHER")).status, 404);
  assert.equal(await getOffer("GT-OTHER", offer.id), null);
  assert.equal(await getOffer(offer.submissionId, "../../.env"), null);
  assert.ok((await getOffers(offer.submissionId)).every(version => version.content));
});
