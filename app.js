const BOOKING_RECIPIENT_EMAIL = "info@gambiantour.com";
const FORM_SUBMIT_ENDPOINT = "https://formsubmit.co/ajax/info@gambiantour.com";

const translations = {
  en: {
    documentTitle: "Gambia Tours & Private Excursions | GambianTour.com",
    metaDescription: "Book private Gambia tours, day trips and excursions with local English and Polish-speaking guides. Hotel pickup from Kololi, Kotu, Senegambia and Banjul.",
    brandHome: "GambianTour.com home",
    languageToggle: "Language selector",
    menuOpen: "Open navigation",
    menuClose: "Close navigation",
    navTours: "Tours",
    navWhy: "Why us",
    navPolish: "Polish guides",
    navStories: "Tour stories",
    navFaq: "FAQ",
    navContact: "Contact",
    headerBook: "Book now",
    heroAria: "Private Gambia tours and excursions booking",
    heroEyebrow: "Private Gambia tours, day trips and local excursions",
    heroTitle: "Gambia Tours & Excursions",
    heroCopy: "Explore Banjul, Kololi, Kotu, the River Gambia, local markets, birdwatching routes and coastal sunsets with a flexible private guide.",
    heroReserve: "Request a tour",
    heroExplore: "See Gambia tours",
    carouselAria: "Gambia travel photo carousel",
    carouselPrev: "Previous photo",
    carouselNext: "Next photo",
    carouselDot1: "Show beach photo",
    carouselDot2: "Show river photo",
    carouselDot3: "Show market photo",
    carouselDot4: "Show birdwatching photo",
    formTour: "Tour",
    formDate: "Date",
    formGuests: "Guests",
    quickSubmit: "Check availability",
    selectTour: "Choose a Gambia tour",
    introKicker: "Gambia private tours with local guides",
    introTitle: "Easy, flexible Gambia excursions for travelers who want more than a hotel transfer.",
    introCopy: "Choose a ready-made Gambia day trip or build a private itinerary around your hotel location, pace and interests. We plan tours from Kololi, Kotu, Senegambia, Bijilo, Cape Point and Banjul, with English-speaking guides and Polish-speaking guides available on request.",
    trustAria: "Tour service highlights",
    trustOne: "Hotel pickup",
    trustOneCopy: "Kololi, Kotu, Banjul",
    trustTwo: "Private tours",
    trustTwoCopy: "your pace, your stops",
    trustThree: "EN + PL",
    trustThreeCopy: "Polish-speaking guides",
    trustFour: "Gambia",
    trustFourCopy: "local day trips",
    toursKicker: "Bookable Gambia excursions",
    toursTitle: "Popular private tours in The Gambia",
    filterAria: "Filter Gambia tours",
    filterAll: "All",
    filterNature: "Nature",
    filterCulture: "Culture",
    filterCoast: "Coast",
    smallGroup: "Private or small group",
    fromPerPerson: "from per person",
    from: "from",
    book: "Book",
    featureImageAlt: "The Gambia River bordered by palms and dense greenery",
    featureKicker: "Signature private route",
    featureTitle: "Gambia River tour, Banjul market walk, or a custom day from your hotel.",
    featureCopy: "The best Gambia excursions are not rushed. Start with pickup on the coast, then follow a route shaped around history, nature, markets, local food, photography, family timing or birdwatching.",
    featureCheck1: "Pickup from Kololi, Kotu, Senegambia, Bijilo, Cape Point or Banjul",
    featureCheck2: "English-speaking guide, with Polish-speaking guide available",
    featureCheck3: "Flexible private itinerary before you confirm the booking",
    featureButton: "Request custom tour",
    polishKicker: "For Polish travelers",
    polishTitle: "Polish-speaking tour guides in Gambia",
    polishCopy: "Traveling from Poland or prefer sightseeing in Polish? We can arrange Gambia tours with a Polish-speaking guide, including Banjul, the River Gambia, local markets, beaches and custom private day trips.",
    polishButton: "Polish guide details",
    keywordsKicker: "Trip ideas travelers search for",
    keywordsTitle: "Plan the Gambia day trip that matches your search.",
    keyword1: "Gambia excursions from Kololi and Kotu",
    keyword2: "Private tour guide in The Gambia",
    keyword3: "Banjul market and city tour",
    keyword4: "Gambia River boat tour",
    keyword5: "Birdwatching tour in Gambia",
    keyword6: "Things to do in Gambia beyond the beach",
    storiesKicker: "Tour stories",
    storiesTitle: "Stories and route ideas from private Gambia tours.",
    storiesCopy: "Read inspiring Gambia travel stories before you choose your route: river days, Banjul market walks, birdwatching mornings and flexible private excursions from the coast.",
    storiesButton: "Read tour stories",
    faqKicker: "Gambia tour FAQ",
    faqTitle: "Questions travelers ask before booking",
    faq1Q: "Do you offer private tours in Gambia?",
    faq1A: "Yes. Most tours can be private, with pickup from the main coastal hotel areas and a flexible route.",
    faq2Q: "Can I book a Polish-speaking guide in Gambia?",
    faq2A: "Yes, Polish-speaking guides are available on request. It is best to mention Polish language preference when sending the booking request.",
    faq3Q: "Where do tours start?",
    faq3A: "Tours can start from Kololi, Kotu, Senegambia, Bijilo, Cape Point, Banjul and nearby hotel areas.",
    faq4Q: "Can you build a custom Gambia itinerary?",
    faq4A: "Yes. Share your interests, hotel location, date and group size, and we will suggest a private route.",
    contactKicker: "Ready to plan?",
    contactTitle: "Send your preferred date and the Gambia tour you want.",
    contactCopy: "Tell us your hotel area, group size, language preference and what you want to see. We will confirm the best route before anything is final.",
    contactEmailLabel: "Direct email:",
    contactButton: "Request custom tour",
    footerCopy: "Private Gambia tours, excursions and day trips with local English and Polish-speaking guides.",
    footerEmail: "Email",
    footerBook: "Book",
    footerTours: "Tours",
    footerStories: "Stories",
    footerContact: "Contact",
    credits: "Photos: Kotu Beach by Mark Hodson Photos, CC BY 2.0; Gambia River by Mathiasv, CC BY-SA 3.0; Banjul Market by Yama Camara, CC0; Little Bee-eater by Charles J. Sharp, CC BY-SA 4.0.",
    modalClose: "Close booking form",
    bookingRequest: "Booking request",
    customRequest: "Custom request",
    reservePrefix: "Reserve",
    customModalTitle: "Plan a custom Gambia tour",
    bookingDescription: "Send your preferred date, pickup area and contact details. We will reply before anything is confirmed.",
    customDescription: "Share your hotel area, interests, language preference and travel date. A private route can be shaped before confirmation.",
    formName: "Name",
    formEmail: "Email",
    formPhone: "Phone or WhatsApp",
    formPickup: "Hotel / pickup area",
    formNotes: "Notes",
    placeholderName: "Your name",
    placeholderEmail: "you@example.com",
    placeholderPhone: "+48 500 000 000 or your country code",
    placeholderPickup: "Kololi, Kotu, Senegambia, Banjul...",
    placeholderNotes: "Language preference, interests, accessibility needs, children, timing, food preferences",
    sendRequest: "Send request",
    emailSending: "Sending request to info@gambiantour.com...",
    emailSentMessage: "Thank you. Request {id} has been sent to info@gambiantour.com. We will reply soon.",
    emailSentToast: "Booking request sent.",
    emailSendError: "Automatic sending did not work. Please use the email draft that opened, or email info@gambiantour.com directly.",
    savedMessage: "Request {id} is saved for {tour}. A ready email can be sent to info@gambiantour.com.",
    savedToast: "Booking request {id} is saved.",
    emailSubject: "Gambia tour booking request {id} - {tour}",
    emailOpenedMessage: "Automatic sending did not work, so a ready email draft with the booking details has been opened.",
    emailOpenedToast: "Ready booking email opened.",
    emailNotConfigured: "The form is ready, but the recipient email is missing.",
    emailNotConfiguredToast: "Booking recipient email is missing.",
    emailBodyHeader: "New request from GambianTour.com",
    emailBodyId: "Request ID",
    emailBodyTour: "Tour",
    emailBodyDate: "Date",
    emailBodyGuests: "Guests",
    emailBodyName: "Name",
    emailBodyEmail: "Email",
    emailBodyPhone: "Phone or WhatsApp",
    emailBodyPickup: "Pickup area",
    emailBodyNotes: "Notes",
    emailBodyMissing: "not provided"
  },
  pl: {
    documentTitle: "Wycieczki po Gambii z polskim przewodnikiem | GambianTour.com",
    metaDescription: "Prywatne wycieczki po Gambii, lokalne atrakcje i jednodniowe trasy z anglojęzycznym lub polskojęzycznym przewodnikiem.",
    brandHome: "Strona główna GambianTour.com",
    languageToggle: "Wybór języka",
    menuOpen: "Otwórz menu",
    menuClose: "Zamknij menu",
    navTours: "Wycieczki",
    navWhy: "Dlaczego my",
    navPolish: "Polski przewodnik",
    navStories: "Relacje",
    navFaq: "FAQ",
    navContact: "Kontakt",
    headerBook: "Rezerwuj",
    heroAria: "Rezerwacja prywatnych wycieczek po Gambii",
    heroEyebrow: "Prywatne wycieczki po Gambii i lokalne atrakcje",
    heroTitle: "Wycieczki po Gambii",
    heroCopy: "Banjul, Kololi, Kotu, rzeka Gambia, lokalne targi, ptaki i zachody słońca z elastycznym prywatnym przewodnikiem.",
    heroReserve: "Zapytaj o wycieczkę",
    heroExplore: "Zobacz trasy",
    carouselAria: "Karuzela zdjęć z Gambii",
    carouselPrev: "Poprzednie zdjęcie",
    carouselNext: "Następne zdjęcie",
    carouselDot1: "Pokaż zdjęcie plaży",
    carouselDot2: "Pokaż zdjęcie rzeki",
    carouselDot3: "Pokaż zdjęcie targu",
    carouselDot4: "Pokaż zdjęcie ptaków",
    formTour: "Wycieczka",
    formDate: "Data",
    formGuests: "Goście",
    quickSubmit: "Sprawdź dostępność",
    selectTour: "Wybierz wycieczkę po Gambii",
    introKicker: "Prywatne wycieczki po Gambii",
    introTitle: "Łatwe i elastyczne zwiedzanie Gambii dla osób, które chcą zobaczyć więcej niż hotel.",
    introCopy: "Wybierz gotową jednodniową trasę albo zaplanuj prywatną wycieczkę wokół hotelu, tempa i zainteresowań. Organizujemy wyjazdy z Kololi, Kotu, Senegambii, Bijilo, Cape Point i Banjul. Dostępni są przewodnicy anglojęzyczni i polskojęzyczni.",
    trustAria: "Najważniejsze informacje o wycieczkach",
    trustOne: "Odbiór z hotelu",
    trustOneCopy: "Kololi, Kotu, Banjul",
    trustTwo: "Prywatne trasy",
    trustTwoCopy: "Twoje tempo i postoje",
    trustThree: "EN + PL",
    trustThreeCopy: "polskojęzyczni przewodnicy",
    trustFour: "Gambia",
    trustFourCopy: "lokalne wycieczki",
    toursKicker: "Wycieczki gotowe do rezerwacji",
    toursTitle: "Popularne prywatne trasy po Gambii",
    filterAria: "Filtruj wycieczki",
    filterAll: "Wszystkie",
    filterNature: "Natura",
    filterCulture: "Kultura",
    filterCoast: "Wybrzeże",
    smallGroup: "Prywatnie lub kameralnie",
    fromPerPerson: "od osoby",
    from: "od",
    book: "Rezerwuj",
    featureImageAlt: "Rzeka Gambia otoczona palmami i zielenią",
    featureKicker: "Trasa prywatna",
    featureTitle: "Rzeka Gambia, targ w Banjul albo własny plan z odbiorem z hotelu.",
    featureCopy: "Najlepsze wycieczki po Gambii nie muszą być w pośpiechu. Trasa może być dopasowana do historii, natury, targów, lokalnej kuchni, fotografii, rodzinnego tempa albo obserwacji ptaków.",
    featureCheck1: "Odbiór z Kololi, Kotu, Senegambii, Bijilo, Cape Point lub Banjul",
    featureCheck2: "Przewodnik anglojęzyczny lub polskojęzyczny na życzenie",
    featureCheck3: "Elastyczny prywatny plan przed potwierdzeniem rezerwacji",
    featureButton: "Zapytaj o własną trasę",
    polishKicker: "Dla turystów z Polski",
    polishTitle: "Polskojęzyczni przewodnicy po Gambii",
    polishCopy: "Lecisz z Polski albo wolisz zwiedzać po polsku? Możemy przygotować wycieczkę po Gambii z polskojęzycznym przewodnikiem: Banjul, rzeka Gambia, lokalne targi, plaże i prywatne jednodniowe trasy.",
    polishButton: "Szczegóły po polsku",
    keywordsKicker: "Pomysły na wycieczki",
    keywordsTitle: "Wybierz trasę po Gambii, której szukasz.",
    keyword1: "Wycieczki z Kololi i Kotu",
    keyword2: "Prywatny przewodnik po Gambii",
    keyword3: "Banjul i lokalny targ",
    keyword4: "Wycieczka nad rzekę Gambia",
    keyword5: "Obserwacja ptaków w Gambii",
    keyword6: "Co zobaczyć w Gambii poza plażą",
    storiesKicker: "Relacje z tras",
    storiesTitle: "Relacje i pomysły na prywatne wycieczki po Gambii.",
    storiesCopy: "Zainspiruj się trasami po Gambii: spokojny dzień nad rzeką, targ w Banjul, poranna obserwacja ptaków i prywatne wycieczki z wybrzeża.",
    storiesButton: "Czytaj relacje",
    faqKicker: "FAQ",
    faqTitle: "Pytania przed rezerwacją",
    faq1Q: "Czy oferujecie prywatne wycieczki po Gambii?",
    faq1A: "Tak. Większość tras może być prywatna, z odbiorem z głównych rejonów hotelowych i elastycznym planem.",
    faq2Q: "Czy można zarezerwować polskiego przewodnika w Gambii?",
    faq2A: "Tak, polskojęzyczni przewodnicy są dostępni na życzenie. Najlepiej zaznaczyć to w zapytaniu.",
    faq3Q: "Skąd zaczynają się wycieczki?",
    faq3A: "Odbiór jest możliwy z Kololi, Kotu, Senegambii, Bijilo, Cape Point, Banjul i pobliskich hoteli.",
    faq4Q: "Czy można przygotować indywidualny plan?",
    faq4A: "Tak. Podaj zainteresowania, hotel, datę i liczbę osób, a zaproponujemy prywatną trasę.",
    contactKicker: "Gotowy na plan?",
    contactTitle: "Wyślij datę i trasę po Gambii, którą chcesz zobaczyć.",
    contactCopy: "Napisz, gdzie mieszkasz, ile osób jedzie, jaki język preferujesz i co chcesz zobaczyć. Potwierdzimy trasę przed rezerwacją.",
    contactEmailLabel: "Bezpośredni email:",
    contactButton: "Zapytaj o własną trasę",
    footerCopy: "Prywatne wycieczki po Gambii z lokalnymi przewodnikami anglojęzycznymi i polskojęzycznymi.",
    footerEmail: "Email",
    footerBook: "Rezerwuj",
    footerTours: "Wycieczki",
    footerStories: "Relacje",
    footerContact: "Kontakt",
    credits: "Zdjęcia: Kotu Beach - Mark Hodson Photos, CC BY 2.0; Gambia River - Mathiasv, CC BY-SA 3.0; Banjul Market - Yama Camara, CC0; Little Bee-eater - Charles J. Sharp, CC BY-SA 4.0.",
    modalClose: "Zamknij formularz rezerwacji",
    bookingRequest: "Zapytanie o rezerwację",
    customRequest: "Indywidualne zapytanie",
    reservePrefix: "Zarezerwuj:",
    customModalTitle: "Zaplanuj prywatną wycieczkę po Gambii",
    bookingDescription: "Wyślij preferowaną datę, miejsce odbioru i dane kontaktowe. Odpowiemy przed potwierdzeniem.",
    customDescription: "Podaj hotel, zainteresowania, preferowany język i datę. Prywatną trasę można dopasować przed potwierdzeniem.",
    formName: "Imię i nazwisko",
    formEmail: "Email",
    formPhone: "Telefon lub WhatsApp",
    formPickup: "Hotel / miejsce odbioru",
    formNotes: "Uwagi",
    placeholderName: "Twoje imię",
    placeholderEmail: "ty@example.com",
    placeholderPhone: "+48 500 000 000",
    placeholderPickup: "Kololi, Kotu, Senegambia, Banjul...",
    placeholderNotes: "Preferowany język, zainteresowania, dzieci, godziny, jedzenie, dostępność",
    sendRequest: "Wyślij zapytanie",
    emailSending: "Wysyłamy zapytanie na info@gambiantour.com...",
    emailSentMessage: "Dziękujemy. Zapytanie {id} zostało wysłane na info@gambiantour.com. Odpowiemy wkrótce.",
    emailSentToast: "Zapytanie zostało wysłane.",
    emailSendError: "Automatyczna wysyłka nie zadziałała. Użyj otwartej wiadomości email albo napisz bezpośrednio na info@gambiantour.com.",
    savedMessage: "Zapytanie {id} zapisane dla trasy: {tour}. Gotową wiadomość można wysłać na info@gambiantour.com.",
    savedToast: "Zapytanie {id} zostało zapisane.",
    emailSubject: "Zapytanie o wycieczkę po Gambii {id} - {tour}",
    emailOpenedMessage: "Automatyczna wysyłka nie zadziałała, więc otworzyliśmy gotową wiadomość email z danymi rezerwacji.",
    emailOpenedToast: "Gotowa wiadomość email została otwarta.",
    emailNotConfigured: "Formularz jest gotowy, ale brakuje adresu odbiorcy.",
    emailNotConfiguredToast: "Brakuje adresu odbiorcy rezerwacji.",
    emailBodyHeader: "Nowe zapytanie z GambianTour.com",
    emailBodyId: "Numer zapytania",
    emailBodyTour: "Wycieczka",
    emailBodyDate: "Data",
    emailBodyGuests: "Goście",
    emailBodyName: "Imię i nazwisko",
    emailBodyEmail: "Email",
    emailBodyPhone: "Telefon lub WhatsApp",
    emailBodyPickup: "Miejsce odbioru",
    emailBodyNotes: "Uwagi",
    emailBodyMissing: "brak"
  }
};

const tours = [
  {
    id: "gambia-highlights",
    category: "culture",
    price: 85,
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
    id: "custom",
    category: "all",
    price: 120,
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

const selectors = {
  header: document.querySelector("[data-header]"),
  nav: document.querySelector("[data-nav]"),
  menuToggle: document.querySelector("[data-menu-toggle]"),
  languageButtons: document.querySelectorAll("[data-language]"),
  heroSlides: document.querySelectorAll("[data-hero-slide]"),
  carouselDots: document.querySelectorAll("[data-carousel-dot]"),
  carouselPrev: document.querySelector("[data-carousel-prev]"),
  carouselNext: document.querySelector("[data-carousel-next]"),
  tourGrid: document.querySelector("[data-tour-grid]"),
  filterTabs: document.querySelectorAll("[data-filter]"),
  quickBook: document.querySelector("[data-quick-book]"),
  quickTour: document.querySelector("[data-tour-select]"),
  quickDate: document.querySelector("[data-date-input]"),
  modal: document.querySelector("[data-booking-modal]"),
  modalForm: document.querySelector("[data-booking-form]"),
  modalTour: document.querySelector("[data-modal-tour]"),
  modalDate: document.querySelector("[data-modal-date]"),
  modalTitle: document.querySelector("[data-modal-title]"),
  modalLabel: document.querySelector("[data-modal-label]"),
  modalDescription: document.querySelector("[data-modal-description]"),
  closeModal: document.querySelector("[data-close-modal]"),
  feedback: document.querySelector("[data-booking-feedback]"),
  toast: document.querySelector("[data-toast]"),
  customButton: document.querySelector("[data-open-custom]")
};

const today = new Date();
const todayValue = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
let currentLang = window.localStorage.getItem("gambianTourLanguage") || "en";
let activeFilter = "all";
let activeSlide = 0;
let carouselTimer;

if (!translations[currentLang]) {
  currentLang = "en";
}

function t(key) {
  return translations[currentLang][key] || translations.en[key] || key;
}

function money(value) {
  return new Intl.NumberFormat(currentLang === "pl" ? "pl-PL" : "en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function getTour(id) {
  return tours.find((tour) => tour.id === id) || tours[0];
}

function tourCopy(tour) {
  return tour[currentLang] || tour.en;
}

function formatOption(tour) {
  return `${tourCopy(tour).title} - ${t("from")} ${money(tour.price)}`;
}

function applyTranslations() {
  document.documentElement.lang = currentLang;
  document.title = t("documentTitle");

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    element.alt = t(element.dataset.i18nAlt);
  });

  document.querySelectorAll("[data-i18n-content]").forEach((element) => {
    element.setAttribute("content", t(element.dataset.i18nContent));
  });

  selectors.languageButtons.forEach((button) => {
    const isActive = button.dataset.language === currentLang;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  updateMenuLabel();
}

function populateTourSelects() {
  const quickValue = selectors.quickTour.value || tours[0].id;
  const modalValue = selectors.modalTour.value || tours[0].id;
  const options = tours.map((tour) => `<option value="${tour.id}">${formatOption(tour)}</option>`).join("");

  selectors.quickTour.innerHTML = options;
  selectors.modalTour.innerHTML = options;
  selectors.quickTour.value = getTour(quickValue).id;
  selectors.modalTour.value = getTour(modalValue).id;
}

function renderTours(filter = activeFilter) {
  activeFilter = filter;
  const visibleTours = tours.filter((tour) => filter === "all" || tour.category === filter);

  selectors.tourGrid.innerHTML = visibleTours
    .map((tour) => {
      const copy = tourCopy(tour);

      return `
        <article class="tour-card" data-category="${tour.category}">
          <img src="${tour.image}" alt="${copy.alt}" loading="lazy">
          <div class="tour-card-content">
            <div class="tour-meta">
              <span><i data-lucide="clock"></i>${copy.duration}</span>
              <span><i data-lucide="users"></i>${t("smallGroup")}</span>
            </div>
            <div>
              <h3>${copy.title}</h3>
              <p>${copy.summary}</p>
            </div>
            <ul>
              ${copy.highlights.map((highlight) => `<li><i data-lucide="check"></i>${highlight}</li>`).join("")}
            </ul>
            <div class="tour-tags">
              ${copy.tags.map((tag) => `<span>${tag}</span>`).join("")}
            </div>
            <div class="price-row">
              <div>
                <strong>${money(tour.price)}</strong>
                <small>${t("fromPerPerson")}</small>
              </div>
              <button class="secondary-button dark" type="button" data-book-tour="${tour.id}">
                <i data-lucide="calendar-plus"></i>
                ${t("book")}
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  refreshIcons();
}

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function setModalTour(tourId, date = selectors.quickDate.value, guests = "2") {
  const tour = getTour(tourId);
  const copy = tourCopy(tour);

  selectors.modalTour.value = tour.id;
  selectors.modalDate.value = date || todayValue;
  selectors.modalForm.elements.guests.value = guests || "2";
  if (!selectors.modalForm.elements.phone.value.trim()) {
    selectors.modalForm.elements.phone.value = "+48 ";
  }
  selectors.modalLabel.textContent = tour.id === "custom" ? t("customRequest") : t("bookingRequest");
  selectors.modalTitle.textContent = tour.id === "custom" ? t("customModalTitle") : `${t("reservePrefix")} ${copy.title}`;
  selectors.modalDescription.textContent = tour.id === "custom" ? t("customDescription") : t("bookingDescription");
  selectors.feedback.textContent = "";
}

function openModal(tourId = selectors.quickTour.value, date, guests) {
  setModalTour(tourId, date, guests);
  selectors.modal.showModal();
  document.body.classList.add("modal-open");
  setTimeout(() => selectors.modalForm.elements.name.focus(), 80);
}

function closeModal() {
  selectors.modal.close();
  document.body.classList.remove("modal-open");
}

function showToast(message) {
  selectors.toast.textContent = message;
  selectors.toast.classList.add("visible");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => {
    selectors.toast.classList.remove("visible");
  }, 4200);
}

function saveBooking(formData) {
  const existing = JSON.parse(window.localStorage.getItem("gambianTourBookings") || "[]");
  const booking = {
    id: `GT-${Date.now().toString().slice(-6)}`,
    createdAt: new Date().toISOString(),
    language: currentLang,
    ...Object.fromEntries(formData.entries())
  };

  window.localStorage.setItem("gambianTourBookings", JSON.stringify([booking, ...existing].slice(0, 20)));
  return booking;
}

function template(text, values) {
  return Object.entries(values).reduce((result, [key, value]) => result.replaceAll(`{${key}}`, value), text);
}

function bookingEmailBody(booking, title) {
  const fallback = t("emailBodyMissing");
  const lines = [
    t("emailBodyHeader"),
    "",
    `${t("emailBodyId")}: ${booking.id}`,
    `${t("emailBodyTour")}: ${title}`,
    `${t("emailBodyDate")}: ${booking.date}`,
    `${t("emailBodyGuests")}: ${booking.guests}`,
    `${t("emailBodyName")}: ${booking.name}`,
    `${t("emailBodyEmail")}: ${booking.email}`,
    `${t("emailBodyPhone")}: ${booking.phone}`,
    `${t("emailBodyPickup")}: ${booking.pickup || fallback}`,
    `${t("emailBodyNotes")}: ${booking.notes || fallback}`
  ];

  return lines.join("\n");
}

function openBookingEmail(booking, title) {
  if (!BOOKING_RECIPIENT_EMAIL) {
    selectors.feedback.textContent = t("emailNotConfigured");
    showToast(t("emailNotConfiguredToast"));
    return false;
  }

  const subject = template(t("emailSubject"), { id: booking.id, tour: title });
  const body = bookingEmailBody(booking, title);
  const mailtoUrl = `mailto:${BOOKING_RECIPIENT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoUrl;
  return true;
}

function bookingSubmissionPayload(booking, title) {
  const fallback = t("emailBodyMissing");

  return {
    _subject: template(t("emailSubject"), { id: booking.id, tour: title }),
    _template: "table",
    _captcha: "false",
    _replyto: booking.email,
    website: "GambianTour.com",
    language: booking.language,
    "Request ID": booking.id,
    "Created at": booking.createdAt,
    Tour: title,
    Date: booking.date,
    Guests: booking.guests,
    Name: booking.name,
    Email: booking.email,
    "Phone or WhatsApp": booking.phone,
    "Hotel / pickup area": booking.pickup || fallback,
    Notes: booking.notes || fallback
  };
}

async function sendBookingRequest(booking, title) {
  const response = await fetch(FORM_SUBMIT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(bookingSubmissionPayload(booking, title))
  });

  if (!response.ok) {
    throw new Error("Booking form email request failed.");
  }

  return response.json().catch(() => ({}));
}

async function handleBookingSubmit(event) {
  event.preventDefault();

  if (!selectors.modalForm.reportValidity()) {
    return;
  }

  const submitButton = selectors.modalForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  selectors.feedback.textContent = t("emailSending");

  const formData = new FormData(selectors.modalForm);

  if (formData.get("_honey")) {
    selectors.feedback.textContent = t("emailSentToast");
    submitButton.disabled = false;
    return;
  }

  formData.delete("_honey");

  const booking = saveBooking(formData);
  const title = tourCopy(getTour(booking.tour)).title;

  try {
    await sendBookingRequest(booking, title);
    selectors.feedback.textContent = template(t("emailSentMessage"), { id: booking.id, tour: title });
    showToast(t("emailSentToast"));
  } catch (error) {
    const emailOpened = openBookingEmail(booking, title);
    selectors.feedback.textContent = emailOpened
      ? template(t("emailOpenedMessage"), { id: booking.id, tour: title })
      : t("emailSendError");
    showToast(emailOpened ? t("emailOpenedToast") : t("emailNotConfiguredToast"));
  } finally {
    submitButton.disabled = false;
  }
}

function updateMenuLabel() {
  const isOpen = selectors.nav.classList.contains("open");
  selectors.menuToggle.setAttribute("aria-label", isOpen ? t("menuClose") : t("menuOpen"));
}

function showSlide(index) {
  activeSlide = (index + selectors.heroSlides.length) % selectors.heroSlides.length;

  selectors.heroSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle("active", slideIndex === activeSlide);
  });

  selectors.carouselDots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === activeSlide;
    dot.classList.toggle("active", isActive);
    dot.setAttribute("aria-current", isActive ? "true" : "false");
  });
}

function nextSlide() {
  showSlide(activeSlide + 1);
}

function restartCarousel() {
  window.clearInterval(carouselTimer);
  carouselTimer = window.setInterval(nextSlide, 6500);
}

function setLanguage(language) {
  if (!translations[language] || language === currentLang) {
    return;
  }

  currentLang = language;
  window.localStorage.setItem("gambianTourLanguage", currentLang);
  applyTranslations();
  populateTourSelects();
  renderTours(activeFilter);

  if (selectors.modal.open) {
    setModalTour(selectors.modalTour.value, selectors.modalDate.value, selectors.modalForm.elements.guests.value);
  }
}

function bindEvents() {
  window.addEventListener("scroll", () => {
    selectors.header.classList.toggle("scrolled", window.scrollY > 20);
  });

  selectors.menuToggle.addEventListener("click", () => {
    selectors.nav.classList.toggle("open");
    updateMenuLabel();
  });

  selectors.nav.addEventListener("click", () => {
    selectors.nav.classList.remove("open");
    updateMenuLabel();
  });

  selectors.languageButtons.forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.language));
  });

  selectors.carouselPrev.addEventListener("click", () => {
    showSlide(activeSlide - 1);
    restartCarousel();
  });

  selectors.carouselNext.addEventListener("click", () => {
    showSlide(activeSlide + 1);
    restartCarousel();
  });

  selectors.carouselDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      showSlide(Number(dot.dataset.carouselDot));
      restartCarousel();
    });
  });

  selectors.filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      selectors.filterTabs.forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      renderTours(tab.dataset.filter);
    });
  });

  document.addEventListener("click", (event) => {
    const bookButton = event.target.closest("[data-book-tour]");
    if (bookButton) {
      openModal(bookButton.dataset.bookTour);
    }
  });

  selectors.quickBook.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(selectors.quickBook);
    openModal(data.get("tour"), data.get("date"), data.get("guests"));
  });

  selectors.customButton.addEventListener("click", () => openModal("custom"));
  selectors.closeModal.addEventListener("click", closeModal);
  selectors.modal.addEventListener("click", (event) => {
    if (event.target === selectors.modal) {
      closeModal();
    }
  });
  selectors.modal.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
  });
  selectors.modalForm.addEventListener("submit", handleBookingSubmit);
}

function init() {
  selectors.quickDate.min = todayValue;
  selectors.quickDate.value = todayValue;
  selectors.modalDate.min = todayValue;
  applyTranslations();
  populateTourSelects();
  renderTours();
  showSlide(0);
  bindEvents();
  restartCarousel();
  refreshIcons();
}

init();
