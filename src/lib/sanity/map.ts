import type {
  Article,
  HeroCategoryPath,
  HeroSlide,
  NavCategory,
  StoryCard,
  TrendingRow,
} from '../../data'
import { categoryToPathSlug } from '../site'
import { urlForImage } from './image'

export type RawArticle = {
  _id: string
  slug?: string
  cat?: string
  badge?: string
  badgeClass?: string
  title?: string
  excerpt?: string
  content?: any
  seoTitle?: string
  seoDescription?: string
  tags?: string[]
  upvotes?: number
  imageUrl?: string
  mainImage?: Parameters<typeof urlForImage>[0]
  published?: string
  _updatedAt?: string
  _createdAt?: string
}

export type RawDynamicCategory = {
  slug: string
  title: string
  description?: string
  badgeClass?: string
  accentColor?: string
  barColor?: string
}

export type RawCategoryRow = {
  category?: RawDynamicCategory
  strategy?: 'latest' | 'popular' | 'manual'
  limit?: number
  manualArticles?: RawArticle[]
}

export type RawSiteConfig = {
  tickerItems?: string[]
  exploreTopics?: string[]
  latestStoriesLimit?: number
  heroConfig?: { strategy?: 'latest' | 'popular' | 'manual', limit?: number, manualArticles?: RawArticle[] }
  heroSideConfig?: { strategy?: 'latest' | 'popular' | 'manual', limit?: number, manualArticles?: RawArticle[] }
  quickReadsConfig?: { strategy?: 'latest' | 'popular' | 'manual', limit?: number, manualArticles?: RawArticle[] }
  trendingConfig?: { strategy?: 'latest' | 'popular' | 'manual', limit?: number, manualArticles?: RawArticle[] }
  topCategoryRows?: RawCategoryRow[]
  bottomCategoryRows?: RawCategoryRow[]
}

function asCat(v: string | undefined): any {
  const c = (v || 'engineering').toLowerCase()
  if (c === 'launches') return 'launch'
  return c
}

function formatDate(isoString: string | undefined) {
  if (!isoString) return ''
  try {
    const d = new Date(isoString)
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  } catch (e) {
    return isoString
  }
}

export function mapRawToArticle(raw: RawArticle): Article | null {
  const slug = raw.slug?.trim()
  if (!slug || !raw.title) return null
  const cat = asCat(raw.cat)
  const img = urlForImage(raw.mainImage)
  
  const createdDate = raw.published || formatDate(raw._createdAt)
  
  return {
    id: raw._id,
    slug,
    cat,
    badge: raw.badge || cat.toUpperCase(),
    badgeClass: (raw.badgeClass as any) || cat,
    title: raw.title,
    excerpt: raw.excerpt || '',
    content: raw.content,
    seoTitle: raw.seoTitle,
    seoDescription: raw.seoDescription,
    tags: raw.tags || [],
    upvotes: typeof raw.upvotes === 'number' ? raw.upvotes : Math.floor(Math.random() * 500) + 500,
    readTime: '5 MIN READ',
    meta: 'PREETAM · AUTOXEC',
    thumbLabel: 'AX',
    thumbGradient: 'linear-gradient(135deg,#1a0f30,#2d1060)',
    imageUrl: img || raw.imageUrl,
    published: createdDate,
    updated: formatDate(raw._updatedAt),
  }
}

function formatHeroUpvotes(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K UPVOTES`
  return `${n} UPVOTES`
}

export function articleToHeroSlide(a: Article): HeroSlide {
  const cat = a.cat as NavCategory
  const path = categoryToPathSlug(cat) as HeroCategoryPath
  const categoryClass = a.badgeClass
  return {
    slug: a.slug,
    category: a.badge,
    categoryClass: categoryClass as HeroSlide['categoryClass'],
    categoryPath: path,
    title: a.title,
    author: 'PREETAM · AUTOXEC',
    readTime: a.readTime,
    upvotes: formatHeroUpvotes(a.upvotes || 500),
    imageUrl: a.imageUrl || '',
    imageAlt: a.title,
  }
}

// STRATEGY FUNCTION
export function resolveStrategyArticles(
  allArticles: Article[],
  strategy?: 'latest' | 'popular' | 'manual',
  manualRaw?: RawArticle[],
  filterCat?: string,
  limit: number = 5
): Article[] {
  if (strategy === 'manual' && manualRaw && manualRaw.length > 0) {
    return manualRaw.map(mapRawToArticle).filter((a): a is Article => a !== null).slice(0, limit)
  }

  let pool = [...allArticles]
  if (filterCat) {
    pool = pool.filter((a) => a.cat === filterCat)
  }

  if (strategy === 'popular') {
    pool.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0))
  } else {
    // Array is already sorted by latest natively by GROQ allArticlesQuery
  }

  return pool.slice(0, limit)
}

export function generateStories(articles: Article[], strategy?: 'latest' | 'popular' | 'manual', manualRaw?: RawArticle[], limit: number = 8): StoryCard[] {
  const selected = resolveStrategyArticles(articles, strategy, manualRaw, undefined, limit)
  return selected.map((a) => ({
    slug: a.slug,
    icon: '▸',
    title: a.title,
    meta: `${a.cat.toUpperCase()} · 3 MIN`,
    gradient: 'linear-gradient(135deg,#1a0a30,#3d1a7a)',
    imageUrl: a.imageUrl || '',
  }))
}

export function generateTrending(articles: Article[], strategy?: 'latest' | 'popular' | 'manual', manualRaw?: RawArticle[], limit: number = 5): TrendingRow[] {
  const selected = resolveStrategyArticles(articles, strategy || 'popular', manualRaw, undefined, limit)
  return selected.map((a, i) => {
    const k = a.upvotes >= 1000 ? `${(a.upvotes / 1000).toFixed(1)}K` : String(a.upvotes)
    return {
      num: String(i + 1).padStart(2, '0'),
      slug: a.slug,
      title: a.title,
      meta: `${k} ↑ · RECENT`,
    }
  })
}

export function generateFilterCounts(articles: Article[]): Record<string, number> {
  const counts: Record<string, number> = { all: articles.length }
  for (const a of articles) {
    const cat = a.cat as string
    counts[cat] = (counts[cat] || 0) + 1
  }
  return counts
}
