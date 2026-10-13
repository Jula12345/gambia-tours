async function submitWebsiteEnquiry(payload) {
  let backendResponse;
  try {
    backendResponse = await fetch("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload)
    });
  } catch {
    // Network failures can use the same direct email delivery as the original site.
  }

  if (backendResponse) {
    const result = await backendResponse.json().catch(() => ({}));
    if (backendResponse.ok && result.ok) return result;
    if (backendResponse.status < 500) {
      throw new Error(result.error || "Your request could not be sent.");
    }
  }

  const recipient = "info@gambiantour.com";
  const emailPayload = {
    ...payload,
    _subject: payload._subject || `GambianTour enquiry: ${payload.tour || payload.Tour || "Contact"}`,
    _replyto: payload.email || payload.Email || payload._replyto,
    _captcha: "false",
    _template: "table"
  };
  const response = await fetch(`https://formsubmit.co/ajax/${recipient}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(emailPayload)
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || (result.success !== true && result.success !== "true")) {
    throw new Error("Your request could not be sent.");
  }
  return {
    ok: true,
    id: payload.requestId || payload["Request ID"],
    stored: false,
    emailForwarded: true
  };
}

if (typeof module !== "undefined") module.exports = { submitWebsiteEnquiry };
