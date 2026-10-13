async function submitWebsiteEnquiry(payload) {
  let backendResponse;
  let storedResult;
  try {
    backendResponse = await fetch("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload)
    });
  } catch {
    // An interrupted request may already have sent email; do not send it again via a different provider.
    throw new Error("The connection was interrupted. Please try again or email info@gambiantour.com.");
  }

  if (backendResponse) {
    const result = await backendResponse.json().catch(() => ({}));
    if (backendResponse.ok && result.ok) {
      if (result.emailForwarded || result.duplicate || result.emailFallbackAllowed === false) return result;
      storedResult = result;
    }
    if (!storedResult && (backendResponse.status < 500 || result.emailFallbackAllowed !== true)) {
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
  try {
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
      id: storedResult?.id || payload.requestId || payload["Request ID"],
      stored: Boolean(storedResult?.stored),
      emailForwarded: true
    };
  } catch (error) {
    if (storedResult?.stored) return storedResult;
    throw error;
  }
}

if (typeof module !== "undefined") module.exports = { submitWebsiteEnquiry };
