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
  assert.equal((await call("/api/admin/offer-image?submissionId=GT-TEST")).status, 401);
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

test("admin uploads and prompt-selected photos survive offer revisions", async () => {
  const submission = { id: "GT-PHOTO-API", name: "Photo guest", guests: "2" };
  await fs.appendFile(process.env.DATA_FILE, JSON.stringify(submission) + "\n");
  const data = await fs.readFile(path.join(__dirname, "../assets/offers/coast.jpg"));
  const upload = await call("/api/admin/offer-image", { submissionId: submission.id, data: data.toString("base64"), rightsConfirmed: true, name: "My coast" }, true);
  assert.equal(upload.status, 201);
  const originalFetch = global.fetch;
  process.env.OPENAI_API_KEY = "test-not-real";
  global.fetch = async (url, options) => {
    if (String(url).startsWith("https://api.openai.com/")) {
      const context = JSON.parse(JSON.parse(options.body).input);
      return new Response(JSON.stringify({ status: "completed", usage: { input_tokens: 100, output_tokens: 100 }, output: [{ content: [{ type: "output_text", text: JSON.stringify({ ...sampleOffer().content, coverImageQuery: context.revisionInstructions.includes("photo") ? "Dakar Senegal coastline" : null }) }] }] }));
    }
    if (String(url).startsWith("https://commons.wikimedia.org/")) return new Response(JSON.stringify({ query: { pages: { 1: { title: "File:Dakar.jpg", imageinfo: [{ mime: "image/jpeg", width: 1200, height: 800, thumburl: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Dakar.jpg", descriptionurl: "https://commons.wikimedia.org/wiki/File:Dakar.jpg", extmetadata: { LicenseShortName: { value: "Public domain" }, Artist: { value: "Test photographer" } } }] } } } }));
    return new Response(await fs.readFile(path.join(__dirname, "../assets/offers/senegal.jpg")));
  };
  try {
    const settings = { submissionId: submission.id, tourId: "gambia-casamance-7-day", photoMode: "upload", imageId: upload.result.image.id };
    const first = await call("/api/admin/offers", settings, true);
    assert.equal(first.status, 201);
    assert.equal(first.result.offer.image.id, upload.result.image.id);
    assert.ok(await getOfferPdf(first.result.offer));
    const next = await call("/api/admin/offers", { ...settings, photoMode: "auto", imageId: undefined, previousOfferId: first.result.offer.id, prompt: "Make the introduction warmer" }, true);
    assert.equal(next.result.offer.image.id, first.result.offer.image.id);
    const changed = await call("/api/admin/offers", { ...settings, photoMode: "auto", imageId: undefined, previousOfferId: next.result.offer.id, prompt: "Change the photo to Dakar coastline" }, true);
    assert.equal(changed.status, 201);
    assert.notEqual(changed.result.offer.image.id, first.result.offer.image.id);
    assert.match(changed.result.offer.image.source, /Dakar/);
    assert.equal(changed.result.offer.imageWarning, undefined);
    assert.ok(await getOfferPdf(changed.result.offer));
    assert.equal((await getOffer(submission.id, first.result.offer.id)).image.id, first.result.offer.image.id);
    process.env.OPENAI_API_KEY = "";
    global.fetch = async () => { throw new Error("Photo-only edits must not call OpenAI"); };
    const crop = { x: .1, y: .2, width: .8, height: .3 };
    const layout = await call("/api/admin/offers", { ...settings, photoMode: "auto", imageId: undefined, previousOfferId: changed.result.offer.id, photosOnly: true, coverCrop: crop, coverCropImageId: changed.result.offer.image.id, gallery: [{ id: upload.result.image.id, caption: "Our coastal base", crop: null }] }, true);
    assert.equal(layout.status, 201);
    assert.deepEqual(layout.result.offer.coverCrop, crop);
    assert.equal(layout.result.offer.gallery.length, 1);
    assert.deepEqual(layout.result.offer.content, changed.result.offer.content);
    assert.equal(layout.result.offer.usage.estimatedCostUsd, 0);
    assert.ok(await getOfferPdf(layout.result.offer));
  } finally {
    global.fetch = originalFetch;
    process.env.OPENAI_API_KEY = "";
  }
});
