const tours = [
  {
    id: "gambia-highlights",
    category: "culture",
    price: 85,
    detailsUrl: "gambia-highlights-tour.html",
    image: "assets/trips/fishing-village-guests-960.webp",
    imageSrcset: "assets/trips/fishing-village-guests-480.webp 480w, assets/trips/fishing-village-guests-960.webp 960w, assets/trips/fishing-village-guests-1600.webp 1600w",
    imageClass: "",
    en: {
      title: "Private Gambia Highlights Day",
      duration: "6 hours",
      alt: "Travelers beside traditional painted fishing boats",
      summary: "A flexible first-day tour for travelers who want beaches, local life, short cultural stops and a relaxed introduction to The Gambia.",
      highlights: ["Hotel pickup on the coast", "Local stops shaped around your interests", "Good first Gambia excursion"],
      tags: ["Private", "Highlights", "Pickup"]
    },
    pl: {
      title: "Prywatny dzień: najważniejsze miejsca Gambii",
      duration: "6 godzin",
      alt: "Podróżnicy przy tradycyjnych malowanych łodziach",
      summary: "Elastyczna trasa na pierwszy dzień: plaże, lokalne życie, krótkie postoje kulturowe i spokojne wprowadzenie do Gambii.",
      highlights: ["Odbiór z hotelu na wybrzeżu", "Postoje dobrane do zainteresowań", "Dobra pierwsza wycieczka po Gambii"],
      tags: ["Prywatnie", "Gambia", "Odbiór"]
    }
  },
  {
    id: "banjul-market",
    category: "culture",
    price: 55,
    detailsUrl: "banjul-market-tour.html",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/That%27s_the_Banjul_market_in_the_Gambia.jpg?width=1200",
    en: {
      title: "Banjul Market & City Tour",
      duration: "4 hours",
      alt: "Albert Market in Banjul, The Gambia",
      summary: "A guided Banjul tour through market streets, craft stalls, colonial history and everyday city life.",
      highlights: ["Albert Market route", "Local snacks and craft stops", "History at an easy pace"],
      tags: ["Banjul", "Culture", "Half day"]
    },
    pl: {
      title: "Banjul: targ i zwiedzanie miasta",
      duration: "4 godziny",
      alt: "Targ Albert Market w Banjul w Gambii",
      summary: "Zwiedzanie Banjul z przewodnikiem: targ, rzemiosło, historia kolonialna i codzienne życie miasta.",
      highlights: ["Trasa przez Albert Market", "Lokalne przekąski i rzemiosło", "Historia w spokojnym tempie"],
      tags: ["Banjul", "Kultura", "Pół dnia"]
    }
  },
  {
    id: "river-heritage",
    category: "nature",
    price: 110,
    detailsUrl: "gambia-river-heritage-tour.html",
    image: "assets/trips/mangrove-walk-960.webp",
    imageSrcset: "assets/trips/mangrove-walk-480.webp 480w, assets/trips/mangrove-walk-960.webp 960w, assets/trips/mangrove-walk-1600.webp 1600w",
    imageClass: "",
    en: {
      title: "Gambia River & Heritage Day",
      duration: "7 hours",
      alt: "Guests exploring a mangrove channel",
      summary: "A private Gambia River tour with slow viewpoints, local villages, optional boat time and history-focused stops.",
      highlights: ["River and creek viewpoints", "Village and craft stops", "Optional boat add-on"],
      tags: ["River", "Heritage", "Private"]
    },
    pl: {
      title: "Rzeka Gambia i lokalne dziedzictwo",
      duration: "7 godzin",
      alt: "Goście podczas spaceru wśród namorzynów",
      summary: "Prywatna trasa nad rzekę Gambia z punktami widokowymi, lokalnymi wioskami, opcją rejsu i postojami historycznymi.",
      highlights: ["Widoki nad rzeką i zatokami", "Wioski i miejsca z rękodziełem", "Opcjonalny rejs łodzią"],
      tags: ["Rzeka", "Historia", "Prywatnie"]
    }
  },
  {
    id: "kotu-sunset",
    category: "coast",
    price: 45,
    detailsUrl: "kotu-kololi-sunset-tour.html",
    image: "assets/trips/coastal-sunset-960.webp",
    imageSrcset: "assets/trips/coastal-sunset-480.webp 480w, assets/trips/coastal-sunset-960.webp 960w, assets/trips/coastal-sunset-1600.webp 1600w",
    imageClass: "sunset-photo",
    en: {
      title: "Kotu & Kololi Sunset Coast",
      duration: "3 hours",
      alt: "Sunset on the Gambian coast",
      summary: "A relaxed coastal tour with beach time, photo stops, local stories and a soft sunset finish.",
      highlights: ["Kotu and Kololi coast", "Sunset photo timing", "Optional seafood stop"],
      tags: ["Coast", "Sunset", "Relaxed"]
    },
    pl: {
      title: "Zachód słońca: Kotu i Kololi",
      duration: "3 godziny",
      alt: "Zachód słońca na wybrzeżu Gambii",
      summary: "Lekka trasa po wybrzeżu z czasem na plażę, zdjęcia, lokalne historie i spokojny zachód słońca.",
      highlights: ["Wybrzeże Kotu i Kololi", "Dobry moment na zdjęcia", "Opcjonalny postój na owoce morza"],
      tags: ["Wybrzeże", "Zachód", "Relaks"]
    }
  },
  {
    id: "birdwatching",
    category: "nature",
    price: 70,
    detailsUrl: "birdwatching-gambia-tour.html",
    image: "assets/trips/egret-mangroves-960.webp",
    imageSrcset: "assets/trips/egret-mangroves-480.webp 480w, assets/trips/egret-mangroves-960.webp 960w, assets/trips/egret-mangroves-1600.webp 1200w",
    imageClass: "",
    en: {
      title: "Birdwatching Morning Tour",
      duration: "5 hours",
      alt: "White egret among mangroves",
      summary: "A gentle early morning birdwatching tour around wetlands, coastal habitats and quiet observation points.",
      highlights: ["Early pickup", "Wetland and coast habitats", "Beginner-friendly pace"],
      tags: ["Birdwatching", "Nature", "Morning"]
    },
    pl: {
      title: "Poranek z ptakami i naturą",
      duration: "5 godzin",
      alt: "Biała czapla wśród namorzynów",
      summary: "Spokojna poranna obserwacja ptaków wokół mokradeł, siedlisk przy wybrzeżu i cichych punktów obserwacyjnych.",
      highlights: ["Wczesny odbiór", "Mokradła i wybrzeże", "Tempo dobre dla początkujących"],
      tags: ["Ptaki", "Natura", "Poranek"]
    }
  },
  {
    id: "gambia-casamance-7-day",
    category: "multi",
    days: 7,
    price: 980,
    detailsUrl: "gambia-casamance-7-day-tour.html",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Gambia-river.jpg",
    en: {
      title: "7-Day Gambia & Casamance Discovery",
      duration: "7 days",
      alt: "River landscape for a Gambia and Senegal private tour",
      summary: "A private 7-day Gambia and Senegal itinerary through Banjul, the coast, river landscapes and the Casamance region.",
      highlights: ["Gambia + Senegal Casamance route", "Accommodation, private transport and guide included", "Flights and food/drinks not included"],
      tags: ["7 days", "Senegal", "Casamance"]
    },
    pl: {
      title: "7 dni: Gambia i Casamance",
      duration: "7 dni",
      alt: "Krajobraz rzeczny na prywatnej trasie Gambia Senegal",
      summary: "Prywatna 7-dniowa trasa przez Gambię i Senegal: Banjul, wybrzeże, krajobrazy rzek i region Casamance.",
      highlights: ["Trasa Gambia + senegalska Casamance", "Noclegi, prywatny transport i przewodnik w cenie", "Loty oraz jedzenie i napoje poza ceną"],
      tags: ["7 dni", "Senegal", "Casamance"]
    }
  },
  {
    id: "senegambia-wildlife-culture-7-day",
    category: "multi",
    days: 7,
    price: 1280,
    detailsUrl: "senegambia-wildlife-culture-7-day-tour.html",
    image: "assets/trips/rhino-safari-960.webp",
    imageSrcset: "assets/trips/rhino-safari-480.webp 480w, assets/trips/rhino-safari-960.webp 960w, assets/trips/rhino-safari-1600.webp 1600w",
    imageClass: "",
    en: {
      title: "7-Day Senegambia Wildlife & Culture Loop",
      duration: "7 days",
      alt: "Rhinoceros photographed on safari",
      summary: "A richer private 7-day Senegambia tour with Gambia highlights, Senegal nature or wildlife stops, villages and cross-border culture.",
      highlights: ["Gambia coast, Banjul and Senegal route", "Accommodation, private transport and guide included", "Flights and food/drinks not included"],
      tags: ["7 days", "Wildlife", "Culture"]
    },
    pl: {
      title: "7 dni: Senegambia - natura i kultura",
      duration: "7 dni",
      alt: "Nosorożec sfotografowany podczas safari",
      summary: "Bogatsza prywatna 7-dniowa trasa po Senegambii: najważniejsze miejsca Gambii, natura Senegalu, wioski i kultura regionu.",
      highlights: ["Wybrzeże Gambii, Banjul i Senegal", "Noclegi, prywatny transport i przewodnik w cenie", "Loty oraz jedzenie i napoje poza ceną"],
      tags: ["7 dni", "Natura", "Kultura"]
    }
  },
  {
    id: "senegal-gambia-10-day",
    category: "multi",
    days: 10,
    price: null,
    detailsUrl: "senegal-gambia-10-day-tour.html",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/The_African_Renaissance_Monument.jpg?width=1400",
    en: {
      title: "10-Day Senegal & Gambia Discovery",
      duration: "10 days",
      alt: "African Renaissance Monument in Dakar, Senegal",
      summary: "A complete private West Africa itinerary from Dakar through Lac Rose, Fathala, Banjul, Kunta Kinteh Island, Abuko, Janjanbureh and Wassu.",
      highlights: ["Starts and ends in Dakar", "Senegal safari + five days in The Gambia", "Polish-speaking guide available"],
      tags: ["10 days", "Dakar", "Gambia"]
    },
    pl: {
      title: "10 dni: Senegal i Gambia",
      duration: "10 dni",
      alt: "Pomnik Renesansu Afrykańskiego w Dakarze w Senegalu",
      summary: "Pełny prywatny program Afryki Zachodniej: Dakar, Lac Rose, Fathala, Banjul, Wyspa Kunta Kinteh, Abuko, Janjanbureh i Wassu.",
      highlights: ["Start i koniec w Dakarze", "Safari w Senegalu + pięć dni w Gambii", "Polskojęzyczny przewodnik na życzenie"],
      tags: ["10 dni", "Dakar", "Gambia"]
    }
  },
  {
  "id": "cruise-ship-excursions",
  "category": "culture",
  "price": null,
  "detailsUrl": "cruise-ship-excursions-tour.html",
  "image": "assets/trips/fishing-boats-960.webp",
  "imageSrcset": "assets/trips/fishing-boats-480.webp 480w, assets/trips/fishing-boats-960.webp 960w, assets/trips/fishing-boats-1600.webp 1200w",
  "en": {
    "title": "Cruise Ship Excursions",
    "duration": "Your time in port",
    "alt": "Colorful fishing boats on the Gambian coast",
    "summary": "Make the most of your day ashore with a private excursion shaped around your ship’s schedule: Banjul, nature, boat trips or safari possibilities.",
    "highlights": [
      "Route planned around your port call",
      "Port meeting arrangements confirmed in advance",
      "Individually priced after contact"
    ],
    "tags": [
      "Cruise visitors",
      "Private",
      "Personal quote"
    ]
  },
  "pl": {
    "title": "Wycieczki dla pasażerów statków wycieczkowych",
    "duration": "Twój czas w porcie",
    "alt": "Kolorowe łodzie rybackie na wybrzeżu Gambii",
    "summary": "Wykorzystaj dzień na lądzie: prywatna wycieczka dopasowana do rozkładu statku. Banjul, przyroda, rejs łodzią lub możliwe safari.",
    "highlights": [
      "Trasa dopasowana do postoju w porcie",
      "Miejsce spotkania ustalone przed wycieczką",
      "Indywidualna wycena po kontakcie"
    ],
    "tags": [
      "Rejsy",
      "Prywatnie",
      "Wycena"
    ]
  }
},
  {
    id: "custom",
    category: "all",
    price: 120,
    detailsUrl: "custom-gambia-tour.html",
    image: "assets/trips/baobab-guests-960.webp",
    imageSrcset: "assets/trips/baobab-guests-480.webp 480w, assets/trips/baobab-guests-960.webp 960w, assets/trips/baobab-guests-1600.webp 1600w",
    imageClass: "keep-group",
    en: {
      title: "Custom Private Gambia Tour",
      duration: "Your pace",
      alt: "Tour guests among the roots of a giant tree",
      summary: "Tell us your travel style and build a private Gambia excursion around coast, river, culture, food, markets or photography.",
      highlights: ["Designed around your interests", "English or Polish-speaking guide", "Half-day or full-day options"],
      tags: ["Custom", "Private", "Flexible"]
    },
    pl: {
      title: "Prywatna wycieczka po Gambii na zamówienie",
      duration: "Twoje tempo",
      alt: "Goście wycieczki wśród korzeni wielkiego drzewa",
      summary: "Opowiedz, jak lubisz podróżować, a prywatna trasa powstanie wokół wybrzeża, rzeki, kultury, jedzenia, targów albo fotografii.",
      highlights: ["Plan pod zainteresowania", "Przewodnik po angielsku lub po polsku", "Opcje półdniowe i całodniowe"],
      tags: ["Na zamówienie", "Prywatnie", "Elastycznie"]
    }
  }
];

if (typeof module !== "undefined") module.exports = tours;
