# AutoXec Newsroom

A high-performance, engineering-first React Single Page Application (SPA) built with Vite, TypeScript, and Sanity CMS.

*   **View AutoXec System Architecture**: [ARCHITECTURE_AND_SYSTEM_DESIGN.md](./ARCHITECTURE_AND_SYSTEM_DESIGN.md)

---

## 🚀 Running Locally (Frontend)

To run the application, you must configure the `.env` file first with your Sanity CMS Project ID. Note that the frontend no longer uses hardcoded mock data. If Sanity is not configured or reachable, the application will attempt to load a cached `localStorage` version or present a Production Maintenance screen.

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

---

## 🧠 Content Architecture (Sanity CMS)

AutoXec runs a headless CMS (Sanity) to deliver high-quality editorial content dynamically.

### What it does

- **`article`** documents hold full posts (title, slug, body paragraphs, images, categories, etc.).
- **`homePage`** and **`siteConfig`** documents configure the layouts: ticker, hero carousel, quick reads, trending rows, and precise Typography configs.
- The React app fetches data from the **public Sanity Edge API**. 

### CMS Setup

1. Put your Sanity ID in **`studio/project.ts`** and `.env` (`VITE_SANITY_PROJECT_ID`).
2. Run `npm install` inside the `/studio` directory.
3. Start the CMS editor locally: `npm run studio`.
4. Ensure content is properly structured before reloading the React app.

### Deployment & Resilience

- **Zero-Downtime Fallbacks**: Instead of legacy static JSON files, the app now leverages local browser caching. Each time `fetchSite.ts` successfully pulls from Sanity, the payload is cached. If connectivity drops or Sanity experiences an outage, that cache is served to ensure uninterrupted reading.
- **Production Errors**: If `localStorage` is empty *and* Sanity fails, an explicit `[ SYSTEM OFFLINE ]` Error Boundary restricts the UI from crashing natively.

---

## 🔥 Extending & Customizing

### Component Strategy

*   **Atomic Design**: Components like `ArticleCard` and `SocialIcons` are purely presentational.
*   **State Management**: `SiteDataContext.tsx` holds the monolithic state from the CMS. Avoid prop-drilling by importing `useSiteData()` in your pages.
*   **Aesthetics**: All styling values are managed via CSS Custom Properties (`:root`) in `index.css`. The CMS injects Font Family, Line Height, and Spacing dynamically from the Global Site Config.

### Authentication (Firebase Integration)

The application handles newsletter subscriptions and upcoming community management via **Firebase/Firestore**.

*   `/subscribe` forms send data directly to Firestore (`intelligence_brief_subscribers`).
*   Ensure your `firestore.rules` are configured to prevent unauthorised reads while allowing public `create` operations.

---

## 🛠️ CLI Tools & Quality Checks

```bash
npm run build      # Strict TypeScript checking + production VITE bundle
npm run preview    # Serve the ./dist folder locally
npm run studio     # Spin up Sanity Desk
cd studio && npx sanity schema validate  # CMS Schema CI validation
```
