const assert = require("node:assert/strict");
const { test } = require("node:test");

// Reproduce the production setup without sending emails or writing customer data.
process.env.ADMIN_USERNAME = "";
process.env.ADMIN_PASSWORD = "";
process.env.SESSION_SECRET = "";
process.env.BLOB_READ_WRITE_TOKEN = "";
process.env.VERCEL = "1";
process.env.DISABLE_EMAIL_FORWARDING = "false";
process.env.SMTP_HOST = "";
process.env.SMTP_USER = "";
process.env.SMTP_PASSWORD = "";
const { handleApi } = require("../server");

async function request(pathname, body = {}) {
  let status;
  let result;
  const request = {
    method: pathname.endsWith("/session") ? "GET" : "POST",
    headers: { host: "www.gambiantour.com", origin: "https://www.gambiantour.com" },
    socket: { remoteAddress: "127.0.0.1" },
    body
  };
  const response = {
    writeHead(value) { status = value; },
    end(value) { result = JSON.parse(value); }
  };
  await handleApi(request, response, new URL(pathname, "https://www.gambiantour.com"));
  return { status, result };
}

const booking = { tour: "Contact form delivery test", name: "Test Guest", email: "test@example.com" };

test("public enquiries send email without admin credentials or storage", async () => {
  let sentPayload;
  global.fetch = async (url, options) => {
    assert.match(url, /^https:\/\/formsubmit.co\/ajax\//);
    sentPayload = JSON.parse(options.body);
    assert.equal(options.headers.Origin, "https://www.gambiantour.com");
    assert.equal(options.headers.Referer, "https://www.gambiantour.com/");
    return { ok: true, json: async () => ({ success: "true" }) };
  };
  const { status, result } = await request("/api/submissions", booking);
  assert.equal(status, 201);
  assert.equal(result.ok, true);
  assert.equal(result.stored, false);
  assert.equal(result.emailForwarded, true);
  assert.equal(sentPayload.Email, booking.email);
  assert.equal(sentPayload.Tour, booking.tour);
});

test("provider rejection never produces a success response", async () => {
  global.fetch = async () => ({ ok: true, json: async () => ({ success: false }) });
  await assert.rejects(request("/api/submissions", booking), error => error.status === 503);
});

test("network failure reports that the enquiry was not received", async () => {
  global.fetch = async () => { throw new Error("Provider unavailable"); };
  await assert.rejects(request("/api/submissions", booking), /could not be received/);
});

test("missing admin credentials still block the private API", async () => {
  const { status } = await request("/api/admin/session");
  assert.equal(status, 503);
});

test("invalid email is rejected before any delivery attempt", async () => {
  let contactedProvider = false;
  global.fetch = async () => { contactedProvider = true; };
  await assert.rejects(request("/api/submissions", { ...booking, email: "invalid" }), /valid email/);
  assert.equal(contactedProvider, false);
});
