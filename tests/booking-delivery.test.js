const assert = require("node:assert/strict");
const { test } = require("node:test");
const { submitWebsiteEnquiry } = require("../booking-delivery");
const payload = { requestId: "GT-TEST", tour: "Test enquiry", email: "test@example.com" };

test("a received server enquiry is not sent a second time", async () => {
  let calls = 0;
  global.fetch = async () => {
    calls++;
    return { ok: true, json: async () => ({ ok: true, stored: true, emailForwarded: true }) };
  };
  assert.equal((await submitWebsiteEnquiry(payload)).ok, true);
  assert.equal(calls, 1);
});

test("unavailable server uses direct AJAX email with all form details", async () => {
  const calls = [];
  global.fetch = async (url, options) => {
    calls.push({ url, payload: JSON.parse(options.body) });
    return calls.length === 1
      ? { ok: false, status: 503, json: async () => ({ error: "Unavailable" }) }
      : { ok: true, json: async () => ({ success: "true" }) };
  };
  const result = await submitWebsiteEnquiry(payload);
  assert.equal(result.emailForwarded, true);
  assert.equal(result.stored, false);
  assert.equal(calls[1].url, "https://formsubmit.co/ajax/info@gambiantour.com");
  assert.equal(calls[1].payload._replyto, payload.email);
  assert.equal(calls[1].payload.tour, payload.tour);
});

test("rate limiting is not bypassed by direct email", async () => {
  let calls = 0;
  global.fetch = async () => {
    calls++;
    return { ok: false, status: 429, json: async () => ({ error: "Too many requests" }) };
  };
  await assert.rejects(submitWebsiteEnquiry(payload), /Too many requests/);
  assert.equal(calls, 1);
});

test("failed direct delivery is reported as a failure", async () => {
  let calls = 0;
  global.fetch = async () => ++calls === 1
    ? { ok: false, status: 503, json: async () => ({}) }
    : { ok: true, json: async () => ({ success: false }) };
  await assert.rejects(submitWebsiteEnquiry(payload), /could not be sent/);
});
