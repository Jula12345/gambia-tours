const tours = [
  {
    id: "gambia-highlights",
    category: "culture",
    price: 85,
    detailsUrl: "gambia-highlights-tour.html",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/af/Kotu_Beach%2C_The_Gambia_%2816197149546%29.jpg",
    en: {
      title: "Private Gambia Highlights Day",
      duration: "6 hours",
      alt: "Kotu Beach in The Gambia",
      summary: "A flexible first-day tour for travelers who want beaches, local life, short cultural stops and a relaxed introduction to The Gambia.",
      highlights: ["Hotel pickup on the coast", "Local stops shaped around your interests", "Good first Gambia excursion"],
      tags: ["Private", "Highlights", "Pickup"]
    },
    pl: {
      title: "Prywatny dzień: najważniejsze miejsca Gambii",
      duration: "6 godzin",
      alt: "Plaża Kotu w Gambii",
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
    image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Gambia-river.jpg",
    en: {
      title: "Gambia River & Heritage Day",
      duration: "7 hours",
      alt: "The Gambia River bordered by palms",
      summary: "A private Gambia River tour with slow viewpoints, local villages, optional boat time and history-focused stops.",
      highlights: ["River and creek viewpoints", "Village and craft stops", "Optional boat add-on"],
      tags: ["River", "Heritage", "Private"]
    },
    pl: {
      title: "Rzeka Gambia i lokalne dziedzictwo",
      duration: "7 godzin",
      alt: "Rzeka Gambia otoczona palmami",
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
    image: "https://upload.wikimedia.org/wikipedia/commons/a/af/Kotu_Beach%2C_The_Gambia_%2816197149546%29.jpg",
    en: {
      title: "Kotu & Kololi Sunset Coast",
      duration: "3 hours",
      alt: "Palm-lined Kotu Beach",
      summary: "A relaxed coastal tour with beach time, photo stops, local stories and a soft sunset finish.",
      highlights: ["Kotu and Kololi coast", "Sunset photo timing", "Optional seafood stop"],
      tags: ["Coast", "Sunset", "Relaxed"]
    },
    pl: {
      title: "Zachód słońca: Kotu i Kololi",
      duration: "3 godziny",
      alt: "Plaża Kotu z palmami",
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
    image: "https://upload.wikimedia.org/wikipedia/commons/5/55/Little_Bee-eater_%28Merops_pusillus_pusillus%29%2C_Kotu_Beach%2C_Gambia.jpg",
    en: {
      title: "Birdwatching Morning Tour",
      duration: "5 hours",
      alt: "Little bee-eater bird photographed at Kotu Beach",
      summary: "A gentle early morning birdwatching tour around wetlands, coastal habitats and quiet observation points.",
      highlights: ["Early pickup", "Wetland and coast habitats", "Beginner-friendly pace"],
      tags: ["Birdwatching", "Nature", "Morning"]
    },
    pl: {
      title: "Poranek z ptakami i naturą",
      duration: "5 godzin",
      alt: "Żołna mała sfotografowana przy Kotu Beach",
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
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/That%27s_the_Banjul_market_in_the_Gambia.jpg?width=1200",
    en: {
      title: "7-Day Senegambia Wildlife & Culture Loop",
      duration: "7 days",
      alt: "Market route for a Gambia and Senegal culture tour",
      summary: "A richer private 7-day Senegambia tour with Gambia highlights, Senegal nature or wildlife stops, villages and cross-border culture.",
      highlights: ["Gambia coast, Banjul and Senegal route", "Accommodation, private transport and guide included", "Flights and food/drinks not included"],
      tags: ["7 days", "Wildlife", "Culture"]
    },
    pl: {
      title: "7 dni: Senegambia - natura i kultura",
      duration: "7 dni",
      alt: "Targ na trasie kulturowej po Gambii i Senegalu",
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
    id: "custom",
    category: "all",
    price: 120,
    detailsUrl: "custom-gambia-tour.html",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Gambia-river.jpg",
    en: {
      title: "Custom Private Gambia Tour",
      duration: "Your pace",
      alt: "Green riverside landscape in The Gambia",
      summary: "Tell us your travel style and build a private Gambia excursion around coast, river, culture, food, markets or photography.",
      highlights: ["Designed around your interests", "English or Polish-speaking guide", "Half-day or full-day options"],
      tags: ["Custom", "Private", "Flexible"]
    },
    pl: {
      title: "Prywatna wycieczka po Gambii na zamówienie",
      duration: "Twoje tempo",
      alt: "Zielony krajobraz nad rzeką w Gambii",
      summary: "Opowiedz, jak lubisz podróżować, a prywatna trasa powstanie wokół wybrzeża, rzeki, kultury, jedzenia, targów albo fotografii.",
      highlights: ["Plan pod zainteresowania", "Przewodnik po angielsku lub po polsku", "Opcje półdniowe i całodniowe"],
      tags: ["Na zamówienie", "Prywatnie", "Elastycznie"]
    }
  }
];

if (typeof module !== "undefined") module.exports = tours;
