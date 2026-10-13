const { test } = require("node:test");
const assert = require("node:assert/strict");
const { optionsFor, validateContent, generateOffer } = require("../lib/offer-generator");
const { catalog, tripFacts } = require("../lib/offer-catalog");
const { renderOfferPdf } = require("../lib/offer-pdf");
const { sampleOffer } = require("./offer-fixture");

test("every published trip has factual itinerary data", () => {
  for (const tour of catalog()) {
    const facts = tripFacts(tour.id);
    assert.ok(facts.itinerary.length);
    assert.ok(facts.included.length);
    assert.ok(facts.excluded);
  }
});

test("price options reject invalid amounts and omit hidden prices", () => {
  assert.throws(() => optionsFor({ includePrice: true, pricePerPerson: -1 }), /valid price/);
  assert.equal(optionsFor({ includePrice: false, pricePerPerson: 123 }).pricePerPerson, null);
});

test("narrative prices cannot bypass administrator-controlled quotation", () => {
  const content = sampleOffer().content;
  assert.throws(() => validateContent({ ...content, introduction: "Your trip costs EUR 999" }), /price/);
});

test("generation uses compact structured output and deterministic group pricing", async () => {
  process.env.OPENAI_API_KEY = "test-key-not-real";
  let body;
  global.fetch = async (_, options) => {
    body = JSON.parse(options.body);
    return { ok: true, json: async () => ({
      status: "completed", output: [{ content: [{ type: "output_text", text: JSON.stringify(sampleOffer().content) }] }],
      usage: { input_tokens: 1800, output_tokens: 1600 }
    }) };
  };
  const offer = await generateOffer({ id: "GT-TEST", name: "Test", guests: "3", notes: "Relaxed pace", email: "private@example.com", phone: "private" }, { tourId: "gambia-casamance-7-day", includePrice: true, pricePerPerson: 500, currency: "EUR" });
  assert.equal(offer.totalPrice, 1500);
  assert.equal(body.store, false);
  assert.equal(body.max_output_tokens, 2400);
  assert.equal(body.reasoning.effort, "none");
  assert.equal(body.text.format.strict, true);
  assert.ok(!body.input.includes("private@example.com"));
  assert.ok(offer.usage.estimatedCostUsd < .03);
});

test("missing key returns an actionable configuration error", async () => {
  delete process.env.OPENAI_API_KEY;
  await assert.rejects(generateOffer({}, {}), /OPENAI_API_KEY/);
});

test("PDF renderer handles Polish text and a quotation-free version", async () => {
  const pdf = await renderOfferPdf(sampleOffer("pl", false));
  assert.equal(pdf.subarray(0, 4).toString(), "%PDF");
  assert.ok(pdf.length > 10000);
});
