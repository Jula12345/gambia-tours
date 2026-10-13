const { test, after } = require("node:test");
const assert = require("node:assert/strict");
const { smtpRequested, smtpSettings, emailMessage, sendSmtpBooking } = require("../lib/booking-email");
const variables = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASSWORD", "SMTP_FROM"];
const previous = Object.fromEntries(variables.map(name => [name, process.env[name]]));
function clear() { for (const name of variables) delete process.env[name]; }
after(() => { for (const name of variables) previous[name] === undefined ? delete process.env[name] : process.env[name] = previous[name]; });
const recipient = "info@gambiantour.com";
const booking = { id: "GT-TEST", name: '<script>alert("x")</script>', email: "guest@example.com", tour: "Gambia Highlights", notes: "Please call me" };

test("SMTP is optional until its credentials are configured", () => {
  clear();
  assert.equal(smtpRequested(), false);
  assert.equal(smtpSettings(recipient), null);
  process.env.SMTP_HOST = "smtpout.secureserver.net";
  assert.equal(smtpRequested(), true);
  assert.throws(() => smtpSettings(recipient), /SMTP_PASSWORD/);
});

test("authenticated sender is fixed and guest email is Reply-To, not From", () => {
  const message = emailMessage(booking, recipient, recipient);
  assert.equal(message.from.address, recipient);
  assert.equal(message.envelope.from, recipient);
  assert.equal(message.replyTo.address, booking.email);
  assert.equal(message.to, recipient);
  assert.ok(!message.html.includes("<script>"));
  assert.ok(message.html.includes("&lt;script&gt;"));
  assert.match(message.text, /Please call me/);
  assert.match(message.text, /gambiantour.com\/admin/);
  assert.equal(message.disableUrlAccess, true);
  assert.throws(() => emailMessage({ ...booking, email: "guest@example.com\r\nBcc: attacker@example.com" }, recipient, recipient), /Invalid guest/);
});

test("SMTP requires encryption and does not permit a foreign sender domain", () => {
  clear();
  Object.assign(process.env, { SMTP_HOST: "smtpout.secureserver.net", SMTP_USER: recipient, SMTP_PASSWORD: "test-not-real", SMTP_PORT: "465" });
  const settings = smtpSettings(recipient);
  assert.equal(settings.transport.secure, true);
  assert.equal(settings.transport.tls.rejectUnauthorized, true);
  process.env.SMTP_PORT = "587";
  assert.equal(smtpSettings(recipient).transport.requireTLS, true);
  process.env.SMTP_PORT = "25";
  assert.throws(() => smtpSettings(recipient), /465 or 587/);
  process.env.SMTP_PORT = "465";
  process.env.SMTP_FROM = "someone@example.com";
  assert.throws(() => smtpSettings(recipient), /business domain/);
});

test("a provider-accepted authenticated email succeeds and closes its connection", async () => {
  clear();
  Object.assign(process.env, { SMTP_HOST: "smtpout.secureserver.net", SMTP_USER: recipient, SMTP_PASSWORD: "test-not-real" });
  let closed = false;
  const success = await sendSmtpBooking(booking, recipient, options => ({
    async sendMail(message) { assert.equal(options.auth.user, recipient); assert.equal(message.from.address, recipient); return { accepted: [recipient] }; },
    close() { closed = true; }
  }));
  assert.equal(success, true);
  assert.equal(closed, true);
  await assert.rejects(sendSmtpBooking(booking, recipient, () => ({ sendMail: async () => ({ accepted: [] }), close() {} })), /DELIVERY_FAILED/);
  await assert.rejects(sendSmtpBooking(booking, recipient, () => ({ sendMail: async () => { throw Object.assign(new Error("private diagnostic"), { code: "EAUTH" }); }, close() {} })), error => error.message.includes("EAUTH") && !error.message.includes("private diagnostic"));
});
