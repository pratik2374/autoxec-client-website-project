# AutoXec website

Vite + React + TypeScript editorial homepage (routes, hero carousel, article pages, newsletter). Editorial **posts and news** live in code today — see below.

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Firebase: Intelligence Brief signups

Subscribers are saved to **Cloud Firestore** in the collection `intelligence_brief_subscribers`.

Two entry points write the same collection with a `source` field:

| Where | `source` field | Other fields |
| --- | --- | --- |
| `/subscribe` full form | `subscribe_page` | `firstName`, `email`, `role`, `privacyAccepted` |
| Homepage sidebar “Intelligence Brief” box | `sidebar` | `firstName` is empty string, `role` is `sidebar`, `email`, `privacyAccepted` |

### Setup

1. Create a Firebase project and enable **Firestore** (start in test mode only while experimenting; lock down before public launch).
2. Register a **Web app** and copy the config into a **`.env`** file at the repo root (use [`.env.example`](./.env.example) as a template).
3. Copy [`firestore.rules.example`](./firestore.rules.example) into your deployed **`firestore.rules`** (Firebase Console or CLI), adjusting if you tighten security (App Check, auth-only writes, etc.).

Open client writes are convenient for development but attract spam; for production, prefer stricter rules or a tiny backend/Cloud Function.

### After you change rules

Deploy with the Firebase CLI (`firebase deploy --only firestore:rules`) or paste the rules in the Firebase Console.

## Adding blog posts, news, and homepage content

All of this is in **`src/data.ts`** unless you later move to a CMS. Keep **slugs unique** and **URL-safe** (lowercase, hyphens).

### Full article (shows on home grid, category pages, `/article/:slug`)

1. Add one object to the **`ARTICLES`** array with the **`Article`** shape:
   - **`id`**: unique string (any stable id).
   - **`slug`**: used in URLs as `/article/your-slug`.
   - **`cat`**: one of `ev`, `launch`, `engineering`, `motorsport`, `twowheeler`, `industry` (matches nav categories).
   - **`badge`**, **`badgeClass`**: display label and color class (`ev` | `launch` | `engineering` | `motorsport` | `twowheeler` | `industry`).
   - **`title`**, **`excerpt`**, optional **`deck`**, **`bodyParagraphs`**, **`keyTakeaways`**, **`tags`**.
   - **`imageUrl`**: optional; preferred for thumbnails and cards.
   - **`thumbLabel`**, **`thumbGradient`**: used when `imageUrl` is absent.
   - **`upvotes`**, **`readTime`**, **`meta`**, optional **`published`** / **`updated`**.

2. Optionally bump **`FILTER_COUNTS`** in the same file so homepage filter chips match your totals (or adjust when you have dynamic data).

### Hero carousel (top of home)

Edit **`HERO_SLIDES`**: each slide needs **`slug`** (should match a real `ARTICLES` entry or stub), **`categoryPath`** (`ev` | `launches` | `engineering` | `motorsport` | `two-wheelers` | `industry`), **`imageUrl`**, copy fields, etc.

### Hero right rail (three small cards)

Edit **`HERO_SIDE`**: **`slug`**, **`imageUrl`**, **`cat`** / **`catClass`**, title, meta line.

### “Quick reads” strip

Edit **`STORIES`**: **`slug`**, **`title`**, **`meta`**, **`imageUrl`**.

### Ticker line under nav

Edit **`TICKER_ITEMS`** in `data.ts`.

### Trending / topic chips / EV & Engineering mini-rows

- **`TRENDING`**, **`TOPICS`**, **`EV_MINI`**, **`ENG_MINI`** — same idea: slugs and copy.

### Slugs that are not full `ARTICLES` yet

**`STUB_POOL`** (in `data.ts`) builds lightweight placeholder articles from mini-card data so links do not 404. For a **serious** post, add a full **`ARTICLES`** entry and keep the **same `slug`** everywhere (hero, stories, cards) so one URL resolves to the full piece.

**Category URLs:** `launch` in data maps to path `launches`; `twowheeler` maps to `two-wheelers`. See `src/lib/site.ts` if you add categories.

## Project layout (quick)

| Purpose | Location |
| --- | --- |
| Content & types | `src/data.ts` |
| Routes | `src/App.tsx` |
| Home layout | `src/pages/HomePage.tsx` |
| Newsletter API | `src/firebase/newsletter.ts` |
| Firebase init | `src/firebase/config.ts` |

## Licence

Proprietary / your deployment — add licence text as needed.
