import imageUrlBuilder, { type SanityImageSource } from '@sanity/image-url'
import { sanityEnv } from './config'

const builder = imageUrlBuilder({
  projectId: sanityEnv.projectId || 'placeholder',
  dataset: sanityEnv.dataset,
})

export function urlForImage(source: SanityImageSource | null | undefined): string | undefined {
  if (!source || !sanityEnv.projectId) return undefined
  try {
    return builder.image(source).width(2000).quality(88).fit('max').auto('format').url()
  } catch {
    return undefined
  }
}
