const { tripFacts } = require("../lib/offer-catalog");
function sampleOffer(language = "en", includePrice = true) {
  const facts = tripFacts("gambia-casamance-7-day");
  return {
    id: "12345678-1234-1234-1234-123456789abc", submissionId: "GT-PREVIEW", createdAt: new Date().toISOString(), revision: 1,
    tourId: facts.id, photo: facts.photo, language, includePrice,
    pricePerPerson: includePrice ? 980 : null, totalPrice: includePrice ? 1960 : null, currency: "EUR", guests: 2,
    customer: { name: "Anna Kowalska", date: "2027-01-05", endDate: "2027-01-11", tourPeriod: "5–11 January 2027", pickup: "Kololi hotel area" },
    model: "gpt-5.4-mini", usage: { inputTokens: 1800, outputTokens: 1600, estimatedCostUsd: .00855 },
    content: {
      title: language === "pl" ? "Gambia i Casamance: podróż we własnym rytmie" : "Gambia & Casamance: a journey at your pace",
      introduction: language === "pl" ? "Siedem dni między gambijskim wybrzeżem a zielonym regionem Casamance w Senegalu. Ten prywatny program łączy lokalną kulturę, spacery po targach i spokojne chwile przy rzece. Zaplanujemy podróż z myślą o Waszym tempie, aby znalazł się czas zarówno na odkrywanie nowych miejsc, jak i odpoczynek." : "Seven days between the Gambian coast and Senegal’s green Casamance region. This private journey brings together local culture, market walks and unhurried river landscapes. We will shape the pace around you, leaving room for discovery, conversation and time to relax.",
      highlights: language === "pl" ? ["Prywatna trasa i lokalny przewodnik", "Banjul, targi i życie nad wybrzeżem", "Kultura i krajobrazy Casamance", "Sześć noclegów do potwierdzenia przed rezerwacją"] : ["A private route with your local guide", "Banjul, market streets and coastal life", "Casamance culture and river landscapes", "Six nights of accommodation, confirmed before booking"],
      itinerary: facts.itinerary,
      included: language === "pl" ? ["Sześć noclegów na trasie, do potwierdzenia przed rezerwacją.", "Prywatny transport, paliwo, kierowca i przewodnik.", "Transfery lotniskowe i pomoc logistyczna przy granicy.", "Wizyty i postoje wymienione w potwierdzonym programie."] : ["Six nights of accommodation along the route, subject to confirmation.", "Private transport, fuel, driver and guide support.", "Airport transfers and border logistics assistance.", "Visits and stops listed in the confirmed itinerary."],
      excluded: language === "pl" ? ["Loty międzynarodowe, posiłki i napoje.", "Ubezpieczenie podróżne i wydatki osobiste.", "Napiwki i opcjonalne atrakcje poza potwierdzonym programem."] : ["International flights, meals and drinks.", "Travel insurance and personal expenses.", "Tips and optional activities outside the confirmed programme."],
      practicalNotes: language === "pl" ? ["Dostępność i standard noclegów potwierdzimy przed rezerwacją.", "Czas przejazdów i formalności granicznych może się zmieniać.", "Przewodnik polskojęzyczny na życzenie, po potwierdzeniu dostępności."] : ["Accommodation availability and room setup will be confirmed before booking.", "Road and border timings can vary; the route remains flexible.", "Polish-speaking guiding is available on request, subject to confirmation."],
      closing: language === "pl" ? "Napisz do nas, aby omówić program i potwierdzić szczegóły. Z przyjemnością pomożemy przygotować Waszą podróż." : "Contact us to discuss the route and confirm the details. We look forward to planning your Gambian adventure."
    }
  };
}
module.exports = { sampleOffer };
