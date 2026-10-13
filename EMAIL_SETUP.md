# Authenticated booking notifications

The legacy website sends through FormSubmit's shared sender. Inbox placement is decided by the receiving mail service; changing message wording cannot guarantee delivery to the inbox.

The website can instead authenticate with your business mailbox's outgoing mail server. It sends from your own domain, with the guest address only in Reply-To. No credentials are exposed to visitors. Booking storage in the admin panel is unchanged.

## GoDaddy Professional Email / Webmail

Public MX and SPF records for gambiantour.com point to GoDaddy's secureserver.net mail system. Confirm your mailbox product before applying these values. These are not Microsoft 365 settings.

In Vercel > Project > Settings > Environment Variables, set these for Production, then redeploy:

| Variable | Value |
| --- | --- |
| SMTP_HOST | smtpout.secureserver.net |
| SMTP_PORT | 465 |
| SMTP_USER | info@gambiantour.com |
| SMTP_PASSWORD | Your mailbox password, or the provider's application password if required |
| SMTP_FROM | info@gambiantour.com |
| FORM_RECIPIENT_EMAIL | info@gambiantour.com |

Use the mailbox password, not the GoDaddy account password. Do not share it in chat or commit it to Git. GoDaddy may require enabling SMTP access in your mailbox settings.

Official settings: https://www.godaddy.com/help/use-imap-settings-to-add-my-professional-email-powered-by-titan-to-a-client-32204

For a different provider, use its official authenticated SMTP settings (465 with TLS, or 587 with STARTTLS). Microsoft 365 may require OAuth or additional tenant configuration; do not assume a normal password will work.

## Verify delivery

1. Send one new booking request after redeploying.
2. Confirm it is both stored in /admin and received in your mailbox.
3. Inspect the received email's full headers: the sender should be GambianTour Bookings <info@gambiantour.com>, replies should go to the guest, and SPF/DKIM/DMARC results should pass or align. The provider controls DKIM signing; enable it through the mail provider if it is missing.
4. Mark an existing legitimate notification as Not Spam and allowlist the exact authenticated sender if your mailbox has already learned a spam classification. Do not allowlist an entire shared provider domain.

The existing SPF record authorizes secureserver.net, and the domain currently has a DMARC quarantine policy. Do not remove DMARC or change it to bypass filtering. Do not add a second SPF TXT record.

While SMTP is not configured, existing FormSubmit delivery remains available. Once any SMTP credentials/settings are supplied, the website will not silently fall back to the shared sender when authentication fails. A saved request remains in the admin panel even if email delivery fails; inspect Vercel function logs for a redacted error and check credentials.

Authenticated mail improves deliverability but cannot promise inbox placement. A live authenticated send and the received headers are needed to verify the final result.
