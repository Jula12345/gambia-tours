const BOOKING_RECIPIENT_EMAIL = "info@gambiantour.com";
const FORM_SUBMIT_ENDPOINT = "https://formsubmit.co/ajax/info@gambiantour.com";

const translations = {
  en: {
    documentTitle: "Gambia Tours, Senegal Trips & Multi-Day Itineraries | GambianTour.com",
    metaDescription: "Book private Gambia tours, day trips, 7-day and 10-day Gambia and Senegal itineraries with local English and Polish-speaking guides.",
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
    heroEyebrow: "Private Gambia tours, Senegal trips and local excursions",
    heroTitle: "Gambia Tours & Excursions",
    heroCopy: "Explore Banjul, Kololi, Kotu, the River Gambia, local markets, birdwatching routes, Senegal day routes and private multi-day itineraries with a flexible guide.",
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
    formStartDate: "Start date",
    formGuests: "Guests",
    dateRangeHint: "Tour period: {start} - {end} ({days} days)",
    dateRangeEmpty: "Choose a start date to calculate the full tour period.",
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
    toursTitle: "Popular private tours in The Gambia and Senegal",
    filterAria: "Filter Gambia tours",
    filterAll: "All",
    filterNature: "Nature",
    filterCulture: "Culture",
    filterCoast: "Coast",
    filterMulti: "Multi-day tours",
    smallGroup: "Private or small group",
    fromPerPerson: "from per person",
    from: "from",
    book: "Book",
    quotePrice: "custom quote",
    quotePerPerson: "quoted for your group",
    details: "Details",
    completeKicker: "Complete multi-day itineraries",
    completeTitle: "Private Gambia and Senegal tours with the route already planned.",
    completeCopy: "These multi-day tours include private transport, guide/driver, accommodation, airport transfers, route logistics, standard entrances and listed activities. International flights and food/drinks are not included.",
    completeIncludedTitle: "Included",
    completeIncludedCopy: "Private guide/driver, vehicle, fuel, accommodation, airport transfers, border assistance, listed visits and route planning.",
    completeExcludedTitle: "Not included",
    completeExcludedCopy: "International flights, meals, drinks, personal expenses, travel insurance and tips.",
    completePriceNote: "Displayed 7-day prices are starting estimates per person based on 2 guests. The 10-day Senegal and Gambia tour is quoted individually because hotels, room setup, meal plan and group size change the final price.",
    completeOneLabel: "Gambia + Senegal Casamance",
    completeOneTitle: "7-Day Gambia & Casamance Discovery",
    completeOnePrice: "from $980 per person",
    completeOneCopy: "A warm cultural route from the Gambian coast into Senegal's Casamance region, designed for travelers who want villages, river landscapes, markets and relaxed overland travel.",
    completeOneDay1: "Day 1: Airport pickup, coastal hotel check-in and welcome briefing in Kololi or Kotu.",
    completeOneDay2: "Day 2: Banjul city tour, Albert Market, Arch 22 area and local craft stops.",
    completeOneDay3: "Day 3: Tanji fishing coast, Sanyang beach and local village life.",
    completeOneDay4: "Day 4: Cross into Senegal's Casamance, Ziguinchor route and overnight stay.",
    completeOneDay5: "Day 5: Casamance villages, craft culture, river scenery and optional boat time.",
    completeOneDay6: "Day 6: Return toward The Gambia with stops shaped around markets, nature and photography.",
    completeOneDay7: "Day 7: Flexible coastal morning, souvenir stop and airport or hotel transfer.",
    completeTwoLabel: "Senegambia wildlife + culture",
    completeTwoTitle: "7-Day Senegambia Wildlife & Culture Loop",
    completeTwoPrice: "from $1,280 per person",
    completeTwoCopy: "A richer cross-border route for travelers who want Gambia highlights plus Senegal wildlife, river landscapes and a stronger sense of the Senegambia region.",
    completeTwoDay1: "Day 1: Arrival transfer, coastal hotel check-in and private route briefing.",
    completeTwoDay2: "Day 2: Kotu wetlands, Bakau, local markets and sunset along the coast.",
    completeTwoDay3: "Day 3: Banjul, ferry logistics and north bank route toward Senegal.",
    completeTwoDay4: "Day 4: Senegal wildlife or nature reserve day, with flexible timing for photos.",
    completeTwoDay5: "Day 5: Senegal village culture, crafts and river or mangrove landscapes.",
    completeTwoDay6: "Day 6: Return to The Gambia with stops for local life, viewpoints and shopping.",
    completeTwoDay7: "Day 7: Relaxed final morning, custom stop and airport or hotel transfer.",
    completeThreeLabel: "Senegal + Gambia signature route",
    completeThreeTitle: "10-Day Senegal & Gambia Discovery",
    completeThreePrice: "private quote",
    completeThreeCopy: "A complete West Africa route starting and ending in Dakar, with Senegal highlights, Fathala safari, five days in The Gambia, UNESCO heritage and the River Gambia.",
    completeThreeDay1: "Days 1-2: Dakar arrival, city orientation, African Renaissance Monument, markets and Lac Rose.",
    completeThreeDay2: "Day 3: Fathala Wildlife Reserve safari and overnight lodge stay.",
    completeThreeDay3: "Day 4: Assisted border crossing into The Gambia and Banjul city tour.",
    completeThreeDay4: "Days 5-6: Kunta Kinteh Island, river boat time, Abuko, Kachikally and Tanji fishing culture.",
    completeThreeDay5: "Days 7-8: Janjanbureh, River Gambia boat safari, village life and Wassu Stone Circles.",
    completeThreeDay6: "Days 9-10: Return to Dakar, craft shopping, farewell evening and airport transfer.",
    completeBook: "Request this tour",
    completeDetails: "View full itinerary",
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
    keyword7: "7-day Gambia and Senegal tour",
    keyword8: "Gambia and Casamance private itinerary",
    keyword9: "10-day Senegal and Gambia tour",
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
    faq5Q: "Do you offer multi-day Gambia and Senegal tours?",
    faq5A: "Yes. We offer private 7-day and 10-day itineraries combining The Gambia with Senegal routes such as Casamance, Dakar, Fathala, river landscapes and cultural visits.",
    faq6Q: "What is included in the multi-day tours?",
    faq6A: "Private guide/driver, vehicle, fuel, accommodation, airport transfers, border assistance, listed visits and route planning are included. International flights and some meals/drinks are not included unless confirmed in your quote.",
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
    emailBodyEndDate: "End date",
    emailBodyTourPeriod: "Tour period",
    emailBodyGuests: "Guests",
    emailBodyName: "Name",
    emailBodyEmail: "Email",
    emailBodyPhone: "Phone or WhatsApp",
    emailBodyPickup: "Pickup area",
    emailBodyNotes: "Notes",
    emailBodyMissing: "not provided"
  },
  pl: {
    documentTitle: "Wycieczki Gambia Senegal i trasy kilkudniowe | GambianTour.com",
    metaDescription: "Prywatne wycieczki po Gambii, jednodniowe atrakcje oraz 7- i 10-dniowe trasy Gambia-Senegal z anglojęzycznym lub polskojęzycznym przewodnikiem.",
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
    heroEyebrow: "Prywatne wycieczki po Gambii, Senegal i lokalne atrakcje",
    heroTitle: "Wycieczki po Gambii",
    heroCopy: "Banjul, Kololi, Kotu, rzeka Gambia, lokalne targi, ptaki, trasy do Senegalu i prywatne programy kilkudniowe z elastycznym przewodnikiem.",
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
    formStartDate: "Data rozpoczęcia",
    formGuests: "Goście",
    dateRangeHint: "Termin trasy: {start} - {end} ({days} dni)",
    dateRangeEmpty: "Wybierz datę rozpoczęcia, aby wyliczyć pełny termin trasy.",
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
    toursTitle: "Popularne prywatne trasy po Gambii i Senegalu",
    filterAria: "Filtruj wycieczki",
    filterAll: "Wszystkie",
    filterNature: "Natura",
    filterCulture: "Kultura",
    filterCoast: "Wybrzeże",
    filterMulti: "Kilkudniowe",
    smallGroup: "Prywatnie lub kameralnie",
    fromPerPerson: "od osoby",
    from: "od",
    book: "Rezerwuj",
    quotePrice: "wycena indywidualna",
    quotePerPerson: "wycena dla grupy",
    details: "Szczegóły",
    completeKicker: "Pełne programy kilkudniowe",
    completeTitle: "Prywatne wycieczki po Gambii i Senegalu z gotowym planem.",
    completeCopy: "Te kilkudniowe trasy obejmują prywatny transport, przewodnika/kierowcę, noclegi, transfery z lotniska, logistykę trasy, standardowe wejścia i wymienione atrakcje. Bilety lotnicze oraz jedzenie i napoje nie są wliczone.",
    completeIncludedTitle: "W cenie",
    completeIncludedCopy: "Prywatny przewodnik/kierowca, samochód, paliwo, noclegi, transfery z lotniska, pomoc przy granicy, wymienione wizyty i planowanie trasy.",
    completeExcludedTitle: "Poza ceną",
    completeExcludedCopy: "Loty międzynarodowe, jedzenie, napoje, wydatki osobiste, ubezpieczenie podróżne i napiwki.",
    completePriceNote: "Podane ceny tras 7-dniowych są orientacyjne od osoby przy 2 uczestnikach. Trasa 10-dniowa Senegal i Gambia jest wyceniana indywidualnie, bo finalna cena zależy od hoteli, pokoi, posiłków i liczby osób.",
    completeOneLabel: "Gambia + senegalska Casamance",
    completeOneTitle: "7 dni: Gambia i Casamance",
    completeOnePrice: "od $980 od osoby",
    completeOneCopy: "Kulturalna trasa z wybrzeża Gambii do senegalskiego regionu Casamance dla osób, które chcą zobaczyć wioski, rzeki, targi i spokojną podróż lądową.",
    completeOneDay1: "Dzień 1: Odbiór z lotniska, zakwaterowanie przy wybrzeżu i omówienie trasy w Kololi lub Kotu.",
    completeOneDay2: "Dzień 2: Banjul, Albert Market, okolice Arch 22 i lokalne rzemiosło.",
    completeOneDay3: "Dzień 3: Rybackie wybrzeże Tanji, plaża Sanyang i lokalne życie.",
    completeOneDay4: "Dzień 4: Przejazd do senegalskiej Casamance, trasa do Ziguinchor i nocleg.",
    completeOneDay5: "Dzień 5: Wioski Casamance, rzemiosło, krajobrazy rzeki i opcjonalny czas na łodzi.",
    completeOneDay6: "Dzień 6: Powrót w stronę Gambii z postojami na targi, naturę i zdjęcia.",
    completeOneDay7: "Dzień 7: Elastyczny poranek przy wybrzeżu, pamiątki i transfer na lotnisko lub do hotelu.",
    completeTwoLabel: "Senegambia: natura + kultura",
    completeTwoTitle: "7 dni: Senegambia Wildlife & Culture Loop",
    completeTwoPrice: "od $1,280 od osoby",
    completeTwoCopy: "Bogatsza trasa przez Gambię i Senegal dla osób, które chcą połączyć najważniejsze miejsca Gambii z naturą, rzekami i kulturą regionu Senegambii.",
    completeTwoDay1: "Dzień 1: Transfer po przylocie, hotel przy wybrzeżu i prywatne omówienie trasy.",
    completeTwoDay2: "Dzień 2: Mokradła Kotu, Bakau, lokalne targi i zachód słońca przy wybrzeżu.",
    completeTwoDay3: "Dzień 3: Banjul, przeprawa promowa i trasa północnym brzegiem w stronę Senegalu.",
    completeTwoDay4: "Dzień 4: Dzień natury lub rezerwatu w Senegalu z czasem na zdjęcia.",
    completeTwoDay5: "Dzień 5: Kultura wiosek, rzemiosło oraz krajobrazy rzek lub mangrowców.",
    completeTwoDay6: "Dzień 6: Powrót do Gambii z postojami na lokalne życie, widoki i zakupy.",
    completeTwoDay7: "Dzień 7: Spokojny finał, indywidualny postój i transfer na lotnisko lub do hotelu.",
    completeThreeLabel: "Senegal + Gambia, trasa flagowa",
    completeThreeTitle: "10 dni: Senegal i Gambia",
    completeThreePrice: "wycena indywidualna",
    completeThreeCopy: "Pełna trasa po Afryce Zachodniej ze startem i końcem w Dakarze: Senegal, safari Fathala, pięć dni w Gambii, UNESCO, rzeka Gambia i lokalna kultura.",
    completeThreeDay1: "Dni 1-2: Przylot do Dakaru, orientacja w mieście, Pomnik Renesansu Afrykańskiego, targi i Lac Rose.",
    completeThreeDay2: "Dzień 3: Safari w Fathala Wildlife Reserve i nocleg w lodge.",
    completeThreeDay3: "Dzień 4: Pomoc przy granicy, wjazd do Gambii i zwiedzanie Banjul.",
    completeThreeDay4: "Dni 5-6: Wyspa Kunta Kinteh, rejs po rzece, Abuko, Kachikally i rybackie Tanji.",
    completeThreeDay5: "Dni 7-8: Janjanbureh, safari łodzią po rzece Gambia, wioski i Kamienne Kręgi Wassu.",
    completeThreeDay6: "Dni 9-10: Powrót do Dakaru, rękodzieło, wieczór pożegnalny i transfer na lotnisko.",
    completeBook: "Zapytaj o tę trasę",
    completeDetails: "Zobacz pełny program",
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
    keyword7: "7-dniowa wycieczka Gambia Senegal",
    keyword8: "Gambia i Casamance prywatna trasa",
    keyword9: "10-dniowa trasa Senegal i Gambia",
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
    faq5Q: "Czy oferujecie kilkudniowe wycieczki po Gambii i Senegalu?",
    faq5A: "Tak. Organizujemy prywatne programy 7- i 10-dniowe łączące Gambię z Senegalem, na przykład Casamance, Dakar, Fathala, naturę, rzeki i lokalną kulturę.",
    faq6Q: "Co zawiera cena kilkudniowej trasy?",
    faq6A: "W cenie są prywatny przewodnik/kierowca, samochód, paliwo, noclegi, transfery, pomoc przy granicy, wymienione atrakcje i planowanie trasy. Loty i część posiłków/napojów nie są wliczone, chyba że potwierdzimy inaczej w wycenie.",
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
    emailBodyEndDate: "Data zakończenia",
    emailBodyTourPeriod: "Termin trasy",
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
  quickDateLabel: document.querySelector("[data-quick-date-label]"),
  quickDateRange: document.querySelector("[data-quick-date-range]"),
  modal: document.querySelector("[data-booking-modal]"),
  modalForm: document.querySelector("[data-booking-form]"),
  modalTour: document.querySelector("[data-modal-tour]"),
  modalDate: document.querySelector("[data-modal-date]"),
  modalDateLabel: document.querySelector("[data-modal-date-label]"),
  modalDateRange: document.querySelector("[data-modal-date-range]"),
  modalEndDate: document.querySelector("[data-modal-end-date]"),
  modalTourPeriod: document.querySelector("[data-modal-tour-period]"),
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

function hasNumericPrice(tour) {
  return Number.isFinite(tour.price);
}

function getTour(id) {
  return tours.find((tour) => tour.id === id) || tours[0];
}

function tourCopy(tour) {
  return tour[currentLang] || tour.en;
}

function tourDays(tour) {
  return tour.days || 1;
}

function isMultiDayTour(tour) {
  return tourDays(tour) > 1;
}

function parseDateValue(value) {
  if (!value) {
    return null;
  }

  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
}

function toDateValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDateDisplay(value) {
  const date = parseDateValue(value);

  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat(currentLang === "pl" ? "pl-PL" : "en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(date);
}

function endDateValue(startValue, days) {
  const date = parseDateValue(startValue);

  if (!date || days <= 1) {
    return "";
  }

  date.setDate(date.getDate() + days - 1);
  return toDateValue(date);
}

function dateRangeText(tour, startValue) {
  const days = tourDays(tour);

  if (!isMultiDayTour(tour)) {
    return "";
  }

  const endValue = endDateValue(startValue, days);

  if (!endValue) {
    return t("dateRangeEmpty");
  }

  return template(t("dateRangeHint"), {
    start: formatDateDisplay(startValue),
    end: formatDateDisplay(endValue),
    days: String(days)
  });
}

function formatOption(tour) {
  const priceLabel = hasNumericPrice(tour) ? `${t("from")} ${money(tour.price)}` : t("quotePrice");
  return `${tourCopy(tour).title} - ${priceLabel}`;
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
  updateDateRangeUI();
}

function populateTourSelects() {
  const quickValue = selectors.quickTour.value || tours[0].id;
  const modalValue = selectors.modalTour.value || tours[0].id;
  const options = tours.map((tour) => `<option value="${tour.id}">${formatOption(tour)}</option>`).join("");

  selectors.quickTour.innerHTML = options;
  selectors.modalTour.innerHTML = options;
  selectors.quickTour.value = getTour(quickValue).id;
  selectors.modalTour.value = getTour(modalValue).id;
  updateDateRangeUI();
}

function updateDateRangeUI() {
  const quickTour = getTour(selectors.quickTour.value);
  const modalTour = getTour(selectors.modalTour.value);
  const quickIsMulti = isMultiDayTour(quickTour);
  const modalIsMulti = isMultiDayTour(modalTour);
  const quickRange = dateRangeText(quickTour, selectors.quickDate.value);
  const modalRange = dateRangeText(modalTour, selectors.modalDate.value);
  const modalEndValue = endDateValue(selectors.modalDate.value, tourDays(modalTour));

  if (selectors.quickDateLabel) {
    selectors.quickDateLabel.textContent = quickIsMulti ? t("formStartDate") : t("formDate");
  }

  if (selectors.quickDateRange) {
    selectors.quickDateRange.textContent = quickRange;
    selectors.quickDateRange.hidden = !quickIsMulti;
  }

  if (selectors.modalDateLabel) {
    selectors.modalDateLabel.textContent = modalIsMulti ? t("formStartDate") : t("formDate");
  }

  if (selectors.modalDateRange) {
    selectors.modalDateRange.textContent = modalRange;
    selectors.modalDateRange.hidden = !modalIsMulti;
  }

  if (selectors.modalEndDate) {
    selectors.modalEndDate.value = modalIsMulti ? modalEndValue : "";
  }

  if (selectors.modalTourPeriod) {
    selectors.modalTourPeriod.value = modalIsMulti ? modalRange : "";
  }
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
            ${tour.detailsUrl ? `<a class="tour-detail-link" href="${tour.detailsUrl}"><i data-lucide="route"></i>${t("details")}</a>` : ""}
            <div class="price-row">
              <div>
                <strong>${hasNumericPrice(tour) ? money(tour.price) : t("quotePrice")}</strong>
                <small>${hasNumericPrice(tour) ? t("fromPerPerson") : t("quotePerPerson")}</small>
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
  updateDateRangeUI();
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
    ...(booking.endDate ? [`${t("emailBodyEndDate")}: ${booking.endDate}`] : []),
    ...(booking.tourPeriod ? [`${t("emailBodyTourPeriod")}: ${booking.tourPeriod}`] : []),
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
  const payload = {
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
    ...(booking.endDate ? { "End date": booking.endDate } : {}),
    ...(booking.tourPeriod ? { "Tour period": booking.tourPeriod } : {}),
    Guests: booking.guests,
    Name: booking.name,
    Email: booking.email,
    "Phone or WhatsApp": booking.phone,
    "Hotel / pickup area": booking.pickup || fallback,
    Notes: booking.notes || fallback
  };

  return payload;
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
  updateDateRangeUI();

  const formData = new FormData(selectors.modalForm);

  if (formData.get("_honey")) {
    selectors.feedback.textContent = t("emailSentToast");
    submitButton.disabled = false;
    return;
  }

  formData.delete("_honey");

  if (!formData.get("endDate")) {
    formData.delete("endDate");
  }

  if (!formData.get("tourPeriod")) {
    formData.delete("tourPeriod");
  }

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

  selectors.quickTour.addEventListener("change", updateDateRangeUI);
  selectors.quickDate.addEventListener("change", updateDateRangeUI);
  selectors.modalDate.addEventListener("change", updateDateRangeUI);
  selectors.modalTour.addEventListener("change", () => {
    setModalTour(selectors.modalTour.value, selectors.modalDate.value, selectors.modalForm.elements.guests.value);
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
