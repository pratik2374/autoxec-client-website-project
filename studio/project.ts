/**
 * Sanity API project + dataset for this repo.
 * Studio: env vars `SANITY_STUDIO_PROJECT_ID` / `SANITY_STUDIO_DATASET` override these when the CLI injects them.
 * Website uses `VITE_SANITY_*` in the root `.env` — keep the project id in sync.
 */
export const apiProjectId = (process.env.SANITY_STUDIO_PROJECT_ID || 'dgew98n9').trim()
export const apiDataset = (process.env.SANITY_STUDIO_DATASET || 'production').trim()
