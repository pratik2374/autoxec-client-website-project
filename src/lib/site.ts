
export function categoryToPathSlug(cat: string): string {
  const m: Record<string, string> = {
    ev: 'ev',
    launch: 'launches',
    twowheeler: 'two-wheelers',
  }
  return m[cat] ?? cat
}

export function pathSlugToCategory(slug: string): string {
  const m: Record<string, string> = {
    ev: 'ev',
    launches: 'launch',
    'two-wheelers': 'twowheeler',
  }
  return m[slug] ?? slug
}

export function categoryToQueryValue(cat: string): string | null {
  if (cat === 'all') return null
  return categoryToPathSlug(cat)
}

export function queryValueToCategory(value: string | null): string {
  if (!value) return 'all'
  return pathSlugToCategory(value)
}

export function articleUrl(slug: string): string {
  return `/article/${slug}`
}

export function quickReadUrl(slug: string): string {
  return `/quick-read/${slug}`
}
