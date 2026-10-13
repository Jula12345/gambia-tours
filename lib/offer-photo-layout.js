const fs = require("node:fs/promises");
const path = require("node:path");
const sharp = require("sharp");
const { readImageFile, getImage } = require("./offer-images");
const bundled = ["coast.jpg", "river.jpg", "bird.jpg", "market.jpg", "senegal.jpg"];
const badCrop = () => Object.assign(new Error("The photo crop is invalid. Please select the crop again."), { status: 400 });

function validateCrop(crop) {
  if (crop == null) return null;
  const fields = ["x", "y", "width", "height"];
  if (typeof crop !== "object" || fields.some(k => typeof crop[k] !== "number" || !Number.isFinite(crop[k]))) throw badCrop();
  if (crop.x < 0 || crop.y < 0 || crop.width <= 0 || crop.height <= 0 || crop.x + crop.width > 1.00001 || crop.y + crop.height > 1.00001) throw badCrop();
  return Object.fromEntries(fields.map(k => [k, Math.max(0, Math.min(1, crop[k]))]));
}

async function cropImage(bytes, crop) {
  crop = validateCrop(crop);
  if (!crop) return bytes;
  const { width, height } = await sharp(bytes).metadata();
  const left = Math.min(width - 1, Math.round(crop.x * width));
  const top = Math.min(height - 1, Math.round(crop.y * height));
  return sharp(bytes).extract({ left, top, width: Math.max(1, Math.min(width - left, Math.round(crop.width * width))), height: Math.max(1, Math.min(height - top, Math.round(crop.height * height))) }).jpeg({ quality: 88 }).toBuffer();
}

async function bundledImage(photo) {
  if (!bundled.includes(photo)) throw Object.assign(new Error("Photo not found."), { status: 404 });
  return fs.readFile(path.join(process.cwd(), "assets/offers", photo));
}

async function resolveGallery(submissionId, gallery) {
  if (!Array.isArray(gallery) || gallery.length > 6) throw Object.assign(new Error("Choose up to 6 gallery photos."), { status: 400 });
  const resolved = [];
  for (const item of gallery) {
    const image = await getImage(submissionId, item?.id);
    if (!image) throw Object.assign(new Error("A gallery photo was not found for this booking."), { status: 400 });
    resolved.push({ ...image, crop: validateCrop(item.crop), caption: String(item.caption || "").slice(0, 120), credit: image.source === "upload" && typeof item.credit === "string" ? item.credit.slice(0, 240) || image.credit : image.credit });
  }
  return resolved;
}

async function prepareOfferPhotos(offer) {
  let cover = offer.image ? await readImageFile(offer.submissionId, offer.image.id, "jpg") : null;
  if (offer.image && !cover) throw new Error("The cover photo could not be loaded.");
  if (offer.coverCrop) cover = await cropImage(cover || await bundledImage(offer.photo), offer.coverCrop);
  const gallery = [];
  for (const image of offer.gallery || []) {
    const bytes = await readImageFile(offer.submissionId, image.id, "jpg");
    if (!bytes) throw new Error("A gallery photo could not be loaded.");
    const cropped = await cropImage(bytes, image.crop);
    // Gallery-sized images keep the PDF comfortably below serverless response limits.
    gallery.push({ image, bytes: await sharp(cropped).resize({ width: 800, height: 600, fit: "inside", withoutEnlargement: true }).jpeg({ quality: 78 }).toBuffer() });
  }
  return { cover, gallery };
}

module.exports = { validateCrop, cropImage, bundledImage, resolveGallery, prepareOfferPhotos };
