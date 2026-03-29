# AutoXec website

Vite + React + TypeScript editorial site with optional **Sanity CMS** for articles and homepage configuration. If Sanity env vars are missing, the app uses embedded data in **`src/data.ts`** (same behaviour as before)

## Run locally (frontend)

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Sanity CMS (content)

### What it does

- **`article`** documents hold full posts (title, slug, body paragraphs, images, categories, etc.).
- A single **`homePage`** document configures the homepage: ticker, hero carousel and rail (via **references** to articles), quick reads, trending, topics, EV/engineering mini-rows, and filter chip counts.
- The React app fetches with the **public** Sanity API (CDN). No write token is bundled in the website.

### One-time setup

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage) (or use `npm create sanity@latest` and note the **Project ID**).
2. Put that id in **`studio/project.ts`** (`apiProjectId` / `apiDataset`). This file is what Studio uses at runtime (Vite does not always inject `studio/.env` into the config bundle, which caused empty `projectId` errors). Optionally mirror the same values in `studio/.env` for CLI tools — see [`studio/.env.example`](./studio/.env.example).
3. Copy the same id into the **website** `.env`: `VITE_SANITY_PROJECT_ID`, plus optional `VITE_SANITY_DATASET`, `VITE_SANITY_API_VERSION` — see [`.env.example`](./.env.example).
4. Install studio deps (first time): `cd studio && npm install`.
5. Start the editor: `npm run studio` (from repo root) or `cd studio && npm run dev`.
6. In the desk, create **Article** documents, then a **Homepage** document (hero lists use references to those articles).
7. Reload the Vite site. If the API fetch fails, the app **falls back** to `src/data.ts` and logs a warning in the console.

### Daily workflow

| Task | Where |
| --- | --- |
| New post or edit body | Studio → **Article** |
| Change hero order or home modules | Studio → **Homepage** |
| No CMS / offline | Unset `VITE_SANITY_PROJECT_ID` — site uses `src/data.ts` |

### Scripts

| Command | Purpose |
| --- | --- |
| `npm run studio` | Sanity Studio (admin UI) |
| `npm run studio:build` | Static build of Studio (optional hosting) |

### Schema source

- [`studio/schemaTypes/article.ts`](./studio/schemaTypes/article.ts)
- [`studio/schemaTypes/homePage.ts`](./studio/schemaTypes/homePage.ts)

Website mapping: `src/lib/sanity/` (GROQ in `queries.ts`, mapping in `map.ts`, load in `fetchSite.ts`).

---

## Firebase: Intelligence Brief signups

Subscribers are saved to **Cloud Firestore** in the collection `intelligence_brief_subscribers`.

| Where | `source` field |
| --- | --- |
| `/subscribe` full form | `subscribe_page` |
| Homepage sidebar “Intelligence Brief” | `sidebar` |

Setup: Firebase project, `.env` from [`.env.example`](./.env.example), deploy [`firestore.rules.example`](./firestore.rules.example) as your Firestore rules.

---

## Static fallback (`src/data.ts`)

If you are **not** using Sanity, or a field on **Homepage** is empty, the app uses the embedded arrays in `src/data.ts` for that slice. You can still edit files directly:

- **`ARTICLES`**, **`HERO_SLIDES`**, **`HERO_SIDE`**, **`STORIES`**, **`TICKER_ITEMS`**, **`TRENDING`**, **`TOPICS`**, **`EV_MINI`**, **`ENG_MINI`**, **`FILTER_COUNTS`**

Category URL mapping (`launch` → `launches`, etc.) lives in `src/lib/site.ts`.

---

## Customizing (look, copy, structure)

Use this as a map of **what to edit** for common changes. Prefer **Sanity** for editorial content when it is enabled; use **code** for layout, global copy, and design tokens.

### Branding and visual design

| Goal | Where |
| --- | --- |
| Colours, backgrounds, borders, typography tokens | [`src/index.css`](./src/index.css) — `:root` CSS variables (`--bg`, `--red`, `--surface`, etc.) |
| Logo / site name in the header | [`src/components/SiteNav.tsx`](./src/components/SiteNav.tsx) |
| Footer links and boilerplate | [`src/components/SiteFooter.tsx`](./src/components/SiteFooter.tsx) |
| Breaking ticker (when not using Sanity home) | `TICKER_ITEMS` in [`src/data.ts`](./src/data.ts), or **Homepage → ticker** in Studio |

After changing global CSS, run `npm run dev` and check mobile width breakpoints (many layouts switch around **960px** / **1024px** in `index.css`).

### Navigation and routes

| Goal | Where |
| --- | --- |
| Top nav categories and labels | `NAV_CATEGORIES` in [`src/data.ts`](./src/data.ts) (must stay aligned with `ArticleCategory` / routes) |
| Register a new page | Add a component under [`src/pages/`](./src/pages/), then a `<Route>` in [`src/App.tsx`](./src/App.tsx) |
| Category URL slugs (`/category/ev`, etc.) | [`src/lib/site.ts`](./src/lib/site.ts) — `categoryToPathSlug`, `pathSlugToCategory` |

### Editorial content (CMS-first)

| Goal | Where |
| --- | --- |
| Posts, hero, home strips, trending, topics | **Sanity Studio** — `article` and `homePage` (see [Sanity CMS](#sanity-cms-content) above) |
| Add a field editors should fill | Edit [`studio/schemaTypes/article.ts`](./studio/schemaTypes/article.ts) or [`studio/schemaTypes/homePage.ts`](./studio/schemaTypes/homePage.ts), then extend GROQ in [`src/lib/sanity/queries.ts`](./src/lib/sanity/queries.ts) and mapping in [`src/lib/sanity/map.ts`](./src/lib/sanity/map.ts) |
| Change how Sanity maps to the React `Article` type | [`src/lib/sanity/map.ts`](./src/lib/sanity/map.ts) |

Republish or save documents in Studio after schema changes; the website only reads **published** API data (with CDN caching — allow a short delay after publish).

### Editorial content (no CMS / fallback)

| Goal | Where |
| --- | --- |
| All seeded stories and home layout | [`src/data.ts`](./src/data.ts) — arrays listed in [Static fallback](#static-fallback-srctsdats) |
| Category page headlines and colours | `CATEGORY_META` in [`src/data.ts`](./src/data.ts) |

### Intelligence Brief and legal

| Goal | Where |
| --- | --- |
| Subscribe page copy and form fields | [`src/pages/SubscribePage.tsx`](./src/pages/SubscribePage.tsx) |
| Sidebar newsletter box copy | [`src/components/SidebarWidgets.tsx`](./src/components/SidebarWidgets.tsx) |
| Firestore collection name or payload shape | [`src/firebase/newsletter.ts`](./src/firebase/newsletter.ts) + [`firestore.rules.example`](./firestore.rules.example) |
| Privacy / terms routes and text | [`src/pages/LegalPages.tsx`](./src/pages/LegalPages.tsx) (and routes in `App.tsx`) |

### Environment and project IDs

| App | File | Variables |
| --- | --- | --- |
| Website (Vite) | Root [`.env`](./.env.example) | `VITE_*` — Firebase, Sanity (`VITE_SANITY_PROJECT_ID`, …) |
| Sanity Studio | [`studio/project.ts`](./studio/project.ts) and optional `studio/.env` | `apiProjectId` / `apiDataset` + `SANITY_STUDIO_*` for CLI |

Keep **Sanity project id** the same in `studio/project.ts` and `VITE_SANITY_PROJECT_ID` so Studio and the site hit one dataset.

### Builds and quality checks

```bash
npm run build      # typecheck + production bundle
npm run preview    # serve dist locally
cd studio && npx sanity schema validate  # after schema edits
```

---

## Project layout (quick)

| Purpose | Location |
| --- | --- |
| Types & static seed | `src/data.ts` |
| CMS fetch + map | `src/lib/sanity/` |
| Global content for routes | `src/context/SiteDataContext.tsx` |
| Sanity Studio | `studio/` |
| Routes | `src/App.tsx` |
| Newsletter API | `src/firebase/newsletter.ts` |

## Licence

Proprietary / your deployment — add licence text as needed.
