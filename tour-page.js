const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const startDate = document.querySelector("[data-trip-start-date]");
const dateHint = document.querySelector("[data-trip-date-hint]");
const endDate = document.querySelector("[data-trip-end-date]");
const tripPeriod = document.querySelector("[data-trip-period]");

function pageText(value) { return window.GambianTourLanguage?.text(value) || value; }

function updateMenuLabel() {
  if (!menuToggle || !nav) return;
  menuToggle.setAttribute("aria-label", pageText(nav.classList.contains("open") ? "Close navigation" : "Open navigation"));
  menuToggle.setAttribute("aria-expanded", String(nav.classList.contains("open")));
}

function toDateValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return "";
  return new Intl.DateTimeFormat(window.GambianTourLanguage?.locale || "en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(year, month - 1, day));
}

function updateTripDates() {
  if (!startDate || !dateHint) return;
  const days = Number(startDate.dataset.rangeDays || "1");
  const nights = Number(startDate.dataset.rangeNights || Math.max(days - 1, 0));
  const format = (key, values) => window.GambianTourLanguage?.format(key, values) || key;
  if (!startDate.value) {
    dateHint.textContent = days > 1 ? format("Choose a start date to calculate the full {days}-day period.", {days}) : pageText("Choose your preferred tour date.");
    if (endDate) endDate.value = "";
    if (tripPeriod) tripPeriod.value = "";
    return;
  }
  if (days <= 1) {
    const period = formatDate(startDate.value);
    dateHint.textContent = pageText("Preferred tour date") + ": " + period;
    if (endDate) endDate.value = "";
    if (tripPeriod) tripPeriod.value = period;
    return;
  }
  const [year, month, day] = startDate.value.split("-").map(Number);
  const end = new Date(year, month - 1, day);
  end.setDate(end.getDate() + days - 1);
  const endValue = toDateValue(end);
  const nightUnit = document.documentElement.lang === "pl" ? (nights === 1 ? "nocleg" : nights >= 2 && nights <= 4 ? "noclegi" : "noclegów") : pageText(nights === 1 ? "night" : "nights");
  const period = formatDate(startDate.value) + " – " + formatDate(endValue) + " (" + days + " " + pageText(days===1 ? "day" : "days") + " / " + nights + " " + nightUnit + ")";
  dateHint.textContent = pageText("Tour period") + ": " + period;
  if (endDate) endDate.value = endValue;
  if (tripPeriod) tripPeriod.value = period;
}

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    updateMenuLabel();
  });
  nav.addEventListener("click", () => {
    nav.classList.remove("open");
    updateMenuLabel();
  });
}

if (startDate) {
  startDate.min = toDateValue(new Date());
  if (document.querySelector(".trip-form")) {
    const params = new URLSearchParams(window.location.search);
    const preferredDate = params.get("date");
    if (/^\d{4}-\d{2}-\d{2}$/.test(preferredDate || "") && preferredDate >= startDate.min) startDate.value = preferredDate;
    const guests = Number(params.get("guests"));
    if (Number.isInteger(guests) && guests >= 1 && guests <= 100) document.querySelector('[name="guests"]').value = String(guests);
  }
  startDate.addEventListener("change", updateTripDates);
  updateTripDates();
}

if (window.lucide) window.lucide.createIcons();

window.addEventListener("gambiantour:language", () => { updateMenuLabel(); updateTripDates(); });
