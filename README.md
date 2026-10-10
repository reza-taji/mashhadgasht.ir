# Mashhadgasht · مشهدگشت

A responsive, static React + Vite travel discovery app. Persian is the default; Arabic and English are fully localized. No backend or runtime translation service is required.

## Run

```sh
npm install
npm run dev
npm run build
npm run preview
```

Deploy `dist/` to any static host. Node.js 22 is recommended. For subdirectory hosting, set `base` in `vite.config.js` and adjust root-relative asset paths.

## Structure

```text
public/
  images/                 Locally hosted, optimized WebP photography
  image-credits.html      Sources, creators and image licenses
src/
  components/
    Brand.jsx
    Header.jsx            Navigation, live search, saved places, language selector
    Hero.jsx              Shrine backdrop, search and category shortcuts
    FilterBar.jsx         Category, tag and sort controls
    PlaceCard.jsx         Reusable card, save, details and map link
    PlaceDialog.jsx       Accessible native modal
    Footer.jsx            Travel banner, essential links and emergency contacts
  data/
    categories.js         Stable category IDs and Lucide icons
    places.fa.json        Persian sample records
    places.ar.json        Arabic sample records
    places.en.json        English sample records
    search.js             Normalized localized keyword matching
  i18n/
    I18nProvider.jsx       Language preference, document direction and translations
    messages.js           UI strings in all three languages
  App.jsx                 Filters and saved-place state
  main.jsx                App entry and self-hosted font subsets
  styles.css              Tailwind v4, logical properties and responsive styles
```

## Localization

`useI18n()` exposes `language`, `setLanguage`, `t(key)` and `number(value)`. The provider validates the stored preference, falls back to `fa`, synchronizes `html.lang`, `html.dir` and the document title before paint, and persists changes under `mashhad-language`. Storage failures do not prevent using the app. Persian and Arabic use Vazirmatn; English uses Inter. Fonts are bundled locally, with no third-party font requests.

Directional layout uses CSS logical properties and Tailwind's `rtl:`/`ltr:` variants. Locale changes clear language-specific search text while retaining category, tags and stable saved-place IDs. UI strings live in `messages.js`; place content lives in the corresponding locale JSON.

## Multilingual record schema

Each locale file is an array. Represent the same place with the same `id`, `category`, `image`, `coordinates` and `tagIds`; translate `title`, `excerpt`, `address` and `tags`.

```json
{
  "id": "imam-reza",
  "category": "shrine",
  "image": "/images/shrine.webp",
  "coordinates": [36.2879, 59.6157],
  "title": "حرم مطهر امام رضا (ع)",
  "excerpt": "اینجا، قلب شهر آرام می‌گیرد.",
  "address": "مشهد، حرم مطهر رضوی",
  "tagIds": ["free", "culture"],
  "tags": ["زیارت و آرامش", "تاریخ و فرهنگ"]
}
```

For `places.ar.json`, use `title: "حرم الإمام الرضا (ع)"`, `excerpt: "هنا يسكن قلب المدينة."`, `address: "مشهد، الحرم الرضوي المطهر"`, `tags: ["زيارة وسكينة", "تاريخ وثقافة"]`.

For `places.en.json`, use `title: "Imam Reza Holy Shrine"`, `excerpt: "The serene heart of the city."`, `address: "Mashhad, Imam Reza Shrine"`, `tags: ["Pilgrimage", "History & culture"]`.

Valid categories: `shrine`, `attractions`, `services`, `heritage`, `bazaar`. Valid tags: `free` (pilgrimage, not a free-admission guarantee), `culture`, `nature`, `shopping`, `family`. Coordinates are latitude, longitude and are used by the external map link.

## Importing your extracted data

The source datasets were not present in the workspace, so all nine records are **demonstration content**, not an import of mizban.mashhad.ir. Replace the three sample files with verified translations of your extracted records. Keep IDs aligned across locales and add locally hosted images. Coordinates and addresses are illustrative; verify before publishing. Photo credits are linked from the footer; retain attribution and applicable image licenses.

## UX and performance

- Instant search covers localized titles, descriptions, addresses and tags, with Arabic/Persian letter normalization and diacritic handling.
- Category and tag filters combine with search; recommended and alphabetical sorting are available.
- Six places render initially; the show-more action reveals the rest.
- Saved places persist under `mashhad-saved` and can be viewed using the header bookmark.
- Native dialog provides focus trapping, Escape dismissal, backdrop dismissal and focus restoration.
- Responsive grids, horizontally scrollable mobile categories, mobile navigation, skip link, visible focus states, and reduced-motion support.
- Local WebP images, lazy-loaded card photography, high-priority hero, bundled font subsets and a static production bundle.
- Maps open externally; there is no embedded map, analytics or geolocation collection.

## Content sources

Photography sources and licenses: `public/image-credits.html`. Image adaptations retain their original Creative Commons licenses; this does not assign those licenses to application code.

Emergency phone numbers were checked against the Municipality of Mashhad's visitor portal on October 10, 2026: https://www.visitingmashhad.ir/essential-info/useful-numbers/ . They use `tel:` links. No real-time hours, admission fees or accessibility guarantees are claimed.
