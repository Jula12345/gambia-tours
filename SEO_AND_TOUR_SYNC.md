# GambianTour content, tour coverage and SEO — 22 October 2026

## Tour coverage

The intended source is **https://mojaafryka.pl/**. The spelling `mojafryka.pl` did not resolve in the web research. Read-only comparison of the working site's public catalogue found 10 detail-page links plus the kayaking listing. All 11 advertised tours are now represented; the Janjanbureh express option has its own additional route page. The existing 10 GambianTour options are preserved, giving **22 catalogue entries**.

New routes: Fathala safari/lion-walk option; Bijilo/Kachikally/Serrekunda; Makasutu; river cruise/fishing; South Gambia; mangrove kayaking; Kunta Kinteh classic/premium; Banjul/Serrekunda group route; Janjanbureh overnight; Janjanbureh express; Fathala/Saloum overnight; eight-day Gambia/Senegal.

The existing private four-hour Banjul route remains distinct from the source site's full-day Thursday Banjul/Serrekunda shared departure. Kunta Kinteh retains both the classic ferry (€110/minimum four) and premium boat (€150/minimum two) options. Makasutu's Sunday departure and the two-market tour's Thursday departure are presented subject to confirmation.

This is a reviewed import, not a background two-way synchronization. Future source changes can be checked with `node scripts/audit-source-tours.js`. That command only reports missing source routes; it does not change either site. Curated facts live in `content/source-tours.json`. Run `npm run build:content` after editing those facts to regenerate the English detail pages and catalogue. Check results with `npm run check:site` and `npm test`.

### Source discrepancies handled deliberately

- Fathala: catalogue €150/minimum four; detail page €140/minimum two. New English route is individually quoted.
- Janjanbureh overnight: catalogue €300; detail page €250. New overnight route is individually quoted. The consistent express rate of €150 is retained separately.
- River fishing: €85 is consistent, but minimum group size differs (four versus two). Keep the rate and confirm the departure minimum personally.
- Fathala/Saloum: source group maximum differs (16 versus 10); retain individual pricing and confirm group arrangements.
- Eight-day package: €2,900 for two people, with a stated departure group of 6–16. Display €1,450 per person and clearly explain two guests sharing within a group departure. Do not represent it as a private two-person trip.
- Published source EUR rates retain EUR. Existing USD routes retain USD. Both the selector and cards format each tour's actual currency.
- Flights, passport/visa requirements, vaccinations, airport charges, wildlife sightings and hotel availability are not invented or guaranteed. The English adaptation does not repeat nationality-specific entry/health claims from the source.

## Reviews, brand and contact

Three existing reviews from https://mojaafryka.pl/ replace all sample review text: Łukasz K., Ewa Cz. and Karolina K. English translations and source attribution are visible. Original Polish text is retained in the homepage PL toggle. No review dates, stars, avatars, customer identities or rating schema were fabricated.

The English wordmark uses the current Moja Afryka sunset/baobab/palm/canoe artwork with `GambianTour.com` and an English tagline. The adaptation is an SVG composition using the original artwork, with compressed embedded image data and native SVG text. Favicons and the Apple touch icon match. The original source is retained in `assets/brand/moja-afryka-source.png`.

A fixed, accessible WhatsApp link appears on every public page and uses **+48 504 224 794**, confirmed on the source site's contact page and WhatsApp links. The button opens a prepared message; it does not send a message automatically. An English guide biography connects the two brands without changing the public booking email.

Twelve additional source photos are stored locally as WebP files. Their original URLs and owner authorization are recorded in `assets/moja-afryka/sources.json`.

## Seasonal publishing

New travel guide index: `/blog.html`. New article: `/blog-gambia-season-2026-2027.html`, published 22 October 2026. Reservations are advertised as open for the user's requested 2026–2027 season. A homepage callout appears before the tour catalogue.

The article distinguishes the main November–April winter-tourism planning window from the wider November–May dry season. It does not invent an exact first flight or guarantee weather. Sources: [Government of The Gambia, climate](https://gambia.gov.gm/about/), [Gambia News Agency, October 2026 season preparations](https://gamna.gov.gm/gtboard-concludes-consultative-meeting-ahead-of-2026-tourism-season/), and [the source tour catalogue](https://mojaafryka.pl/wycieczki/).

## SEO findings and fixes

- **Canonical inconsistency:** the live non-www domain redirects to www, while previous canonical/schema/sitemap URLs used non-www. All public pages now consistently use `https://www.gambiantour.com`.
- **Index duplication:** add a permanent `/index.html` → `/` redirect. Other existing routes and backend configuration are preserved.
- **JavaScript-only discovery:** homepage tour cards and the complete `/tours.html` catalogue now contain ordinary crawlable HTML links and content before JavaScript executes. Source routes each have their own English detail page, itinerary and enquiry form.
- **Search snippets/social metadata:** unique page titles and descriptions, canonical URLs, Open Graph and Twitter card metadata, plus missing images on the Polish-guide and stories pages. The catalogue title is distinct from the homepage title.
- **Structured data:** consistent business identity, public WhatsApp phone, address, logo and sister-site relationship; route offers use the correct currencies. Enquiry-priced routes omit numerical offers. Remove unsupported `InStock` assertions. The seasonal article has dated BlogPosting markup and visible sources. FAQ structured answers match the updated visible answers.
- **Sitemap and robots:** sitemap covers all 38 public pages. Admin remains meta-noindex and gains X-Robots-Tag headers, as do API paths; private data/API crawling is excluded. No fabricated review rich-result markup is added.
- **Content and navigation:** replace the homepage keyword grid with useful seasonal content; connect tour, guide, accommodation, biography and editorial pages. Preserve the separate Polish guide page without falsely declaring dynamically switched content to be separate language URLs.
- **Image reliability/performance:** local WebP source photos and optimized brand graphics; replace the rate-limited external bee-eater image with the owner's local egret photo. Other external image URLs returned HTTP 200 during the check. Image dimensions, deferred below-fold loading and full-frame gallery viewing are preserved.
- **Usability:** labeled direct-contact link, keyboard focus, mobile-sized WhatsApp target, navigation expanded state and corrected testimonial text contrast.

Google documentation consulted: [canonicalization](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics), [crawlable navigation](https://developers.google.com/search/docs/specialty/ecommerce/help-google-understand-your-ecommerce-site-structure), [review markup](https://developers.google.com/search/docs/appearance/structured-data/review-snippet).

## Verification and practical limits

- 47 tests pass, including all tour/admin facts, enquiry field delivery, EUR/USD formatting, source-page/schema consistency, genuine-review replacement and site-wide metadata/canonical/sitemap checks.
- Static audit: 38 public pages, 863 local links, 464 asset references, no errors or warnings. All 38 public pages return HTTP 200 in the local preview.
- Browser checks cover desktop and mobile layouts, the source booking flow, Polish reviews, multi-day dates, the brand graphics and the fixed contact link. Screenshots are in `output/season-preview/`.
- No customer messages or live booking requests are sent during verification.
- Search Console ownership, indexing history, search queries, rankings, backlinks and field Core Web Vitals are not available through this checkout. These changes address the site itself; indexing and client acquisition are not guaranteed. There is no claim that a private Google Search Console audit was performed.
