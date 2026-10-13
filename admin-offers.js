const offerUI = {
  dialog: document.querySelector("[data-offer-dialog]"),
  form: document.querySelector("[data-offer-form]"),
  customer: document.querySelector("[data-offer-customer]"),
  tour: document.querySelector("[data-offer-tour]"),
  feedback: document.querySelector("[data-offer-feedback]"),
  generate: document.querySelector("[data-generate-offer]"),
  preview: document.querySelector("[data-offer-preview]"),
  downloads: document.querySelector("[data-offer-downloads]"),
  download: document.querySelector("[data-download-offer]"),
  versions: document.querySelector("[data-offer-version]"),
  price: document.querySelector("[data-price-field]"),
  progress: document.querySelector("[data-offer-progress]"),
  progressTitle: document.querySelector("[data-progress-title]"),
  progressMessage: document.querySelector("[data-progress-message]"),
  close: document.querySelector("[data-close-offer]"),
  cost: document.querySelector("[data-offer-cost]")
};
let offerSubmission = null;
let offerVersions = [];
let currentOffer = null;
let generatingOffer = false;
let downloadingOffer = false;
const offerPdfDownloads = new Map();
let selectedOfferImage = null;
let findingOfferPhoto = false;
let offerGenerationConfigured = false;
let localPhotoUrl = null;
const photoUI = {
  search: document.querySelector("[data-photo-search]"), upload: document.querySelector("[data-photo-upload]"),
  selection: document.querySelector("[data-photo-selection]"), image: document.querySelector("[data-selected-photo]"),
  credit: document.querySelector("[data-photo-credit]"), find: document.querySelector("[data-find-photo]")
};

function imagePreviewUrl(image, submissionId) {
  return "/api/admin/offer-image?submissionId=" + encodeURIComponent(submissionId) + "&imageId=" + encodeURIComponent(image.id);
}

function photoState() {
  const mode = offerUI.form.elements.photoMode.value;
  photoUI.search.hidden = mode !== "stock";
  photoUI.upload.hidden = mode !== "upload";
  offerUI.form.elements.photoQuery.required = mode === "stock";
  offerUI.form.elements.photoFile.required = mode === "upload";
  offerUI.form.elements.photoRights.required = mode === "upload";
}

function displaySelectedPhoto(image) {
  photoUI.selection.hidden = !image;
  if (image) {
    photoUI.image.src = imagePreviewUrl(image, offerSubmission.id);
    photoUI.credit.textContent = image.credit;
  }
}

offerUI.form.elements.photoMode.addEventListener("change", () => {
  selectedOfferImage = null;
  displaySelectedPhoto(currentOffer?.image);
  photoState();
});
offerUI.form.elements.photoQuery.addEventListener("input", () => { selectedOfferImage = null; });
offerUI.form.elements.photoFile.addEventListener("change", () => {
  if (localPhotoUrl) URL.revokeObjectURL(localPhotoUrl);
  const file = offerUI.form.elements.photoFile.files[0];
  if (!file) return displaySelectedPhoto(currentOffer?.image);
  localPhotoUrl = URL.createObjectURL(file);
  photoUI.image.src = localPhotoUrl;
  photoUI.credit.textContent = file.name;
  photoUI.selection.hidden = false;
});
photoUI.find.addEventListener("click", async () => {
  if (findingOfferPhoto || generatingOffer || !offerUI.form.elements.photoQuery.reportValidity()) return;
  findingOfferPhoto = true;
  photoUI.find.disabled = true;
  offerUI.form.elements.photoQuery.disabled = true;
  offerUI.form.elements.photoMode.disabled = true;
  offerUI.generate.disabled = true;
  offerUI.close.disabled = true;
  photoUI.find.textContent = "Finding a photo…";
  offerUI.feedback.textContent = "";
  try {
    const result = await api("/api/admin/offer-image", { method: "POST", body: JSON.stringify({ action: "search", submissionId: offerSubmission.id, query: offerUI.form.elements.photoQuery.value, previousImageId: selectedOfferImage?.id || currentOffer?.image?.id }) });
    selectedOfferImage = result.image;
    displaySelectedPhoto(result.image);
  } catch (error) { offerUI.feedback.textContent = error.message; }
  finally {
    findingOfferPhoto = false;
    photoUI.find.disabled = false;
    offerUI.form.elements.photoQuery.disabled = false;
    offerUI.form.elements.photoMode.disabled = false;
    offerUI.generate.disabled = !offerGenerationConfigured;
    offerUI.close.disabled = false;
    photoUI.find.textContent = "Find photo";
  }
});

function fileBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1]);
    reader.onerror = () => reject(new Error("Your photo could not be read. Please select it again."));
    reader.readAsDataURL(file);
  });
}

async function readOffers(submissionId) {
  const url = "/api/admin/offers?submissionId=" + encodeURIComponent(submissionId);
  for (let attempt = 0; ; attempt++) {
    try { return await api(url); }
    catch (error) {
      if (attempt >= 2 || (error.status && error.status < 500)) throw error;
      await new Promise(resolve => setTimeout(resolve, 700 * (attempt + 1)));
    }
  }
}

function fetchOfferPdf(offer) {
  if (!offerPdfDownloads.has(offer.id)) {
    const pending = (async () => {
      const url = "/api/admin/offer-pdf?submissionId=" + encodeURIComponent(offer.submissionId) + "&offerId=" + encodeURIComponent(offer.id);
      const response = await fetch(url, { credentials: "same-origin" });
      if (!response.ok || !response.headers.get("content-type")?.includes("application/pdf")) {
        const result = await response.json().catch(() => ({}));
        throw new Error(response.status === 401 ? "Your session has expired. Please sign in again." : result.error || "PDF download failed. Please try again.");
      }
      const blob = await response.blob();
      if ((await blob.slice(0, 4).text()) !== "%PDF") throw new Error("The PDF was incomplete. Please try again.");
      return blob;
    })();
    offerPdfDownloads.set(offer.id, pending);
    pending.catch(() => offerPdfDownloads.delete(offer.id));
    // Retain only a few versions in browser memory.
    if (offerPdfDownloads.size > 3) offerPdfDownloads.delete(offerPdfDownloads.keys().next().value);
  }
  return offerPdfDownloads.get(offer.id);
}

offerUI.download.addEventListener("click", async () => {
  if (!currentOffer || downloadingOffer) return;
  const offer = currentOffer;
  downloadingOffer = true;
  offerUI.download.disabled = true;
  offerUI.download.textContent = "Downloading PDF…";
  offerUI.feedback.textContent = "";
  try {
    const blob = await fetchOfferPdf(offer);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "GambianTour-offer-" + offer.id + ".pdf";
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  } catch (error) {
    offerUI.feedback.textContent = error instanceof TypeError ? "Connection interrupted. Please try downloading the PDF again." : error.message;
  } finally {
    downloadingOffer = false;
    offerUI.download.disabled = generatingOffer;
    offerUI.download.textContent = "Download PDF";
  }
});

function offerPriceState() {
  const included = offerUI.form.elements.includePrice.checked;
  offerUI.price.hidden = !included;
  offerUI.form.elements.pricePerPerson.required = included;
}

async function openOfferEditor(submission) {
  if (generatingOffer || findingOfferPhoto) return;
  offerSubmission = submission;
  currentOffer = null;
  offerVersions = [];
  offerGenerationConfigured = false;
  offerUI.form.reset();
  selectedOfferImage = null;
  if (localPhotoUrl) URL.revokeObjectURL(localPhotoUrl);
  localPhotoUrl = null;
  displaySelectedPhoto(null);
  photoState();
  offerUI.form.elements.language.value = submission.language === "pl" ? "pl" : "en";
  offerUI.customer.textContent = submission.name;
  offerUI.feedback.textContent = "";
  offerUI.downloads.hidden = true;
  offerUI.generate.textContent = "Generate offer";
  offerUI.preview.replaceChildren(textElement("p", "empty-state", "Loading tour details…"));
  offerUI.generate.disabled = true;
  offerPriceState();
  elements.dialog.close();
  offerUI.dialog.showModal();
  try {
    const result = await readOffers(submission.id);
    const matchingTour = result.tours.find(tour => [tour.id, tour.title, tour.polishTitle].includes(submission.tour));
    offerUI.tour.replaceChildren(new Option("Choose a trip", ""), ...result.tours.map(tour => {
      const option = new Option(tour.title, tour.id);
      option.selected = [tour.id, tour.title, tour.polishTitle].includes(submission.tour);
      return option;
    }));
    offerUI.tour.value = matchingTour?.id || "";
    offerVersions = result.offers;
    if (offerVersions.length) showOffer(offerVersions[0]);
    else offerUI.preview.replaceChildren(textElement("p", "empty-state", "Choose your settings and generate a proposal for this guest."));
    if (!result.configured) {
      offerUI.feedback.textContent = "Add OPENAI_API_KEY in Vercel Environment Variables and redeploy to enable generation.";
    }
    offerGenerationConfigured = result.configured;
    offerUI.generate.disabled = !result.configured;
  } catch (error) {
    offerUI.feedback.textContent = error instanceof TypeError ? "Connection interrupted while loading offers. Please reopen this request to try again." : error.message;
  }
}

function showOffer(offer) {
  currentOffer = offer;
  offerUI.form.elements.tourId.value = offer.tourId;
  offerUI.form.elements.language.value = offer.language;
  offerUI.form.elements.currency.value = offer.currency;
  offerUI.form.elements.includePrice.checked = offer.includePrice;
  offerUI.form.elements.pricePerPerson.value = offer.pricePerPerson || "";
  offerPriceState();
  offerUI.preview.replaceChildren();
  const hero = document.createElement("div");
  hero.className = "offer-preview-hero";
  const photo = document.createElement("img");
  photo.src = offer.image ? imagePreviewUrl(offer.image, offer.submissionId) : "assets/offers/" + offer.photo;
  photo.alt = offer.image?.title || "Travel destination";
  photo.style.objectPosition = !offer.image && offer.photo === "river.jpg" ? "center bottom" : "center";
  hero.append(photo, textElement("span", "", "GambianTour.com"));
  const body = document.createElement("div");
  body.className = "offer-preview-body";
  body.append(textElement("p", "eyebrow", offer.language === "pl" ? "Indywidualna propozycja podróży" : "Private travel proposal"), textElement("h2", "", offer.content.title), textElement("p", "offer-guest", offer.customer.name), textElement("p", "", offer.content.introduction));
  const heading = label => body.append(textElement("h3", "", label));
  function list(items) {
    const ul = document.createElement("ul");
    ul.append(...items.map(item => textElement("li", "", item)));
    body.append(ul);
  }
  heading(offer.language === "pl" ? "Najważniejsze atrakcje" : "Highlights");
  list(offer.content.highlights);
  heading(offer.language === "pl" ? "Program" : "Itinerary");
  for (const stop of offer.content.itinerary) {
    const block = document.createElement("article");
    block.className = "offer-preview-stop";
    block.append(textElement("small", "", stop.label), textElement("h4", "", stop.title), textElement("p", "", stop.description));
    body.append(block);
  }
  if (offer.includePrice) {
    const money = new Intl.NumberFormat(offer.language === "pl" ? "pl-PL" : "en-GB", { style: "currency", currency: offer.currency });
    const quote = document.createElement("div");
    quote.className = "offer-preview-quote";
    quote.append(textElement("strong", "", money.format(offer.pricePerPerson) + (offer.language === "pl" ? " / osoba" : " / person")), textElement("p", "", (offer.language === "pl" ? "Łącznie: " : "Group total: ") + money.format(offer.totalPrice)));
    body.append(quote);
  }
  heading(offer.language === "pl" ? "W cenie" : "Included"); list(offer.content.included);
  heading(offer.language === "pl" ? "Poza ceną" : "Not included"); list(offer.content.excluded);
  heading(offer.language === "pl" ? "Informacje praktyczne" : "Practical notes"); list(offer.content.practicalNotes);
  body.append(textElement("p", "", offer.content.closing));
  offerUI.preview.append(hero, body);
  selectedOfferImage = null;
  offerUI.form.elements.photoMode.value = "auto";
  offerUI.form.elements.photoFile.value = "";
  offerUI.form.elements.photoRights.checked = false;
  photoState();
  displaySelectedPhoto(offer.image);
  if (offer.imageWarning) offerUI.feedback.textContent = offer.imageWarning;
  offerUI.downloads.hidden = false;
  // Start fetching before the click so saved PDFs download immediately when ready.
  fetchOfferPdf(offer).catch(() => {});
  offerUI.versions.replaceChildren(...offerVersions.map(version => new Option("Version " + version.revision + " · " + formatDate(version.createdAt), version.id)));
  offerUI.versions.value = offer.id;
  offerUI.generate.textContent = "Revise / regenerate";
  const cost = offer.usage.estimatedCostUsd;
  offerUI.cost.textContent = cost === null ? "Token usage: " + (offer.usage.inputTokens + offer.usage.outputTokens) : "Estimated generation cost: $" + cost.toFixed(4);
}

offerUI.form.addEventListener("submit", async event => {
  event.preventDefault();
  if (generatingOffer || findingOfferPhoto || !offerUI.form.reportValidity()) return;
  const photoFile = offerUI.form.elements.photoFile.files[0];
  if (offerUI.form.elements.photoMode.value === "upload" && photoFile?.size > 2 * 1024 * 1024) {
    offerUI.feedback.textContent = "Choose a JPG, PNG or WebP photo no larger than 2 MB.";
    return;
  }
  generatingOffer = true;
  offerUI.feedback.textContent = "";
  offerUI.progress.hidden = false;
  offerUI.progressTitle.textContent = currentOffer ? "Revising your proposal" : "Preparing your proposal";
  offerUI.progressMessage.textContent = "Reading the itinerary and guest preferences…";
  const previousOfferId = currentOffer?.id;
  const knownOfferIds = new Set(offerVersions.map(offer => offer.id));
  const startedAt = Date.now();
  const formData = new FormData(offerUI.form);
  const input = {
    submissionId: offerSubmission.id, previousOfferId,
    tourId: formData.get("tourId"), language: formData.get("language"),
    currency: formData.get("currency"), includePrice: formData.get("includePrice") === "on",
    pricePerPerson: formData.get("pricePerPerson"), prompt: formData.get("prompt")
  };
  input.photoMode = formData.get("photoMode");
  input.photoQuery = formData.get("photoQuery");
  if (input.photoMode === "stock" && selectedOfferImage) input.imageId = selectedOfferImage.id;
  for (const control of offerUI.form.elements) control.disabled = true;
  offerUI.close.disabled = true;
  const timer = setTimeout(() => { offerUI.progressMessage.textContent = "Writing the proposal and preparing your downloadable PDF…"; }, 4000);
  try {
    if (input.photoMode === "upload") {
      offerUI.progressMessage.textContent = "Uploading and preparing your cover photo…";
      const uploaded = await api("/api/admin/offer-image", { method: "POST", body: JSON.stringify({ submissionId: offerSubmission.id, name: photoFile.name, data: await fileBase64(photoFile), rightsConfirmed: formData.get("photoRights") === "on", credit: formData.get("photoCredit") }) });
      input.imageId = uploaded.image.id;
    }
    const result = await api("/api/admin/offers", { method: "POST", body: JSON.stringify(input) });
    offerVersions.unshift(result.offer);
    showOffer(result.offer);
    offerUI.form.elements.prompt.value = "";
  } catch (error) {
    if (error instanceof TypeError || error.status >= 500) {
      clearTimeout(timer);
      offerUI.progressMessage.textContent = "Connection interrupted. Checking for your saved proposal…";
      try {
        const result = await readOffers(offerSubmission.id);
        const recovered = result.offers.find(offer => !knownOfferIds.has(offer.id) && offer.tourId === input.tourId && Date.parse(offer.createdAt) >= startedAt - 2000);
        if (recovered) {
          offerVersions = result.offers;
          showOffer(recovered);
          offerUI.form.elements.prompt.value = "";
          offerUI.feedback.textContent = "Your proposal was saved successfully and is ready to download.";
        } else {
          offerUI.feedback.textContent = "The connection was interrupted. Your request may still be processing; reopen this booking to check saved offers before generating again.";
        }
      } catch {
        offerUI.feedback.textContent = "Unable to check saved offers. Please reopen this booking once your connection is restored before generating again.";
      }
    } else offerUI.feedback.textContent = error.message;
  } finally {
    clearTimeout(timer);
    generatingOffer = false;
    offerUI.progress.hidden = true;
    for (const control of offerUI.form.elements) control.disabled = false;
    offerUI.close.disabled = false;
  }
});
offerUI.form.elements.includePrice.addEventListener("change", offerPriceState);
offerUI.versions.addEventListener("change", () => showOffer(offerVersions.find(o => o.id === offerUI.versions.value)));
offerUI.close.addEventListener("click", () => offerUI.dialog.close());
offerUI.dialog.addEventListener("cancel", event => { if (generatingOffer || findingOfferPhoto) event.preventDefault(); });
document.querySelector("[data-open-offer]").addEventListener("click", () => openOfferEditor(selectedSubmission));
