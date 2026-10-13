const { test } = require("node:test");
const assert = require("node:assert/strict");
const vm = require("node:vm");
const fs = require("node:fs");

function tools() {
  let uploadedSize;
  const context = vm.createContext({
    URL: { createObjectURL: () => "blob:photo", revokeObjectURL() {} },
    Image: class {
      naturalWidth = 6000;
      naturalHeight = 4000;
      set src(value) { this.onload(); }
    },
    document: { createElement: () => ({
      getContext: () => ({ fillRect() {}, drawImage() {} }),
      toBlob(callback, type, quality) { uploadedSize = { width: this.width, height: this.height, type, quality }; callback({ size: 500000 }); }
    }) }
  });
  vm.runInContext(fs.readFileSync(require.resolve("../admin-photo-tools.js"), "utf8"), context);
  return { prepareFile: vm.runInContext("OfferPhotoTools.prepareFile", context), size: () => uploadedSize };
}

test("a 10 MB source is resized before upload and originals remain untouched", async () => {
  const helper = tools();
  const original = { name: "iPhone.HEIC", type: "image/heic", size: 10 * 1024 * 1024 };
  const output = await helper.prepareFile(original);
  assert.equal(original.size, 10 * 1024 * 1024);
  assert.ok(output.size < 2 * 1024 * 1024);
  assert.equal(helper.size().width, 2000);
  assert.equal(helper.size().type, "image/jpeg");
});

test("oversized and non-photo files are rejected before decoding", async () => {
  const helper = tools();
  await assert.rejects(helper.prepareFile({ name: "large.heic", size: 21 * 1024 * 1024 }), /20 MB/);
  await assert.rejects(helper.prepareFile({ name: "unsafe.svg", type: "image/svg+xml", size: 100 }), /HEIC or HEIF/);
});
