const { test } = require("node:test");
const assert = require("node:assert/strict");
const vm = require("node:vm");
const fs = require("node:fs");

function browser(fetch, api = async () => ({})) {
  const nodes = new Map();
  const downloads = [];
  const document = {
    querySelector(selector) {
      if (!nodes.has(selector)) nodes.set(selector, { elements: { includePrice: { addEventListener() {} } }, addEventListener(type, callback) { this[type] = callback; } });
      return nodes.get(selector);
    },
    createElement() { return { click() { downloads.push(this.download); }, remove() {} }; },
    body: { append() {} }
  };
  const context = vm.createContext({ document, fetch, api, Blob, TypeError, URL: { createObjectURL: () => "blob:test", revokeObjectURL() {} }, setTimeout(callback, milliseconds) { if (milliseconds < 10000) callback(); }, console });
  vm.runInContext(fs.readFileSync(require.resolve("../admin-offers.js"), "utf8"), context);
  vm.runInContext('currentOffer = { id: "test-offer", submissionId: "test-booking" };', context);
  return { context, nodes, downloads };
}

test("download saves a PDF without navigating and reuses prefetched bytes", async () => {
  let requests = 0;
  const ui = browser(async () => { requests++; return new Response("%PDF-test", { headers: { "content-type": "application/pdf" } }); });
  await vm.runInContext("fetchOfferPdf(currentOffer)", ui.context);
  await ui.nodes.get("[data-download-offer]").click();
  await ui.nodes.get("[data-download-offer]").click();
  assert.equal(requests, 1);
  assert.deepEqual(ui.downloads, ["GambianTour-offer-test-offer.pdf", "GambianTour-offer-test-offer.pdf"]);
  assert.equal(ui.nodes.get("[data-download-offer]").disabled, false);
});

test("a JSON PDF error stays in the panel and can be retried", async () => {
  let requests = 0;
  const ui = browser(async () => ++requests === 1
    ? new Response(JSON.stringify({ error: "PDF unavailable" }), { status: 500, headers: { "content-type": "application/json" } })
    : new Response("%PDF-test", { headers: { "content-type": "application/pdf" } }));
  await ui.nodes.get("[data-download-offer]").click();
  assert.equal(ui.nodes.get("[data-offer-feedback]").textContent, "PDF unavailable");
  assert.equal(ui.downloads.length, 0);
  await ui.nodes.get("[data-download-offer]").click();
  assert.equal(ui.downloads.length, 1);
});

test("offer reads recover from a transient load failure but do not retry authentication", async () => {
  let calls = 0;
  const ui = browser(null, async () => {
    if (++calls === 1) throw new TypeError("Load failed");
    return { offers: [] };
  });
  await vm.runInContext('readOffers("GT-TEST")', ui.context);
  assert.equal(calls, 2);
  let unauthorizedCalls = 0;
  const unauthorized = browser(null, async () => { unauthorizedCalls++; throw Object.assign(new Error("Sign in"), { status: 401 }); });
  await assert.rejects(vm.runInContext('readOffers("GT-TEST")', unauthorized.context), /Sign in/);
  assert.equal(unauthorizedCalls, 1);
});
