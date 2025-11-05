# Structured Data for Premium 14-Day Adventure Tour

Add this JSON-LD structured data to the gambia-senegal-adventure.html page for better search visibility:

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "name": "Premium 14-Day Gambia & Senegal Adventure",
  "description": "Ultimate cultural and wildlife experience across Gambia and Senegal with multilingual guides, luxury accommodation, and authentic West African adventures",
  "url": "https://www.gambiantour.com/gambia-senegal-adventure.html",
  "image": [
    "https://www.gambiantour.com/photos/WhatsApp%20Image%202025-08-25%20at%2013.05.41%20(1).jpeg"
  ],
  "duration": "P14D",
  "touristType": "Cultural Tours, Wildlife Safari, Adventure Travel",
  "inLanguage": ["en", "pl"],
  "offers": {
    "@type": "Offer",
    "name": "14-Day Premium Package",
    "description": "All-inclusive 14-day adventure with 4-star accommodation",
    "provider": {
      "@type": "TravelAgency",
      "name": "Gambia Tours",
      "url": "https://www.gambiantour.com",
      "telephone": "+48504224794",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "GM"
      }
    }
  },
  "itinerary": [
    {
      "@type": "TouristDestination",
      "name": "Banjul City Exploration",
      "description": "Historic capital city tour with colonial architecture"
    },
    {
      "@type": "TouristDestination", 
      "name": "Abuko Nature Reserve",
      "description": "Professional bird watching with 40+ species"
    },
    {
      "@type": "TouristDestination",
      "name": "Kunta Kinteh Island",
      "description": "UNESCO World Heritage site visit"
    },
    {
      "@type": "TouristDestination",
      "name": "Fathala Wildlife Reserve",
      "description": "Senegal safari experience with lions and giraffes"
    },
    {
      "@type": "TouristDestination",
      "name": "Pink Lake (Lac Rose)",
      "description": "Unique natural phenomenon in Senegal"
    }
  ],
  "includedInDataCatalog": {
    "@type": "DataCatalog",
    "name": "West Africa Premium Tours"
  }
}
</script>
```

## For Polish Homepage (/pl/index.html):

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "Gambia Tours - Polski Przewodnik",
  "description": "Autentyczne wycieczki po Gambii z doświadczonym polskim przewodnikiem",
  "url": "https://www.gambiantour.com/pl/",
  "inLanguage": "pl",
  "availableLanguage": ["pl", "en"],
  "areaServed": {
    "@type": "Country",
    "name": "Gambia"
  },
  "serviceType": "Travel Agency",
  "priceRange": "$$-$$$",
  "telephone": "+48504224794",
  "email": "info@gambiantour.com",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Polskie Wycieczki do Gambii",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "TouristTrip",
          "name": "Premium 14-Dniowa Przygoda"
        }
      }
    ]
  }
}
</script>
```