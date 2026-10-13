const fs = require("node:fs");
const path = require("node:path");
const cheerio = require("cheerio");
const tours = require("../tours");

function catalog() {
  return tours.map(tour => ({ id: tour.id, title: tour.en.title, polishTitle: tour.pl.title }));
}

function tripFacts(id) {
  const tour = tours.find(t => t.id === id);
  if (!tour) throw Object.assign(new Error("Choose a tour from the website."), { status: 400 });
  const $ = cheerio.load(fs.readFileSync(path.join(__dirname, "..", tour.detailsUrl), "utf8"));
  const clean = (text) => text.replace(/\s+/g, " ").trim();
  return {
    id: tour.id,
    title: tour.en.title,
    duration: tour.en.duration,
    summary: tour.en.summary,
    itinerary: $(".trip-timeline article").map((_, el) => ({
      label: clean($(el).find("span").first().text()),
      title: clean($(el).find("h3").text()),
      description: clean($(el).find("p").text())
    })).get(),
    included: $(".trip-inclusions .trip-panel-grid article").map((_, el) => clean($(el).text())).get().filter(t => !/Fast quote/.test(t)),
    excluded: clean($(".trip-inclusions .trip-note").text()),
    page: tour.detailsUrl,
    photo: /river|casamance/.test(id) ? "river.jpg" : /bird/.test(id) ? "bird.jpg" : /senegambia|senegal/.test(id) ? "senegal.jpg" : /banjul/.test(id) ? "market.jpg" : "coast.jpg"
  };
}

module.exports = { catalog, tripFacts };
