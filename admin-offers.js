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
let pendingCoverBlob = null;
let coverCrop = null;
let coverCropImageId = null;
let offerGallery = [];
let processingPhotos = false;
const photoUI = {
  search: document.querySelector("[data-photo-search]"), upload: document.querySelector("[data-photo-upload]"),
  selection: document.querySelector("[data-photo-selection]"), image: document.querySelector("[data-selected-photo]"),
  credit: document.querySelector("[data-photo-credit]"), find: document.querySelector("[data-find-photo]"),
  crop: document.querySelector("[data-crop-cover]"), gallery: document.querySelector("[data-gallery-settings]"), save: document.querySelector("[data-save-photos]")
};

function imagePreviewUrl(image, submissionId, crop, bundledPhoto) {
  const query = new URLSearchParams({ submissionId });
  if (image) query.set("imageId", image.id);
  else query.set("photo", bundledPhoto || "coast.jpg");
  if (crop) query.set("crop", JSON.stringify(crop));
  return "/api/admin/offer-image?" + query;
}

function photoState() {
  const mode = offerUI.form.elements.photoMode.value;
  photoUI.search.hidden = mode !== "stock";
  photoUI.upload.hidden = mode !== "upload";
  offerUI.form.elements.photoQuery.required = mode === "stock";
  offerUI.form.elements.photoFile.required = mode === "upload" && !pendingCoverBlob;
  offerUI.form.elements.photoRights.required = mode === "upload";
}

function displaySelectedPhoto(image) {
  if (offerUI.form.elements.photoMode.value === "default") image = null;
  photoUI.selection.hidden = !image && !currentOffer;
  photoUI.crop.disabled = !image && !currentOffer && !pendingCoverBlob;
  if (image || currentOffer) {
    photoUI.image.src = imagePreviewUrl(image, offerSubmission.id, coverCrop, currentOffer?.photo);
    photoUI.credit.textContent = image?.credit || "GambianTour.com";
  }
}

function photoBusy(busy, message = "") {
  processingPhotos = busy;
  for (const control of offerUI.form.elements) control.disabled = busy;
  offerUI.close.disabled = busy;
  offerUI.progress.hidden = !busy;
  offerUI.progressTitle.textContent = "Preparing your photos";
  offerUI.progressMessage.textContent = message;
  if (!busy) {
    offerUI.generate.disabled = !offerGenerationConfigured;
    photoUI.crop.disabled = !pendingCoverBlob && !selectedOfferImage && !currentOffer;
  }
}

function releasePhotoDrafts() {
  if (localPhotoUrl) URL.revokeObjectURL(localPhotoUrl);
  for (const photo of offerGallery) if (photo.localUrl) URL.revokeObjectURL(photo.localUrl);
  localPhotoUrl = null;
  pendingCoverBlob = null;
}

function renderGallerySettings() {
  photoUI.gallery.replaceChildren();
  offerUI.form.elements.galleryRights.required = offerGallery.some(photo => photo.blob);
  for (const [index, photo] of offerGallery.entries()) {
    const item = document.createElement("div");
    item.className = "gallery-photo-item";
    const preview = document.createElement("img");
    preview.alt = photo.caption || photo.title || "Gallery photo";
    preview.src = photo.previewUrl || photo.localUrl || imagePreviewUrl(photo, offerSubmission.id, photo.crop);
    const label = document.createElement("label");
    label.textContent = "Photo caption";
    const caption = document.createElement("input");
    caption.value = photo.caption || "";
    caption.maxLength = 120;
    caption.addEventListener("input", () => { photo.caption = caption.value; });
    label.append(caption);
    const creditLabel = document.createElement("label");
    creditLabel.textContent = "Photo credit";
    const credit = document.createElement("input");
    credit.value = photo.credit || "";
    credit.maxLength = 240;
    credit.readOnly = photo.source && photo.source !== "upload";
    credit.addEventListener("input", () => { photo.credit = credit.value; });
    creditLabel.append(credit);
    const actions = document.createElement("div");
    actions.className = "photo-actions";
    function command(title, callback) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "photo-command";
      button.textContent = title;
      button.addEventListener("click", callback);
      actions.append(button);
    }
    command("Crop", async () => {
      try {
        const crop = await OfferPhotoTools.crop(photo.localUrl || imagePreviewUrl(photo, offerSubmission.id), 4 / 3, photo.crop);
        if (crop) {
          photo.crop = crop;
          if (photo.localUrl) {
            // Use a local cropped preview; retain the original blob for later recropping.
            const image = new Image();
            image.src = photo.localUrl;
            await image.decode();
            photo.previewUrl = localCropPreview(image, crop);
            preview.src = photo.previewUrl;
          } else preview.src = imagePreviewUrl(photo, offerSubmission.id, crop);
        }
      } catch (error) { offerUI.feedback.textContent = error.message; }
    });
    command("Move up", () => {
      if (index > 0) { [offerGallery[index - 1], offerGallery[index]] = [offerGallery[index], offerGallery[index - 1]]; renderGallerySettings(); }
    });
    command("Remove", () => {
      if (photo.localUrl) URL.revokeObjectURL(photo.localUrl);
      offerGallery.splice(index, 1);
      renderGallerySettings();
    });
    item.append(preview, label, creditLabel, actions);
    photoUI.gallery.append(item);
  }
}

function localCropPreview(image, crop) {
  const canvas = document.createElement("canvas");
  canvas.width = 1000;
  canvas.height = Math.round(1000 * crop.height * image.naturalHeight / (crop.width * image.naturalWidth));
  canvas.getContext("2d").drawImage(image, crop.x * image.naturalWidth, crop.y * image.naturalHeight, crop.width * image.naturalWidth, crop.height * image.naturalHeight, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", .85);
}

photoUI.crop.addEventListener("click", async () => {
  const image = offerUI.form.elements.photoMode.value === "default" ? null : selectedOfferImage || currentOffer?.image;
  try {
    const crop = await OfferPhotoTools.crop(localPhotoUrl || imagePreviewUrl(image, offerSubmission.id, null, currentOffer?.photo), 595.28 / 180, coverCrop);
    if (!crop) return;
    coverCrop = crop;
    coverCropImageId = pendingCoverBlob ? "pending" : image?.id || currentOffer?.photo;
    if (localPhotoUrl) {
      const local = new Image(); local.src = localPhotoUrl; await local.decode();
      photoUI.image.src = localCropPreview(local, crop);
    } else displaySelectedPhoto(image);
    const hero = offerUI.preview.querySelector(".offer-preview-hero img");
    if (hero) hero.src = photoUI.image.src;
  } catch (error) { offerUI.feedback.textContent = error.message; }
});

offerUI.form.elements.galleryFiles.addEventListener("change", async () => {
  const files = Array.from(offerUI.form.elements.galleryFiles.files);
  if (files.length + offerGallery.length > 6) { offerUI.feedback.textContent = "Choose up to 6 gallery photos."; offerUI.form.elements.galleryFiles.value = ""; return; }
  photoBusy(true, "Preparing gallery photos…");
  offerUI.feedback.textContent = "";
  try {
    for (const [index, file] of files.entries()) {
      const blob = await OfferPhotoTools.prepareFile(file, message => { offerUI.progressMessage.textContent = `${message} (${index + 1}/${files.length})`; });
      offerGallery.push({ blob, name: file.name, title: file.name, localUrl: URL.createObjectURL(blob), crop: null, caption: "" });
    }
  } catch (error) { offerUI.feedback.textContent = error.message; }
  finally { offerUI.form.elements.galleryFiles.value = ""; renderGallerySettings(); photoBusy(false); }
});

offerUI.form.elements.photoMode.addEventListener("change", () => {
  selectedOfferImage = null;
  const defaultPhoto = offerUI.form.elements.photoMode.value === "default";
  coverCrop = defaultPhoto && currentOffer?.image ? null : currentOffer?.coverCrop || null;
  coverCropImageId = defaultPhoto ? currentOffer?.photo : currentOffer?.image?.id || currentOffer?.photo || null;
  pendingCoverBlob = null;
  if (localPhotoUrl) URL.revokeObjectURL(localPhotoUrl);
  localPhotoUrl = null;
  displaySelectedPhoto(currentOffer?.image);
  photoState();
});
offerUI.form.elements.photoQuery.addEventListener("input", () => { selectedOfferImage = null; });
offerUI.form.elements.photoFile.addEventListener("change", async () => {
  if (localPhotoUrl) URL.revokeObjectURL(localPhotoUrl);
  const file = offerUI.form.elements.photoFile.files[0];
  localPhotoUrl = null;
  pendingCoverBlob = null;
  coverCrop = null;
  coverCropImageId = null;
  if (!file) return displaySelectedPhoto(currentOffer?.image);
  photoBusy(true, "Preparing your cover photo…");
  offerUI.feedback.textContent = "";
  try {
    pendingCoverBlob = await OfferPhotoTools.prepareFile(file, message => { offerUI.progressMessage.textContent = message; });
    localPhotoUrl = URL.createObjectURL(pendingCoverBlob);
    photoUI.image.src = localPhotoUrl;
    photoUI.credit.textContent = file.name;
    photoUI.selection.hidden = false;
    photoUI.crop.disabled = false;
  } catch (error) { offerUI.form.elements.photoFile.value = ""; displaySelectedPhoto(currentOffer?.image); offerUI.feedback.textContent = error.message; }
  finally { photoBusy(false); }
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
    coverCrop = null;
    coverCropImageId = result.image.id;
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
  if (generatingOffer || findingOfferPhoto || processingPhotos) return;
  offerSubmission = submission;
  currentOffer = null;
  offerVersions = [];
  offerGenerationConfigured = false;
  offerUI.form.reset();
  selectedOfferImage = null;
  releasePhotoDrafts();
  offerGallery = [];
  coverCrop = null;
  coverCropImageId = null;
  renderGallerySettings();
  displaySelectedPhoto(null);
  photoState();
  offerUI.form.elements.language.value = submission.language === "pl" ? "pl" : "en";
  offerUI.customer.textContent = submission.name;
  offerUI.feedback.textContent = "";
  offerUI.downloads.hidden = true;
  photoUI.save.hidden = true;
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
  photo.src = offer.image || offer.coverCrop ? imagePreviewUrl(offer.image, offer.submissionId, offer.coverCrop, offer.photo) : "assets/offers/" + offer.photo;
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
  if (offer.gallery?.length) {
    heading(offer.language === "pl" ? "Kadry z Twojej podróży" : "A glimpse of your journey");
    const gallery = document.createElement("div");
    gallery.className = "offer-preview-gallery";
    for (const item of offer.gallery) {
      const figure = document.createElement("figure");
      const image = document.createElement("img");
      image.src = imagePreviewUrl(item, offer.submissionId, item.crop);
      image.alt = item.caption || item.title;
      figure.append(image, textElement("figcaption", "", item.caption || ""));
      gallery.append(figure);
    }
    body.append(gallery);
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
  releasePhotoDrafts();
  offerGallery = (offer.gallery || []).map(photo => ({ ...photo }));
  coverCrop = offer.coverCrop || null;
  coverCropImageId = offer.image?.id || offer.photo;
  renderGallerySettings();
  photoUI.save.hidden = false;
  selectedOfferImage = null;
  offerUI.form.elements.photoMode.value = "auto";
  offerUI.form.elements.photoFile.value = "";
  offerUI.form.elements.photoRights.checked = false;
  offerUI.form.elements.galleryRights.checked = false;
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
  if (generatingOffer || findingOfferPhoto || processingPhotos || !offerUI.form.reportValidity()) return;
  const photoFile = offerUI.form.elements.photoFile.files[0];
  if (offerUI.form.elements.photoMode.value === "upload" && !pendingCoverBlob) {
    offerUI.feedback.textContent = "Select a cover photo and wait for it to finish preparing.";
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
  input.photosOnly = event.submitter === photoUI.save;
  if (input.photosOnly) {
    offerUI.progressTitle.textContent = "Saving your photo layout";
    offerUI.progressMessage.textContent = "Preparing photos and your updated PDF…";
  }
  input.coverCrop = coverCrop;
  input.coverCropImageId = coverCropImageId;
  if (input.photoMode === "stock" && selectedOfferImage) input.imageId = selectedOfferImage.id;
  for (const control of offerUI.form.elements) control.disabled = true;
  offerUI.close.disabled = true;
  const timer = setTimeout(() => { offerUI.progressMessage.textContent = "Writing the proposal and preparing your downloadable PDF…"; }, 4000);
  try {
    if (input.photoMode === "upload") {
      offerUI.progressMessage.textContent = "Uploading and preparing your cover photo…";
      const uploaded = await api("/api/admin/offer-image", { method: "POST", body: JSON.stringify({ submissionId: offerSubmission.id, name: photoFile.name, data: await fileBase64(pendingCoverBlob), rightsConfirmed: formData.get("photoRights") === "on", credit: formData.get("photoCredit") }) });
      input.imageId = uploaded.image.id;
      input.coverCropImageId = uploaded.image.id;
    }
    input.gallery = [];
    for (const [index, photo] of offerGallery.entries()) {
      if (photo.blob) {
        offerUI.progressMessage.textContent = `Uploading gallery photo ${index + 1} of ${offerGallery.length}…`;
        const uploaded = await api("/api/admin/offer-image", { method: "POST", body: JSON.stringify({ submissionId: offerSubmission.id, name: photo.name, data: await fileBase64(photo.blob), rightsConfirmed: formData.get("galleryRights") === "on", credit: photo.credit }) });
        Object.assign(photo, uploaded.image);
        delete photo.blob;
      }
      input.gallery.push({ id: photo.id, crop: photo.crop, caption: photo.caption, credit: photo.credit });
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
offerUI.dialog.addEventListener("cancel", event => { if (generatingOffer || findingOfferPhoto || processingPhotos) event.preventDefault(); });
document.querySelector("[data-open-offer]").addEventListener("click", () => openOfferEditor(selectedSubmission));
