import type {
  Article,
  ArticleCategory,
  EngMiniCard,
  EvMiniCard,
  HeroCategoryPath,
  HeroSideItem,
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
  deck?: string
  bodyParagraphs?: string[]
  keyTakeaways?: string[]
  tags?: string[]
  upvotes?: number
  readTime?: string
  meta?: string
  thumbLabel?: string
  thumbGradient?: string
  imageUrl?: string
  mainImage?: Parameters<typeof urlForImage>[0]
  deepDive?: boolean
  published?: string
  updated?: string
  heroCategoryLabel?: string
  heroAuthorLine?: string
  heroUpvotesLabel?: string
}

const CAT_SET = new Set<Article['cat']>(['ev', 'launch', 'engineering', 'motorsport', 'twowheeler', 'industry'])

function asCat(v: string | undefined): Article['cat'] {
  const c = (v || 'engineering').toLowerCase()
  if (c === 'launches') return 'launch'
  if (CAT_SET.has(c as Article['cat'])) return c as Article['cat']
  return 'engineering'
}

const BADGE: Record<Article['cat'], Article['badgeClass']> = {
  ev: 'ev',
  launch: 'launch',
  engineering: 'engineering',
  motorsport: 'motorsport',
  twowheeler: 'twowheeler',
  industry: 'industry',
}

export function mapRawToArticle(raw: RawArticle): Article | null {
  const slug = raw.slug?.trim()
  if (!slug || !raw.title) return null
  const cat = asCat(raw.cat)
  const img = urlForImage(raw.mainImage)
  return {
    id: raw._id,
    slug,
    cat,
    badge: raw.badge || cat.toUpperCase(),
    badgeClass: (raw.badgeClass as Article['badgeClass']) || BADGE[cat],
    title: raw.title,
    excerpt: raw.excerpt || '',
    deck: raw.deck,
    bodyParagraphs: raw.bodyParagraphs,
    keyTakeaways: raw.keyTakeaways,
    tags: raw.tags,
    upvotes: typeof raw.upvotes === 'number' ? raw.upvotes : 0,
    readTime: raw.readTime || '5 MIN READ',
    meta: raw.meta || 'PREETAM · AUTOXEC',
    thumbLabel: raw.thumbLabel || 'AX',
    thumbGradient: raw.thumbGradient || 'linear-gradient(135deg,#1a0f30,#2d1060)',
    imageUrl: img || raw.imageUrl,
    deepDive: raw.deepDive,
    published: raw.published,
    updated: raw.updated,
  }
}

function formatHeroUpvotes(n: number, override?: string): string {
  if (override?.trim()) return override.trim()
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K UPVOTES`
  return `${n} UPVOTES`
}

export function articleToHeroSlide(a: Article, raw?: RawArticle): HeroSlide {
  const cat = a.cat as NavCategory
  const path = categoryToPathSlug(cat) as HeroCategoryPath
  const categoryClass = a.badgeClass
  return {
    slug: a.slug,
    category: raw?.heroCategoryLabel?.trim() || a.badge,
    categoryClass,
    categoryPath: path,
    title: a.title,
    author: raw?.heroAuthorLine?.trim() || 'PREETAM · AUTOXEC',
    readTime: a.readTime,
    upvotes: formatHeroUpvotes(a.upvotes, raw?.heroUpvotesLabel),
    imageUrl: a.imageUrl || '',
    imageAlt: a.title,
  }
}

export type RawStory = {
  slug?: string
  icon?: string
  title?: string
  meta?: string
  gradient?: string
  imageUrl?: string
}

export type RawTrend = { num?: string; slug?: string; title?: string; meta?: string }

export type RawMini = { slug?: string; title?: string; meta?: string; imageUrl?: string }

export type RawHomePage = {
  ticker?: string[]
  heroSlideArticles?: RawArticle[] | null
  heroSideArticles?: RawArticle[] | null
  stories?: RawStory[] | null
  trending?: RawTrend[] | null
  topics?: string[] | null
  evMini?: RawMini[] | null
  engMini?: RawMini[] | null
  filterCounts?: Partial<Record<ArticleCategory, number>> | null
}

export function mapSanityHomeToHeroSlides(articles: RawArticle[] | null | undefined): HeroSlide[] {
  if (!articles?.length) return []
  const out: HeroSlide[] = []
  for (const r of articles) {
    const a = mapRawToArticle(r)
    if (a) out.push(articleToHeroSlide(a, r))
  }
  return out
}

function formatSideMeta(a: Article): string {
  const rt = a.readTime.replace(/\s*READ\s*/i, '').trim()
  const k = a.upvotes >= 1000 ? `${(a.upvotes / 1000).toFixed(1)}K` : String(a.upvotes)
  return `${rt} · ${k} ↑`
}

export function mapArticlesToHeroSide(articles: RawArticle[] | null | undefined): HeroSideItem[] {
  const rows: HeroSideItem[] = []
  if (!articles?.length) return rows
  for (const r of articles) {
    const a = mapRawToArticle(r)
    if (!a) continue
    rows.push({
      slug: a.slug,
      cat: a.badge as HeroSideItem['cat'],
      catClass: a.badgeClass as HeroSideItem['catClass'],
      title: a.title,
      meta: formatSideMeta(a),
      imageUrl: a.imageUrl || '',
    } as HeroSideItem)
  }
  return rows
}

export function mapRawStories(raw: RawStory[] | null | undefined): StoryCard[] {
  if (!raw?.length) return []
  return raw.map((s, i) => ({
    slug: s.slug?.trim() || `story-${i}`,
    icon: s.icon?.trim() || '▸',
    title: s.title || 'Untitled',
    meta: s.meta || '',
    gradient: s.gradient || 'linear-gradient(135deg,#1a0a30,#3d1a7a)',
    imageUrl: s.imageUrl || '',
  })) as StoryCard[]
}

export function mapRawTrending(raw: RawTrend[] | null | undefined): TrendingRow[] {
  if (!raw?.length) return []
  return raw.map((t, i) => ({
    num: t.num || String(i + 1).padStart(2, '0'),
    slug: t.slug || '',
    title: t.title || '',
    meta: t.meta || '',
  })) as TrendingRow[]
}

export function mapRawEvMini(raw: RawMini[] | null | undefined): EvMiniCard[] {
  if (!raw?.length) return []
  return raw.map((m, i) => ({
    slug: m.slug?.trim() || `ev-${i}`,
    title: m.title || '',
    meta: m.meta || '',
    imageUrl: m.imageUrl || '',
  })) as EvMiniCard[]
}

export function mapRawEngMini(raw: RawMini[] | null | undefined): EngMiniCard[] {
  if (!raw?.length) return []
  return raw.map((m, i) => ({
    slug: m.slug?.trim() || `eng-${i}`,
    title: m.title || '',
    meta: m.meta || '',
    imageUrl: m.imageUrl || '',
  })) as EngMiniCard[]
}

export function mergeFilterCounts(
  partial: Partial<Record<ArticleCategory, number>> | null | undefined,
  defaults: Record<ArticleCategory, number>,
): Record<ArticleCategory, number> {
  return { ...defaults, ...partial }
}
