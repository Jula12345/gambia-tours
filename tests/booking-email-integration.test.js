const { test, after } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const syncFs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const directory = syncFs.mkdtempSync(path.join(os.tmpdir(), "gambiantour-smtp-tests-"));
Object.assign(process.env, {
  DATA_FILE: path.join(directory, "submissions.jsonl"), VERCEL: "", BLOB_READ_WRITE_TOKEN: "", DISABLE_EMAIL_FORWARDING: "false",
  SMTP_HOST: "smtpout.secureserver.net", SMTP_USER: "info@gambiantour.com", SMTP_PASSWORD: "test-only-not-real", SMTP_PORT: "465", SMTP_FROM: "info@gambiantour.com"
});
const nodemailer = require("nodemailer");
const { handleApi } = require("../server");
after(() => fs.rm(directory, { recursive: true, force: true }));

async function submit(notes) {
  let status, result;
  await handleApi({ method: "POST", body: { name: "SMTP test guest", email: "guest@example.com", tour: "Test booking", notes }, headers: { host: "gambiantour.com", origin: "https://gambiantour.com" }, socket: { remoteAddress: "127.0.0.1" } }, {
    writeHead(value) { status = value; }, end(value) { result = JSON.parse(value); }
  }, new URL("https://gambiantour.com/api/submissions"));
  return { status, result };
}

test("website submissions are both stored and sent through the authenticated mailbox", async () => {
  let sent = 0;
  global.fetch = async () => { throw new Error("Shared delivery must not be used"); };
  nodemailer.createTransport = options => ({
    async sendMail(message) { sent++; assert.equal(options.auth.user, "info@gambiantour.com"); assert.equal(message.replyTo.address, "guest@example.com"); return { accepted: ["info@gambiantour.com"] }; }, close() {}
  });
  const response = await submit("Successful authenticated notification");
  assert.equal(response.status, 201);
  assert.equal(response.result.stored, true);
  assert.equal(response.result.emailForwarded, true);
  assert.equal(response.result.emailFallbackAllowed, false);
  assert.equal(sent, 1);
  assert.equal(JSON.parse((await fs.readFile(process.env.DATA_FILE, "utf8")).trim()).id, response.result.id);
});

test("SMTP authentication failure preserves the booking and disables shared-sender fallback", async () => {
  nodemailer.createTransport = () => ({ sendMail: async () => { throw Object.assign(new Error("login rejected"), { code: "EAUTH" }); }, close() {} });
  const response = await submit("Failed authenticated notification");
  assert.equal(response.status, 201);
  assert.equal(response.result.stored, true);
  assert.equal(response.result.emailForwarded, false);
  assert.equal(response.result.emailFallbackAllowed, false);
  assert.equal((await fs.readFile(process.env.DATA_FILE, "utf8")).trim().split("\n").length, 2);
});
