const { test, after } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const syncFs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const sharp = require("sharp");
const directory = syncFs.mkdtempSync(path.join(os.tmpdir(), "gambiantour-photo-tests-"));
process.env.DATA_FILE = path.join(directory, "submissions.jsonl");
process.env.BLOB_READ_WRITE_TOKEN = "";
process.env.VERCEL = "";
const { uploadImage, getImage, readImageFile, searchImage, candidatesFrom } = require("../lib/offer-images");
const { renderOfferPdf } = require("../lib/offer-pdf");
const { sampleOffer } = require("./offer-fixture");
after(() => fs.rm(directory, { recursive: true, force: true }));
const photo = () => sharp({ create: { width: 1000, height: 600, channels: 3, background: "#008855" } }).jpeg().toBuffer();

function searchResults() {
  return { query: { pages: { 1: { index: 1, title: "File:Gambia landscape.jpg", imageinfo: [{
    width: 1000, height: 600, mime: "image/jpeg", thumburl: "https://upload.wikimedia.org/wikipedia/commons/a/ab/test.jpg",
    descriptionurl: "https://commons.wikimedia.org/wiki/File:Gambia_landscape.jpg",
    extmetadata: { Artist: { value: "<b>Photographer</b>" }, LicenseShortName: { value: "CC BY 4.0" }, LicenseUrl: { value: "https://creativecommons.org/licenses/by/4.0/" } }
  }] } } } };
}

test("uploads are normalized, private to a booking and rendered in the PDF", async () => {
  const image = await uploadImage("GT-PHOTO", { data: (await photo()).toString("base64"), rightsConfirmed: true, name: "My photo", credit: "My photographer" });
  assert.deepEqual(await getImage("GT-PHOTO", image.id), image);
  assert.equal(await getImage("GT-OTHER", image.id), null);
  assert.equal(await getImage("GT-PHOTO", "../../.env"), null);
  const bytes = await readImageFile("GT-PHOTO", image.id, "jpg");
  assert.equal((await sharp(bytes).metadata()).format, "jpeg");
  const pdf = await renderOfferPdf({ ...sampleOffer(), image }, bytes);
  assert.equal(pdf.subarray(0, 4).toString(), "%PDF");
  await assert.rejects(renderOfferPdf({ ...sampleOffer(), image }), /photo could not be loaded/);
});

test("upload rejects missing permission, oversized and disguised image files", async () => {
  await assert.rejects(uploadImage("GT-PHOTO", { rightsConfirmed: false }), /permission/);
  await assert.rejects(uploadImage("GT-PHOTO", { rightsConfirmed: true, data: "A".repeat(3000000) }), /2 MB/);
  await assert.rejects(uploadImage("GT-PHOTO", { rightsConfirmed: true, data: Buffer.from("<svg></svg>").toString("base64") }), /valid JPG/);
});

test("photo search keeps attribution and rejects unlicensed and unsafe URLs", () => {
  const result = searchResults();
  const selected = candidatesFrom(result);
  assert.equal(selected.length, 1);
  assert.match(selected[0].credit, /Photographer.*CC BY 4.0/);
  assert.ok(!selected[0].credit.includes("<b>"));
  assert.equal(candidatesFrom(result, selected[0].source).length, 0);
  const info = result.query.pages[1].imageinfo[0];
  info.thumburl = "http://127.0.0.1/private";
  assert.equal(candidatesFrom(result).length, 0);
  info.thumburl = selected[0].url;
  info.extmetadata.LicenseShortName.value = "All rights reserved";
  assert.equal(candidatesFrom(result).length, 0);
});

test("search downloads a licensed photo and saves it for preview and PDF", async () => {
  const bytes = await photo();
  global.fetch = async url => String(url).startsWith("https://commons.wikimedia.org/w/api.php")
    ? new Response(JSON.stringify(searchResults()))
    : new Response(bytes, { headers: { "content-type": "image/jpeg" } });
  const image = await searchImage("GT-STOCK", "Gambia river sunset");
  assert.match(image.source, /commons.wikimedia.org/);
  assert.equal(image.query, "Gambia river sunset");
  assert.ok((await readImageFile("GT-STOCK", image.id, "jpg")).length);
  await assert.rejects(searchImage("GT-STOCK", "Gambia river sunset", image), /No suitable/);
});
