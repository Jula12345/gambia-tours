const nodemailer = require("nodemailer");
const mailbox = /^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/;
const smtpRequested = () => Boolean(process.env.SMTP_HOST || process.env.SMTP_USER || process.env.SMTP_PASSWORD);

function smtpSettings(recipient) {
  if (!smtpRequested()) return null;
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const port = Number(process.env.SMTP_PORT || 465);
  const from = process.env.SMTP_FROM || recipient;
  if (!host || !user || !pass) throw new Error("Set SMTP_HOST, SMTP_USER and SMTP_PASSWORD in Vercel to enable authenticated booking emails.");
  if (![465, 587].includes(port)) throw new Error("SMTP_PORT must be 465 or 587 with encryption enabled.");
  if (!mailbox.test(from) || !mailbox.test(recipient)) throw new Error("The booking sender or recipient address is invalid.");
  if (from.split("@")[1].toLowerCase() !== recipient.split("@")[1].toLowerCase()) throw new Error("SMTP_FROM must use the booking recipient's business domain.");
  return {
    from,
    transport: {
      host, port, secure: port === 465, requireTLS: port === 587,
      auth: { user, pass }, tls: { minVersion: "TLSv1.2", rejectUnauthorized: true },
      connectionTimeout: 7000, greetingTimeout: 7000, socketTimeout: 12000
    }
  };
}

function emailMessage(submission, recipient, from) {
  if (!mailbox.test(submission.email)) throw new Error("Invalid guest email address.");
  const rows = [
    ["Request ID", submission.id], ["Received", submission.createdAt], ["Source", submission.source],
    ["Language", submission.language], ["Tour", submission.tour], ["Start date", submission.date],
    ["End date", submission.endDate], ["Travel period", submission.tourPeriod], ["Guests", submission.guests],
    ["Guest name", submission.name], ["Guest email", submission.email], ["Phone / WhatsApp", submission.phone],
    ["Hotel / pickup", submission.pickup], ["Notes", submission.notes]
  ];
  const escape = value => String(value || "Not provided").replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character]));
  const subjectId = String(submission.id || "").replace(/[^A-Za-z0-9_-]/g, "").slice(0, 64);
  return {
    from: { name: "GambianTour Bookings", address: from }, to: recipient,
    envelope: { from, to: [recipient] },
    replyTo: { address: submission.email },
    subject: `GambianTour - new website request ${subjectId}`,
    text: "New GambianTour website enquiry\n\n" + rows.map(([label, value]) => `${label}: ${value || "Not provided"}`).join("\n") + "\n\nView booking requests: https://gambiantour.com/admin\nReply to this email to contact the guest.",
    html: '<!doctype html><html><body style="font-family:Arial,sans-serif;color:#173f35;max-width:640px;margin:auto;padding:24px"><h1 style="font-size:22px">New website enquiry</h1><p>A guest has contacted GambianTour.com.</p><table style="width:100%;border-collapse:collapse">' + rows.map(([label, value]) => `<tr><th style="text-align:left;vertical-align:top;padding:10px;border-bottom:1px solid #dde7e0;width:140px">${label}</th><td style="padding:10px;border-bottom:1px solid #dde7e0;white-space:pre-wrap;overflow-wrap:anywhere">${escape(value)}</td></tr>`).join("") + '</table><p><a href="https://gambiantour.com/admin">View booking requests</a></p><p>Reply to this email to contact the guest.</p></body></html>',
    headers: { "Auto-Submitted": "auto-generated", "X-Auto-Response-Suppress": "All" },
    disableFileAccess: true, disableUrlAccess: true
  };
}

async function sendSmtpBooking(submission, recipient, createTransport = nodemailer.createTransport) {
  const settings = smtpSettings(recipient);
  if (!settings) return false;
  const transport = createTransport(settings.transport);
  try {
    const result = await transport.sendMail(emailMessage(submission, recipient, settings.from));
    if (!result.accepted?.some(address => String(address).toLowerCase() === recipient.toLowerCase())) throw new Error("The mail server did not accept the booking notification.");
    return true;
  } catch (error) {
    const code = /^[A-Z0-9_]{1,30}$/.test(error.code || "") ? error.code : "DELIVERY_FAILED";
    throw new Error(`Authenticated booking email failed (${code}). Check SMTP settings and your mailbox provider.`);
  } finally { transport.close(); }
}

module.exports = { smtpRequested, smtpSettings, emailMessage, sendSmtpBooking };
