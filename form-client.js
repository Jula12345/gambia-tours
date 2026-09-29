(function () {
  const forms = document.querySelectorAll(".trip-form");
  if (!forms.length || window.location.protocol === "file:") return;

  function feedbackFor(form) {
    let feedback = form.querySelector("[data-form-feedback]");
    if (feedback) return feedback;
    feedback = document.createElement("p");
    feedback.className = "trip-form-feedback wide";
    feedback.dataset.formFeedback = "";
    feedback.setAttribute("role", "status");
    feedback.setAttribute("aria-live", "polite");
    form.querySelector('button[type="submit"]')?.before(feedback);
    return feedback;
  }

  function payloadFrom(form) {
    const data = Object.fromEntries(new FormData(form).entries());
    return {
      ...data,
      requestId: `GT-${Date.now().toString().slice(-6)}`,
      source: "tour-detail-form",
      page: window.location.href,
      language: document.documentElement.lang || "en",
      date: data.startDate || data.date || ""
    };
  }

  forms.forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const payload = payloadFrom(form);
      const feedback = feedbackFor(form);
      const button = form.querySelector('button[type="submit"]');

      if (payload._honey) {
        feedback.textContent = "Thank you. Your request has been received.";
        return;
      }

      button.disabled = true;
      feedback.classList.remove("error");
      feedback.textContent = "Sending your request...";

      try {
        const response = await fetch("/api/submissions", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload)
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(result.error || "The request could not be sent.");
        feedback.textContent = `Thank you. Request ${result.id || payload.requestId} has been received. We will contact you shortly.`;
        form.reset();
        form.dispatchEvent(new Event("change", { bubbles: true }));
      } catch (error) {
        feedback.classList.add("error");
        feedback.textContent = "The booking server is unavailable. Opening the direct email form...";
        window.setTimeout(() => HTMLFormElement.prototype.submit.call(form), 500);
      } finally {
        button.disabled = false;
      }
    });
  });
})();
