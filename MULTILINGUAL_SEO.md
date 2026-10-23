# Four-language publishing — 23 October 2026

The previous English/Polish switch changed content in the browser at the same URL. It did not give the Polish content its own crawlable page addresses. The site now publishes 38 public pages in each of four languages, for 152 complete HTML documents.

| Language | Homepage | Example tour |
| --- | --- | --- |
| English | `/` | `/kunta-kinteh-island-tour.html` |
| Polish | `/pl/` | `/pl/kunta-kinteh-island-tour.html` |
| Dutch | `/nl/` | `/nl/kunta-kinteh-island-tour.html` |
| German | `/de/` | `/de/kunta-kinteh-island-tour.html` |

Existing English addresses are unchanged. Each document has its own language, translated main content/title/description/social metadata/accessible labels, self-referencing canonical, and reciprocal `en`, `pl`, `nl`, `de` and English `x-default` alternatives. Structured text and page URLs are localized; product identities, booking values, dates, numerical prices and currencies remain stable. All 152 URLs are in the sitemap. Locale homepages use a trailing slash; locale `/index.html` addresses redirect to the corresponding homepage.

The compact native language menu uses full language names (English, Polski, Nederlands, Deutsch), with shorter codes on phones. Its ordinary links lead to the same page in each language, preserving query parameters and anchors. A short-lived session draft retains enquiry entries during a language change. No IP, browser-language or stored-preference redirect overrides the URL. Core translated content and links are present without JavaScript.

International copy leads with English-speaking local guides and personal support. Polish guiding remains available by prior arrangement and is promoted more prominently in Polish. Dutch and German website translations do not promise guides speaking those languages. Enquiry forms offer only the confirmed guiding languages, English and Polish. The Polish sister-site invitation appears only in Polish.

## Content maintenance

- Edit English source content and existing Polish homepage/tour content as before.
- `npm run build:content` generates English sources and all four language versions. Do not edit generated files under `pl/`, `nl/`, `de/` or `assets/locales/` directly.
- Dictionaries: `content/subpage-pl.json`, `content/locale-nl.json`, `content/locale-de.json`. Keys are normalized English source strings. Add translations for changed/new strings before publishing; a missing translation fails the build.
- `node -e "require('fs').writeFileSync('content/locale-source.json',JSON.stringify(require('./lib/site-localization').strings(),null,2)+'\\n')"` refreshes the import list after source edits.
- Optional `node scripts/translate-locales.js pl nl de` imports only missing public copy using an external translation service. It is an offline editorial aid, never a live visitor dependency. Review imports and use `node scripts/refine-locales.js` for travel terminology corrections before rebuilding. Initial Dutch/German copy is machine-assisted with editorial corrections to booking vocabulary, tour names and guide-language claims; native-speaker review remains useful.
- `npm run check:site`, `npm run check:language`, and `npm test` validate page coverage, local assets/links, translated metadata, reciprocal language links, placeholders, product values and the existing enquiry/backend behavior.

Google guidance: [Managing multilingual versions](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites) and [localized versions / hreflang](https://developers.google.com/search/docs/specialty/international/localized-versions).

These changes make the translated URLs discoverable and eligible for indexing; they do not guarantee indexing or rankings. Search Console indexing, analytics and country-specific search performance were not accessible in this workspace. Submit or refresh the existing sitemap in Search Console if appropriate, then monitor the new language URLs as Google recrawls the site.
