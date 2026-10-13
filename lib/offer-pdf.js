const PDFDocument = require("pdfkit");
const fs = require("node:fs");
const path = require("node:path");

const root = [path.join(__dirname, "..", "assets", "offers"), path.join(process.cwd(), "assets", "offers")]
  .find(directory => fs.existsSync(path.join(directory, "fonts/regular.ttf")));
const ink = "#173F35";
const muted = "#576760";
const gold = "#E9B64E";
const labels = {
  en: { proposal: "YOUR PRIVATE TRAVEL PROPOSAL", prepared: "Prepared for", guests: "Guests", dates: "Travel dates", pickup: "Pickup / base", itinerary: "Your itinerary", included: "Included", excluded: "Not included", notes: "Before you travel", quote: "Your quotation", per: "per person", total: "Total for your group", noPrice: "A tailored itinerary, ready to discuss", noPriceNote: "Please contact us for an individual quotation.", subject: "Services, dates and availability remain subject to confirmation. This proposal is not a confirmed booking.", highlights: "A few things to look forward to", closing: "Let’s make it happen", reference: "Reference" },
  pl: { proposal: "TWOJA PRYWATNA PROPOZYCJA PODRÓŻY", prepared: "Przygotowano dla", guests: "Uczestnicy", dates: "Termin podróży", pickup: "Odbiór / baza", itinerary: "Twój program", included: "W cenie", excluded: "Poza ceną", notes: "Przed wyjazdem", quote: "Twoja wycena", per: "za osobę", total: "Łącznie dla grupy", noPrice: "Indywidualny program do omówienia", noPriceNote: "Skontaktuj się z nami po indywidualną wycenę.", subject: "Usługi, terminy i dostępność wymagają potwierdzenia. Ta propozycja nie stanowi potwierdzenia rezerwacji.", highlights: "Na co warto czekać", closing: "Zaplanujmy to razem", reference: "Numer zapytania" }
};
const credits = {
  "coast.jpg": "Kotu Beach — Mark Hodson Photos. CC BY 2.0: creativecommons.org/licenses/by/2.0. Wikimedia Commons. Resized and cropped.",
  "river.jpg": "Gambia River — Mathiasv. CC BY-SA 3.0: creativecommons.org/licenses/by-sa/3.0. Wikimedia Commons. Resized and cropped.",
  "bird.jpg": "Little bee-eater — Charles J. Sharp. CC BY-SA 4.0: creativecommons.org/licenses/by-sa/4.0. Wikimedia Commons. Resized and cropped.",
  "market.jpg": "Banjul Market — Yama Camara, CC0. Wikimedia Commons.",
  "senegal.jpg": "African Renaissance Monument — Richard N Horne. CC BY 4.0: creativecommons.org/licenses/by/4.0. Wikimedia Commons. Cropped."
};

function renderOfferPdf(offer) {
  return new Promise((resolve, reject) => {
    if (!root) throw new Error("Offer PDF fonts are missing from this deployment.");
    const doc = new PDFDocument({ size: "A4", margin: 46, bufferPages: true, font: path.join(root, "fonts/regular.ttf"), info: { Title: offer.content.title, Author: "GambianTour.com" } });
    const buffers = [];
    doc.on("data", chunk => buffers.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(buffers)));
    doc.on("error", reject);
    doc.registerFont("Regular", path.join(root, "fonts/regular.ttf"));
    doc.registerFont("Bold", path.join(root, "fonts/bold.ttf"));
    const l = labels[offer.language] || labels.en;
    const width = doc.page.width;
    const bodyWidth = width - 92;
    let y = 0;

    function text(value, x, top, size = 10, options = {}) {
      doc.font(options.bold ? "Bold" : "Regular").fontSize(size).fillColor(options.color || ink);
      doc.text(String(value || ""), x, top, { width: options.width || bodyWidth, lineGap: 3, ...options });
      return doc.y;
    }
    function newPage(title) {
      doc.addPage();
      doc.rect(0, 0, width, 7).fill(ink);
      text("GambianTour.com", 46, 30, 13, { bold: true });
      text(offer.content.title, 46, 52, 9, { color: muted, width: bodyWidth });
      y = 90;
      if (title) { y = text(title, 46, y, 25, { bold: true }) + 22; }
    }
    function ensure(height) {
      if (y + height > 754) newPage();
    }
    function heading(value) {
      ensure(65);
      y = text(value, 46, y, 21, { bold: true }) + 14;
    }
    function paragraph(value) {
      doc.font("Regular").fontSize(10);
      const height = doc.heightOfString(value, { width: bodyWidth, lineGap: 3 });
      ensure(height + 16);
      y = text(value, 46, y, 10) + 16;
    }
    function bullets(items) {
      for (const item of items) {
        doc.font("Regular").fontSize(10);
        ensure(doc.heightOfString(item, { width: bodyWidth - 18, lineGap: 3 }) + 18);
        doc.circle(50, y + 6, 2).fill(gold);
        y = text(item, 64, y, 10, { width: bodyWidth - 18 }) + 12;
      }
      y += 12;
    }
    doc.rect(0, 0, width, 70).fill(ink);
    text("GambianTour.com", 46, 24, 19, { bold: true, color: "#FFFFFF" });
    text("ENGLISH + POLISH-SPEAKING GUIDES", 46, 49, 8, { color: "#D5E5DE" });
    const photo = ["coast.jpg", "river.jpg", "bird.jpg", "market.jpg", "senegal.jpg"].includes(offer.photo) && fs.existsSync(path.join(root, offer.photo)) ? offer.photo : "coast.jpg";
    doc.save().rect(0, 70, width, 180).clip();
    doc.image(path.join(root, photo), 0, 70, { cover: [width, 180], align: "center", valign: photo === "river.jpg" ? "bottom" : "center" });
    doc.restore();
    doc.rect(46, 230, bodyWidth, 37).fill(gold);
    text(l.proposal, 59, 241, 10, { bold: true, width: bodyWidth - 26 });
    let titleSize = 27;
    doc.font("Bold");
    while (titleSize > 20 && doc.fontSize(titleSize).heightOfString(offer.content.title, { width: bodyWidth, lineGap: 3 }) > 68) titleSize--;
    y = text(offer.content.title, 46, 290, titleSize, { bold: true }) + 18;
    text(l.prepared, 46, y, 9, { color: muted });
    y = text(offer.customer.name, 46, y + 17, 16, { bold: true }) + 20;
    const displayDate = value => {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return "";
      return new Intl.DateTimeFormat(offer.language === "pl" ? "pl-PL" : "en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value + "T12:00:00Z"));
    };
    const dates = [displayDate(offer.customer.date), displayDate(offer.customer.endDate)].filter(Boolean).join(" – ") || (offer.customer.tourPeriod || "").slice(0, 80) || (offer.language === "pl" ? "Do ustalenia" : "To be agreed");
    doc.rect(46, y, bodyWidth, 68).fill("#EEF4F1");
    text(l.dates, 60, y + 13, 8, { color: muted, width: bodyWidth - 100 });
    text(dates, 60, y + 30, 11, { bold: true, width: bodyWidth - 105 });
    text(l.guests, width - 115, y + 13, 8, { color: muted, width: 60 });
    text(String(offer.guests), width - 115, y + 30, 18, { bold: true, width: 60 });
    y += 87;
    paragraph(offer.content.introduction);
    y = text(l.highlights, 46, y, 17, { bold: true }) + 15;
    const columnWidth = (bodyWidth - 28) / 2;
    for (let index = 0; index < offer.content.highlights.length; index += 2) {
      let rowHeight = 0;
      for (let offset = 0; offset < 2; offset++) {
        const item = offer.content.highlights[index + offset];
        if (!item) continue;
        const x = 46 + offset * (columnWidth + 28);
        doc.circle(x + 3, y + 6, 2).fill(gold);
        const end = text(item, x + 15, y, 10, { width: columnWidth - 15 });
        rowHeight = Math.max(rowHeight, end - y);
      }
      y += rowHeight + 13;
    }

    newPage(l.itinerary);
    for (const stop of offer.content.itinerary) {
      doc.font("Regular").fontSize(10);
      const height = doc.heightOfString(stop.description, { width: bodyWidth - 72, lineGap: 3 }) + 58;
      ensure(height);
      const top = y;
      text(stop.label, 46, top + 2, 9, { bold: true, color: muted, width: 62 });
      y = text(stop.title, 118, top, 14, { bold: true, width: bodyWidth - 72 }) + 7;
      y = text(stop.description, 118, y, 10, { width: bodyWidth - 72 }) + 22;
      doc.moveTo(118, y - 9).lineTo(width - 46, y - 9).strokeColor("#DDE7E0").stroke();
    }
    newPage(l.quote);
    const price = new Intl.NumberFormat(offer.language === "pl" ? "pl-PL" : "en-GB", { style: "currency", currency: offer.currency });
    if (offer.includePrice) {
      doc.rect(46, y, bodyWidth, 118).fill(ink);
      text(price.format(offer.pricePerPerson), 64, y + 18, 32, { bold: true, color: "#FFFFFF", width: bodyWidth - 36 });
      text(l.per, 64, y + 61, 11, { color: "#D5E5DE", width: bodyWidth - 36 });
      text(`${l.total}: ${price.format(offer.totalPrice)} · ${offer.guests} ${l.guests.toLowerCase()}`, 64, y + 89, 11, { color: "#FFFFFF", width: bodyWidth - 36 });
      y += 136;
    } else {
      heading(l.noPrice);
      paragraph(l.noPriceNote);
    }
    paragraph(l.subject);
    const sectionWidth = (bodyWidth - 30) / 2;
    const columnHeight = items => items.reduce((height, item) => {
      doc.font("Regular").fontSize(10);
      return height + doc.heightOfString(item, { width: sectionWidth - 15, lineGap: 3 }) + 10;
    }, 42);
    ensure(Math.max(columnHeight(offer.content.included), columnHeight(offer.content.excluded)) + 20);
    const columnsTop = y;
    let columnsEnd = y;
    for (const [index, title, items] of [[0, l.included, offer.content.included], [1, l.excluded, offer.content.excluded]]) {
      const x = 46 + index * (sectionWidth + 30);
      let cursor = text(title, x, columnsTop, 18, { bold: true, width: sectionWidth }) + 15;
      for (const item of items) {
        doc.circle(x + 3, cursor + 6, 2).fill(gold);
        cursor = text(item, x + 15, cursor, 10, { width: sectionWidth - 15 }) + 10;
      }
      columnsEnd = Math.max(columnsEnd, cursor);
    }
    y = columnsEnd + 12;
    heading(l.notes); bullets(offer.content.practicalNotes);
    if (offer.customer.pickup) paragraph(`${l.pickup}: ${offer.customer.pickup}`);
    heading(l.closing); paragraph(offer.content.closing);
    paragraph("info@gambiantour.com  ·  www.gambiantour.com");

    const pages = doc.bufferedPageRange();
    for (let index = 0; index < pages.count; index++) {
      doc.switchToPage(index);
      doc.page.margins.bottom = 0;
      if (index === 0) text(credits[photo], 46, 755, 7, { color: muted });
      doc.moveTo(46, 787).lineTo(width - 46, 787).strokeColor("#DDE7E0").stroke();
      text(`${l.reference} ${offer.submissionId}`, 46, 796, 8, { color: muted, width: bodyWidth - 50, lineBreak: false });
      text(`${index + 1} / ${pages.count}`, width - 90, 796, 8, { color: muted, width: 44, align: "right", lineBreak: false });
    }
    doc.end();
  });
}

module.exports = { renderOfferPdf };
