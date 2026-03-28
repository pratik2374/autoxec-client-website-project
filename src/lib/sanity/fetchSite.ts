import {
  ARTICLES as STATIC_ARTICLES,
  ENG_MINI as STATIC_ENG_MINI,
  EV_MINI as STATIC_EV_MINI,
  FILTER_COUNTS as STATIC_FILTER_COUNTS,
  HERO_MAIN,
  HERO_SIDE as STATIC_HERO_SIDE,
  HERO_SLIDES as STATIC_HERO_SLIDES,
  STORIES as STATIC_STORIES,
  TICKER_ITEMS as STATIC_TICKER,
  TRENDING as STATIC_TRENDING,
  TOPICS as STATIC_TOPICS,
  type Article,
  type ArticleCategory,
  type EngMiniCard,
  type EvMiniCard,
  type HeroSideItem,
  type HeroSlide,
  type StoryCard,
  type TrendingRow,
  buildStubPool,
} from '../../data'
import { getSanityClient } from './client'
import { isSanityConfigured } from './config'
import {
  mapArticlesToHeroSide,
  mapRawEngMini,
  mapRawEvMini,
  mapRawStories,
  mapRawToArticle,
  mapRawTrending,
  mapSanityHomeToHeroSlides,
  mergeFilterCounts,
  type RawArticle,
  type RawHomePage,
} from './map'
import { allArticlesQuery, homePageQuery } from './queries'

export type SiteContent = {
  source: 'sanity' | 'static'
  articles: Article[]
  heroSlides: HeroSlide[]
  heroSide: HeroSideItem[]
  stories: StoryCard[]
  tickerItems: readonly string[] | string[]
  trending: TrendingRow[]
  topics: readonly string[] | string[]
  evMini: EvMiniCard[]
  engMini: EngMiniCard[]
  filterCounts: Record<ArticleCategory, number>
  stubPool: Article[]
}

/** Synchronous snapshot (embedded data only). Used as initial UI state before Sanity fetch completes. */
export function getStaticSiteSnapshot(): SiteContent {
  const stubPool = buildStubPool({
    heroMain: HERO_MAIN,
    heroSide: STATIC_HERO_SIDE,
    stories: STATIC_STORIES,
    evMini: STATIC_EV_MINI,
    engMini: STATIC_ENG_MINI,
  })
  return {
    source: 'static',
    articles: STATIC_ARTICLES,
    heroSlides: [...STATIC_HERO_SLIDES],
    heroSide: [...STATIC_HERO_SIDE],
    stories: [...STATIC_STORIES],
    tickerItems: STATIC_TICKER,
    trending: [...STATIC_TRENDING],
    topics: STATIC_TOPICS,
    evMini: [...STATIC_EV_MINI],
    engMini: [...STATIC_ENG_MINI],
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
    const [home, rawArticles] = await Promise.all([
      client.fetch<RawHomePage | null>(homePageQuery),
      client.fetch<RawArticle[]>(allArticlesQuery),
    ])

    const articlesFromCms = rawArticles.map(mapRawToArticle).filter((a): a is Article => a !== null)

    const articles = articlesFromCms.length > 0 ? articlesFromCms : STATIC_ARTICLES

    const heroSlides =
      home?.heroSlideArticles?.length ? mapSanityHomeToHeroSlides(home.heroSlideArticles) : [...STATIC_HERO_SLIDES]

    const heroSide =
      home?.heroSideArticles?.length ? mapArticlesToHeroSide(home.heroSideArticles) : [...STATIC_HERO_SIDE]

    const stories =
      home?.stories?.length ? mapRawStories(home.stories) : [...STATIC_STORIES]

    const tickerItems = home?.ticker?.length ? home.ticker : [...STATIC_TICKER]

    const trending =
      home?.trending?.length ? mapRawTrending(home.trending) : [...STATIC_TRENDING]

    const topics = home?.topics?.length ? home.topics : [...STATIC_TOPICS]

    const evMini = home?.evMini?.length ? mapRawEvMini(home.evMini) : [...STATIC_EV_MINI]

    const engMini = home?.engMini?.length ? mapRawEngMini(home.engMini) : [...STATIC_ENG_MINI]

    const filterCounts = mergeFilterCounts(home?.filterCounts, STATIC_FILTER_COUNTS)

    const heroMain = heroSlides[0] ?? HERO_MAIN

    const stubPool = buildStubPool({
      heroMain,
      heroSide,
      stories,
      evMini,
      engMini,
    })

    return {
      source: 'sanity',
      articles,
      heroSlides,
      heroSide,
      stories,
      tickerItems,
      trending,
      topics,
      evMini,
      engMini,
      filterCounts,
      stubPool,
    }
  } catch (e) {
    console.warn('[Sanity] Falling back to static content:', e)
    return getStaticSiteSnapshot()
  }
}
