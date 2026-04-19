import {
  type Article,
  type HeroSideItem,
  type HeroSlide,
  type StoryCard,
  type TrendingRow,
} from '../../types'
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
import { allArticlesQuery, siteConfigQuery, allCategoriesQuery, allQuickReadsQuery } from './queries'

export type DynamicRow = {
  slug: string
  title: string
  description?: string
  badgeClass?: string
  accentColor?: string
  barColor?: string
  articles: Article[]
}

export type NavigationItem = {
  title: string
  type: 'path' | 'category' | 'dropdown'
  path?: string
  categorySlug?: string
  dropdownItems?: { slug: string; title: string }[]
}

export type SiteContent = {
  navigation: NavigationItem[]
  typographyConfig: {
    fontFamily: string
    lineHeight: number
    letterSpacing: number
  }
  source: 'sanity' | 'cache'
  categories: RawDynamicCategory[]
  articles: Article[]
  heroSlides: HeroSlide[]
  heroSide: HeroSideItem[]
  stories: StoryCard[]
  tickerItems: readonly string[] | string[]
  trending: TrendingRow[]
  topics: readonly string[] | string[]
  latestStoriesLimit: number
  categoryPageLimit: number
  topDynamicRows: DynamicRow[]
  bottomDynamicRows: DynamicRow[]
  filterCounts: Record<string, number>
}

const CACHE_KEY = 'autoxec_content_cache'

export function getCachedSiteContent(): SiteContent | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      const parsed = JSON.parse(cached)
      return { ...parsed, source: 'cache' } as SiteContent
    }
  } catch (e) {
    console.error('[Sanity] Failed to parse cache:', e)
  }
  return null
}

export function setCachedSiteContent(content: SiteContent) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(content))
  } catch (e) {
    console.warn('[Sanity] Failed to save cache:', e)
  }
}

export async function loadSiteContent(): Promise<SiteContent> {
  if (!isSanityConfigured()) {
    const cached = getCachedSiteContent()
    if (cached) return cached
    throw new Error('Sanity is not configured and no cache is available.')
  }

  try {
    const client = getSanityClient()
    const [rawArticles, rawQuickReads, siteConfig, allCategories] = await Promise.all([
      client.fetch<RawArticle[]>(allArticlesQuery),
      client.fetch<RawArticle[]>(allQuickReadsQuery),
      client.fetch<RawSiteConfig>(siteConfigQuery),
      client.fetch<RawDynamicCategory[]>(allCategoriesQuery),
    ])
    
    const articlesFromCms = rawArticles.map(mapRawToArticle).filter((a): a is Article => a !== null)
    const articles = articlesFromCms

    const quickReadsFromCms = rawQuickReads.map(mapRawToArticle).filter((a): a is Article => a !== null)
    const quickReads = quickReadsFromCms

    // 1. HERO SLIDES
    const heroStrategy = siteConfig?.heroConfig?.strategy || 'latest'
    const heroManual = siteConfig?.heroConfig?.manualArticles
    const resolvedHeroArticles = resolveStrategyArticles(articles, heroStrategy, heroManual, undefined, 5)
    // Always provide at least one hero slide or a default to prevent UI crashes if DB is completely empty
    const heroSlides = resolvedHeroArticles.length > 0 ? resolvedHeroArticles.map(articleToHeroSlide) : []

    // 2. HERO SIDE
    const heroSideStrategy = siteConfig?.heroSideConfig?.strategy || 'latest'
    const heroSideManual = siteConfig?.heroSideConfig?.manualArticles
    const heroSideLimit = siteConfig?.heroSideConfig?.limit || 3
    const resolvedHeroSideArticles = resolveStrategyArticles(articles, heroSideStrategy, heroSideManual, undefined, heroSideLimit)
    const heroSide = resolvedHeroSideArticles.map(a => {
      const k = a.upvotes >= 1000 ? `${(a.upvotes / 1000).toFixed(1)}K` : String(a.upvotes)
      return {
        slug: a.slug,
        cat: a.badge as HeroSideItem['cat'],
        catClass: a.badgeClass as HeroSideItem['catClass'],
        title: a.title,
        meta: `5 MIN · ${k} ↑`,
        imageUrl: a.imageUrl || '',
      } as HeroSideItem
    })

    // 3. QUICK READS / STORIES
    const qrStrategy = siteConfig?.quickReadsConfig?.strategy || 'latest'
    const qrManual = siteConfig?.quickReadsConfig?.manualArticles
    const qrLimit = siteConfig?.quickReadsConfig?.limit || 8
    
    const resolvedQrArticles = resolveStrategyArticles(quickReads, qrStrategy, qrManual, undefined, qrLimit)
    const stories = generateStories(resolvedQrArticles, qrStrategy, qrManual, qrLimit)

    // 4. TRENDING
    const trendingStrategy = siteConfig?.trendingConfig?.strategy || 'popular'
    const trendingManual = siteConfig?.trendingConfig?.manualArticles
    const trendingLimit = siteConfig?.trendingConfig?.limit || 5
    const trending = generateTrending(articles, trendingStrategy, trendingManual, trendingLimit)

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

    const filterCounts = generateFilterCounts(articles)

    const tickerItems = siteConfig?.tickerItems && siteConfig.tickerItems.length > 0
      ? siteConfig.tickerItems
      : []
      
    const topics = siteConfig?.exploreTopics && siteConfig.exploreTopics.length > 0
      ? siteConfig.exploreTopics
      : []
      
    const latestStoriesLimit = siteConfig?.latestStoriesLimit || 6
    const categoryPageLimit = siteConfig?.categoryPageLimit || 9

    const typographyConfig = {
      fontFamily: siteConfig?.typographyConfig?.fontFamily || "'Barlow', sans-serif",
      lineHeight: siteConfig?.typographyConfig?.lineHeight || 1.6,
      letterSpacing: siteConfig?.typographyConfig?.letterSpacing || 0,
    }

    const navigation: NavigationItem[] = []
    if (siteConfig?.navigation && siteConfig.navigation.length > 0) {
      for (const item of siteConfig.navigation) {
        if (item.linkType === 'path') {
          navigation.push({ title: item.title, type: 'path', path: item.path })
        } else if (item.linkType === 'category' && item.category) {
          navigation.push({ title: item.title, type: 'category', categorySlug: item.category.slug })
        } else if (item.linkType === 'dropdown') {
          navigation.push({
            title: item.title,
            type: 'dropdown',
            dropdownItems: (item.dropdownItems || []).map(c => ({ slug: c.slug, title: c.title }))
          })
        }
      }
    }

    // Expose quickreads down into the articles list so ArticlePage can route them 
    const allMergedArticles = [...articles, ...quickReads]

    const content: SiteContent = {
      source: 'sanity',
      navigation,
      typographyConfig,
      categories: allCategories,
      articles: allMergedArticles,
      heroSlides,
      heroSide,
      stories,
      tickerItems,
      trending,
      topics,
      latestStoriesLimit,
      categoryPageLimit,
      topDynamicRows,
      bottomDynamicRows,
      filterCounts,
    }
    
    // Save to Cache for Fallback
    setCachedSiteContent(content)

    return content
  } catch (e) {
    console.error('[Sanity] Data load failed:', e)
    const cached = getCachedSiteContent()
    if (cached) return cached
    throw new Error('Failed to load site content and no cache is available.')
  }
}
