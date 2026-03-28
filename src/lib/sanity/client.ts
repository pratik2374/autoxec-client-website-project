import { createClient, type SanityClient } from '@sanity/client'
import { isSanityConfigured, sanityEnv } from './config'

let client: SanityClient | null = null

export function getSanityClient(): SanityClient {
  if (!isSanityConfigured()) {
    throw new Error('Sanity is not configured. Set VITE_SANITY_PROJECT_ID in .env')
  }
  if (!client) {
    client = createClient({
      projectId: sanityEnv.projectId,
      dataset: sanityEnv.dataset,
      apiVersion: sanityEnv.apiVersion,
      useCdn: sanityEnv.useCdn,
    })
  }
  return client
}
