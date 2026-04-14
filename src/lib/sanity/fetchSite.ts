import {
  ARTICLES as STATIC_ARTICLES,
  FILTER_COUNTS as STATIC_FILTER_COUNTS,
  HERO_MAIN,
  HERO_SIDE as STATIC_HERO_SIDE,
  HERO_SLIDES as STATIC_HERO_SLIDES,
  STORIES as STATIC_STORIES,
  TICKER_ITEMS as STATIC_TICKER,
  TRENDING as STATIC_TRENDING,
  TOPICS as STATIC_TOPICS,
  type Article,
  type HeroSideItem,
  type HeroSlide,
  type StoryCard,
  type TrendingRow,
  buildStubPool,
} from '../../data'
import { getSanityClient } from './client'
import { isSanityConfigured } from './config'
import {
  mapRawToArticle,
  articleToHeroSlide,
  resolveStrategyArticles,
  generateStories,
  generateTrending,
  generateFilterCounts,
  type RawArticle,
  type RawSiteConfig,
  type RawDynamicCategory,
} from './map'
import { allArticlesQuery, siteConfigQuery, allCategoriesQuery } from './queries'

export type DynamicRow = {
  slug: string
  title: string
  description?: string
  badgeClass?: string
  accentColor?: string
  barColor?: string
  articles: Article[]
}

export type SiteContent = {
  source: 'sanity' | 'static'
  categories: RawDynamicCategory[]
  articles: Article[]
  heroSlides: HeroSlide[]
  heroSide: HeroSideItem[]
  stories: StoryCard[]
  tickerItems: readonly string[] | string[]
  trending: TrendingRow[]
  topics: readonly string[] | string[]
  latestStoriesLimit: number
  topDynamicRows: DynamicRow[]
  bottomDynamicRows: DynamicRow[]
  filterCounts: Record<string, number>
  stubPool: Article[]
}

export function getStaticSiteSnapshot(): SiteContent {
  const stubPool = buildStubPool({
    heroMain: HERO_MAIN,
    heroSide: STATIC_HERO_SIDE,
    stories: STATIC_STORIES,
    evMini: [],
    engMini: [],
  })
  return {
    source: 'static',
    categories: [],
    articles: STATIC_ARTICLES,
    heroSlides: [...STATIC_HERO_SLIDES],
    heroSide: [...STATIC_HERO_SIDE],
    stories: [...STATIC_STORIES],
    tickerItems: STATIC_TICKER,
    trending: [...STATIC_TRENDING],
    topics: STATIC_TOPICS,
    latestStoriesLimit: 6,
    topDynamicRows: [],
    bottomDynamicRows: [],
    filterCounts: { ...STATIC_FILTER_COUNTS },
    stubPool,
  }
}

export async function loadSiteContent(): Promise<SiteContent> {
  if (!isSanityConfigured()) {
    return getStaticSiteSnapshot()
  }

  try {
    const client = getSanityClient()
    const [rawArticles, siteConfig, allCategories] = await Promise.all([
      client.fetch<RawArticle[]>(allArticlesQuery),
      client.fetch<RawSiteConfig>(siteConfigQuery),
      client.fetch<RawDynamicCategory[]>(allCategoriesQuery),
    ])
    
    const articlesFromCms = rawArticles.map(mapRawToArticle).filter((a): a is Article => a !== null)
    const articles = articlesFromCms.length > 0 ? articlesFromCms : STATIC_ARTICLES

    // 1. HERO SLIDES
    const heroStrategy = siteConfig?.heroConfig?.strategy || 'latest'
    const heroManual = siteConfig?.heroConfig?.manualArticles
    const resolvedHeroArticles = resolveStrategyArticles(articles, heroStrategy, heroManual, undefined, 5)
    const heroSlides = resolvedHeroArticles.length > 0 ? resolvedHeroArticles.map(articleToHeroSlide) : [...STATIC_HERO_SLIDES]

    // 2. HERO SIDE
    const heroSideStrategy = siteConfig?.heroSideConfig?.strategy || 'latest' // Default for hero side historically was latest/popular? popular was hardcoded before
    const heroSideManual = siteConfig?.heroSideConfig?.manualArticles
    const heroSideLimit = siteConfig?.heroSideConfig?.limit || 3
    const resolvedHeroSideArticles = resolveStrategyArticles(articles, heroSideStrategy, heroSideManual, undefined, heroSideLimit)
    const heroSide = resolvedHeroSideArticles.length > 0 ? resolvedHeroSideArticles.map(a => {
      const k = a.upvotes >= 1000 ? `${(a.upvotes / 1000).toFixed(1)}K` : String(a.upvotes)
      return {
        slug: a.slug,
        cat: a.badge as HeroSideItem['cat'],
        catClass: a.badgeClass as HeroSideItem['catClass'],
        title: a.title,
        meta: `5 MIN · ${k} ↑`,
        imageUrl: a.imageUrl || '',
      } as HeroSideItem
    }) : [...STATIC_HERO_SIDE]

    // 3. QUICK READS / STORIES
    const qrStrategy = siteConfig?.quickReadsConfig?.strategy || 'latest'
    const qrManual = siteConfig?.quickReadsConfig?.manualArticles
    const qrLimit = siteConfig?.quickReadsConfig?.limit || 8
    const resolvedQrArticles = resolveStrategyArticles(articles, qrStrategy, qrManual, undefined, qrLimit)
    const stories = resolvedQrArticles.length > 0 ? generateStories(resolvedQrArticles, qrStrategy, qrManual, qrLimit) : [...STATIC_STORIES]

    // 4. TRENDING
    const trendingStrategy = siteConfig?.trendingConfig?.strategy || 'popular'
    const trendingManual = siteConfig?.trendingConfig?.manualArticles
    const trendingLimit = siteConfig?.trendingConfig?.limit || 5
    const trending = articlesFromCms.length > 0 ? generateTrending(articles, trendingStrategy, trendingManual, trendingLimit) : [...STATIC_TRENDING]

    // 5. TOP DYNAMIC ROWS
    const topDynamicRows: DynamicRow[] = []
    if (siteConfig?.topCategoryRows) {
      for (const row of siteConfig.topCategoryRows) {
        if (!row.category) continue
        const limit = row.limit || 3
        const rowArticles = resolveStrategyArticles(articles, row.strategy, row.manualArticles, row.category.slug, limit)
        topDynamicRows.push({
          slug: row.category.slug,
          title: row.category.title,
          description: row.category.description,
          badgeClass: row.category.badgeClass,
          accentColor: row.category.accentColor || '#B48FE8',
          barColor: row.category.barColor || '#6B3FA0',
          articles: rowArticles
        })
      }
    }

    // 6. BOTTOM DYNAMIC ROWS
    const bottomDynamicRows: DynamicRow[] = []
    if (siteConfig?.bottomCategoryRows) {
      for (const row of siteConfig.bottomCategoryRows) {
        if (!row.category) continue
        const limit = row.limit || 3
        const rowArticles = resolveStrategyArticles(articles, row.strategy, row.manualArticles, row.category.slug, limit)
        bottomDynamicRows.push({
          slug: row.category.slug,
          title: row.category.title,
          description: row.category.description,
          badgeClass: row.category.badgeClass,
          accentColor: row.category.accentColor || '#B48FE8',
          barColor: row.category.barColor || '#6B3FA0',
          articles: rowArticles
        })
      }
    }

    const filterCounts = articlesFromCms.length > 0 ? generateFilterCounts(articles) : { ...STATIC_FILTER_COUNTS }

    const tickerItems = siteConfig?.tickerItems && siteConfig.tickerItems.length > 0
      ? siteConfig.tickerItems
      : [...STATIC_TICKER]
      
    const topics = siteConfig?.exploreTopics && siteConfig.exploreTopics.length > 0
      ? siteConfig.exploreTopics
      : [...STATIC_TOPICS]
      
    const latestStoriesLimit = siteConfig?.latestStoriesLimit || 6

    const stubPool = buildStubPool({
      heroMain: heroSlides[0] ?? HERO_MAIN,
      heroSide,
      stories,
      evMini: [],
      engMini: [],
    })

    return {
      source: 'sanity',
      categories: allCategories,
      articles,
      heroSlides,
      heroSide,
      stories,
      tickerItems,
      trending,
      topics,
      latestStoriesLimit,
      topDynamicRows,
      bottomDynamicRows,
      filterCounts,
      stubPool,
    }
  } catch (e) {
    console.warn('[Sanity] Falling back to static content:', e)
    return getStaticSiteSnapshot()
  }
}
