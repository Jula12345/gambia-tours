# Gambia website content update — 21 October 2026

## Photos and video

All 15 supplied photos have WebP variants at 480, 960 and up to 1600 pixels in `assets/trips/`. Images keep their original frames; responsive HTML/CSS controls card crops and preserves group shots. The gallery opens full frames in a keyboard-accessible viewer. The sunset hero/card is straightened with CSS. Original source filenames are recorded in `assets/trips/manifest.json`; the files in Downloads are unchanged.

The supplied MP4 appears in `gallery.html`, with a poster, native controls, inline mobile playback and `preload="none"`. It does not autoplay.

## Hotel facts and promotional photos

Descriptions are original summaries of the properties' official pages, checked on 21 October 2026. No unverified hotel rates, availability or review scores were added. The user states that hotel promotional image use is authorized. Exact downloaded image URLs are recorded in `assets/hotels/recommended/sources.json`.

- [Kairaba Beach Hotel](https://kairabahotel.com/): Kololi beachfront, gardens, rooms/suites and pools.
- [Coco Ocean Resort & Spa](https://cocoocean.com/): Moorish-inspired resort architecture, gardens, beach, spa, suites and villas.
- [TUI BLUE Tamala](https://www.tui-blue.com/en/en/hotels/tui-blue-tamala/): Kotu beachfront, adults only (16+), pool and selected swim-up rooms. Photo from [the resort website](https://www.tamalaresort.com/home).
- [Kololi Sands Apartments](https://kololisands.com/): studios and apartments, kitchens, balconies/terraces, infinity pool and Bistro Sands.
- [Kololi Beach Resort](https://kololi.com/): self-catering studios, apartments, townhouses and villas, pools and beach access.
- [Senegambia Beach Hotel](https://senegambiahotel.com/): Kololi location, beachfront, gardens, pools and dining.

Each property has a static detail page, enquiry form and official source link. Lala's Complex is retained. Hotel facts and services should be reconfirmed when arranging a stay.

## Customer testimonials

Updated 22 October 2026: the three sample reviews have been replaced with existing reviews by Łukasz K., Ewa Cz. and Karolina K. from Moja Afryka. English translations are credited to the sister website; the Polish toggle retains the original text. No fabricated identities, scores or self-serving review schema were added.

## Cruise Ship Excursions

`cruise-ship-excursions-tour.html` and the EN/PL catalogue entry use individual pricing after contact. The enquiry captures ship, port, arrival, all-aboard time, group size and language. Ship details are included in the notes delivered through the existing booking inbox/email flow. Safari and cross-border options depend on the port schedule and are not promised for every sailing. The trip is also available to the existing admin offer generator.

## Hosting

This checkout is the existing GitHub/Vercel project. It has no Sites hosting manifest, and no replacement Sites project was created. Publication uses the existing repository/Vercel deployment flow. See SEO_AND_TOUR_SYNC.md for the 22 October 2026 expansion.

## Verification

- All 43 project tests pass, including cruise field delivery and catalogue/admin integration.
- JSON-LD and local links/assets checked across 23 HTML pages.
- Browser checks at 390px and 1440px: no horizontal overflow; homepage EN/PL switching, hotel collection, cruise form prefill, required port-call fields and gallery navigation verified.
- No live booking enquiries were sent during browser checks.
- Desktop screenshot: `output/website-preview/hotel-recommendations.jpg`.

## Branding, subpage scale and languages — 22 October 2026

Public text and reviews now use GambianTour throughout. Only the Polish-language footer invites visitors to mojaafryka.pl, presented as the site for Polish tourists. Original review/source records remain in the content files.

All 37 subpages have English/Polish controls with a remembered language choice, translated content and forms. Story pages use smaller headings and compact image/text rows, and other subpage heroes follow the same reading scale. The build applies these changes through `scripts/refresh-presentation.js`; translations are maintained in `content/subpage-pl.json`.

Validation: 49 passing tests; 38-page local link/asset audit; complete translation coverage; phone-width browser check of all 37 subpages; manual checks of form preservation, booking variants and multi-day dates.

## Balanced homepage, header and footer — 22 October 2026

Content now stays within a centered 1,080px reading width and the header within 1,128px, including on wide monitors. Header logo and navigation labels are smaller. The footer reserves space for the logo and wraps its links into a three-column grid, with a two-column arrangement on phones; email, telephone and the Polish invitation have their own rows.

The homepage hero title is capped at 72px rather than 134px (115px at the tested 1,280px viewport). Section headings, image frames and vertical section spacing are also reduced. Mobile controls retain comfortable sizes and readable body text.

Validation: both languages checked at nine widths from 320px to 1,920px, plus all 37 subpages at phone width, with no horizontal overflow. All 49 tests and the site/language audits pass. Preview images are in `output/balance-preview/`.

## 23 October 2026 — Dutch, German and multilingual SEO

Added complete Dutch and German versions and published Polish on its own URLs: `/nl/`, `/de/`, `/pl/`. English keeps the existing root addresses. All 38 public pages are available in each language, with translated content and metadata, self-canonicals, reciprocal language links, and a 152-URL sitemap. A compact language menu works on all pages and preserves the current route, query/anchor and enquiry entries. International copy highlights English-speaking local guides; Polish guiding remains available by arrangement and prominent in Polish. No German/Dutch guiding availability is invented. See MULTILINGUAL_SEO.md.

## 23 October 2026 — Sitemap verification and translated layout corrections

Verified the production sitemap against the four-language page inventory: 152 unique canonical URLs (38 in each language), no missing or unexpected URLs, no redirects/errors, and the correct sitemap reference in robots.txt. Added exact-set and duplicate checks to the site audit so future language changes cannot silently leave stale sitemap entries.

The Dutch homepage header now uses the compact `FAQ` label and keeps desktop navigation labels on one line. All public headers switch to the compact navigation at 1140px rather than crowding longer translations. The dropdown has a viewport-height limit so it remains usable on shorter screens.

Fixed clipped homepage highlight labels, narrow-screen tour facts and apartment amenities, long Dutch text in tour inclusion panels, and German hotel enquiry labels. Legacy stories, Polish-guide and ten-day tour pages now share the translated navigation/date code, including accessible expanded state and localized ten-day date ranges.

Validation: 54 tests pass, site/language audits pass, and 608 browser layout checks cover all 152 pages at 320, 768, 1024 and 1280px. Those checks report no page overflow, clipped text containers, wrapped desktop menu labels or header overlap. Compact-menu interactions and ten-day date calculation were checked separately.
