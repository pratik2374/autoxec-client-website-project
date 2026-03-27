import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { getFirestoreDb } from './config'

export const NEWSLETTER_COLLECTION = 'intelligence_brief_subscribers'

export type NewsletterSignupSource = 'subscribe_page' | 'sidebar'

export type NewsletterSignupPayload = {
  firstName: string
  email: string
  role: string
  privacyAccepted: boolean
  /** Where the user signed up (stored in Firestore for segmentation). */
  source?: NewsletterSignupSource
}

/**
 * Persists a newsletter signup to Cloud Firestore.
 * Ensure Firestore rules allow `create` on `intelligence_brief_subscribers` for your deployment model
 * (often: authenticated writes only, or App Check + strict validation — open client writes are spam-prone).
 */
export async function saveNewsletterSignup(payload: NewsletterSignupPayload): Promise<void> {
  const db = getFirestoreDb()
  const source: NewsletterSignupSource = payload.source ?? 'subscribe_page'
  await addDoc(collection(db, NEWSLETTER_COLLECTION), {
    firstName: payload.firstName.trim(),
    email: payload.email.trim().toLowerCase(),
    role: payload.role.trim(),
    privacyAccepted: payload.privacyAccepted,
    source,
    createdAt: serverTimestamp(),
  })
}
