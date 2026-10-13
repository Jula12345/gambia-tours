const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");
const base = path.join(path.dirname(path.resolve(__dirname, "..", process.env.DATA_FILE || "data/submissions.jsonl")), "offers");
const key = (id) => crypto.createHash("sha256").update(id).digest("hex");

async function saveOfferPdf(offer, pdf) {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import("@vercel/blob");
    await put(`offers/${key(offer.submissionId)}/${offer.id}.pdf`, pdf, { access: "private", contentType: "application/pdf", addRandomSuffix: false, allowOverwrite: true });
  } else {
    if (process.env.VERCEL) throw new Error("Connect a private Blob store to save offers.");
    await fs.mkdir(base, { recursive: true });
    await fs.writeFile(path.join(base, offer.id + ".pdf"), pdf, { mode: 0o600 });
  }
}

async function getOfferFile(submissionId, offerId, extension) {
  if (!/^[a-zA-Z0-9-]{1,64}$/.test(offerId || "") || !submissionId) return null;
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { get } = await import("@vercel/blob");
    const response = await get(`offers/${key(submissionId)}/${offerId}.${extension}`, { access: "private", useCache: false });
    if (!response || response.statusCode === 404) return null;
    if (response.statusCode !== 200) throw new Error("A saved offer could not be read.");
    return Buffer.from(await new Response(response.stream).arrayBuffer());
  }
  if (process.env.VERCEL) throw new Error("Connect a private Blob store to read offers.");
  return fs.readFile(path.join(base, offerId + "." + extension)).catch(error => {
    if (error.code === "ENOENT") return null;
    throw error;
  });
}

async function getOffer(submissionId, offerId) {
  const data = await getOfferFile(submissionId, offerId, "json");
  const offer = data ? JSON.parse(data.toString()) : null;
  return offer?.submissionId === submissionId ? offer : null;
}

async function getOfferPdf(offer) {
  return getOfferFile(offer.submissionId, offer.id, "pdf");
}

async function saveOffer(offer) {
  const pathname = `offers/${key(offer.submissionId)}/${offer.id}.json`;
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import("@vercel/blob");
    await put(pathname, JSON.stringify(offer), { access: "private", contentType: "application/json", addRandomSuffix: false });
  } else {
    if (process.env.VERCEL) throw new Error("Connect a private Blob store to save offers.");
    await fs.mkdir(base, { recursive: true });
    await fs.writeFile(path.join(base, offer.id + ".json"), JSON.stringify(offer), { mode: 0o600 });
  }
}

async function getOffers(submissionId) {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { list, get } = await import("@vercel/blob");
    const files = await list({ prefix: `offers/${key(submissionId)}/`, limit: 1000 });
    const offers = await Promise.all(files.blobs.filter(blob => blob.pathname.endsWith(".json")).map(async (blob) => {
      const response = await get(blob.pathname, { access: "private", useCache: false });
      if (!response || response.statusCode !== 200) throw new Error("A saved offer could not be read.");
      return JSON.parse(await new Response(response.stream).text());
    }));
    return offers.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
  if (process.env.VERCEL) throw new Error("Connect a private Blob store to read offers.");
  const files = await fs.readdir(base).catch((error) => {
    if (error.code === "ENOENT") return [];
    throw error;
  });
  const offers = await Promise.all(files.filter(f => f.endsWith(".json")).map(async f => JSON.parse(await fs.readFile(path.join(base, f), "utf8"))));
  return offers.filter(o => o.submissionId === submissionId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

module.exports = { saveOffer, getOffers, getOffer, saveOfferPdf, getOfferPdf };
