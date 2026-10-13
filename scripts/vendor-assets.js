const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const target = path.join(root, "assets/vendor");
fs.mkdirSync(target, { recursive: true });
for (const [source, name] of [
  ["cropperjs/dist/cropper.min.js", "cropper.min.js"],
  ["cropperjs/dist/cropper.min.css", "cropper.min.css"],
  ["cropperjs/LICENSE", "cropper-LICENSE.txt"],
  ["heic-to/dist/iife/heic-to.js", "heic-to.js"],
  ["heic-to/LICENSE", "heic-to-LICENSE.txt"]
]) fs.copyFileSync(path.join(root, "node_modules", source), path.join(target, name));
