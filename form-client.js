(function () {
  const forms = document.querySelectorAll(".trip-form");
  if (!forms.length || window.location.protocol === "file:") return;

  function text(value) { return window.GambianTourLanguage?.text(value) || value; }

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
      requestId: `GT-${crypto.randomUUID()}`,
      source: form.dataset.source || "tour-detail-form",
      page: window.location.href,
      language: document.documentElement.lang || "en",
      date: data.startDate || data.date || "",
      notes: [data.variant ? `Tour option: ${data.variant}` : "", data.ship ? `Cruise ship: ${data.ship}` : "", data.port ? `Port / meeting point: ${data.port}` : "", data.arrival ? `Scheduled arrival (port local time): ${data.arrival}` : "", data.allAboard ? `All-aboard (port local time): ${data.allAboard}` : "", data.guideLanguage ? `Guide language: ${data.guideLanguage}` : "", data.apartment ? `Apartment preference: ${data.apartment}` : "", data.notes || ""].filter(Boolean).join("\n")
    };
  }

  forms.forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (form.dataset.sending === "true" || form.dataset.submitted === "true") return;
      if (!form.reportValidity()) return;

      const payload = payloadFrom(form);
      const feedback = feedbackFor(form);
      const button = form.querySelector('button[type="submit"]');

      if (payload._honey) {
        feedback.textContent = text("Thank you. Your request has been received.");
        return;
      }

      button.disabled = true;
      form.dataset.sending = "true";
      feedback.classList.remove("error");
      feedback.textContent = text("Sending your request...");

      try {
        const result = await submitWebsiteEnquiry(payload);
        feedback.textContent = `Thank you. Request ${result.id || payload.requestId} has been received. We will contact you shortly.`;
        form.reset();
        form.dataset.submitted = "true";
        form.hidden = true;
        const confirmation = document.createElement("div");
        confirmation.className = "trip-form";
        confirmation.setAttribute("role", "status");
        const heading = document.createElement("h3");
        heading.className = "wide";
        heading.textContent = text("Your request has been received");
        const message = document.createElement("p");
        message.className = "wide";
        message.textContent = (window.GambianTourLanguage?.format("Reference {id}. We will contact you shortly.", {id: result.id || payload.requestId})) || `Reference ${result.id || payload.requestId}. We will contact you shortly.`;
        confirmation.append(heading, message);
        form.after(confirmation);
        form.dispatchEvent(new Event("change", { bubbles: true }));
      } catch (error) {
        feedback.classList.add("error");
        feedback.textContent = text("Your request could not be sent. Please try again or email info@gambiantour.com. Your form details have been kept.");
      } finally {
        button.disabled = form.dataset.submitted === "true";
        form.dataset.sending = "false";
      }
    });
  });
})();
