const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined
const dataset = (import.meta.env.VITE_SANITY_DATASET as string | undefined) || 'production'
const apiVersion = (import.meta.env.VITE_SANITY_API_VERSION as string | undefined) || '2024-01-01'

export const sanityEnv = {
  projectId: projectId || '',
  dataset,
  apiVersion,
  useCdn: import.meta.env.PROD,
}

export function isSanityConfigured(): boolean {
  return Boolean(sanityEnv.projectId && sanityEnv.projectId !== 'undefined')
}
