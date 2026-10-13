const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");
const base = path.join(path.dirname(path.resolve(__dirname, "..", process.env.DATA_FILE || "data/submissions.jsonl")), "offers");
const key = (id) => crypto.createHash("sha256").update(id).digest("hex");

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
    const offers = await Promise.all(files.blobs.map(async (blob) => {
      const response = await get(blob.pathname, { access: "private" });
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

module.exports = { saveOffer, getOffers };
