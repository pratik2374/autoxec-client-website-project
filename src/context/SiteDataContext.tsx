import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  findArticleOrStubWith,
  allArticlesMergedFrom,
  articlesInCategoryFrom,
  type Article,
  type ArticleCategory,
  type NavCategory,
} from '../data'
import { getStaticSiteSnapshot, loadSiteContent, type SiteContent } from '../lib/sanity/fetchSite'

const SiteDataContext = createContext<SiteContent | null>(null)

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteContent>(() => getStaticSiteSnapshot())

  useEffect(() => {
    let cancelled = false
    void loadSiteContent().then((next) => {
      if (!cancelled) setData(next)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return <SiteDataContext.Provider value={data}>{children}</SiteDataContext.Provider>
}

export function useSiteData(): SiteContent {
  const v = useContext(SiteDataContext)
  if (!v) {
    throw new Error('useSiteData must be used within SiteDataProvider')
  }
  return v
}

export function useArticleBySlug(slug: string | undefined): Article | undefined {
  const { articles, stubPool } = useSiteData()
  return useMemo(() => {
    if (!slug) return undefined
    return findArticleOrStubWith(slug, articles, stubPool)
  }, [slug, articles, stubPool])
}

export function useAllArticlesMerged(): Article[] {
  const { articles, stubPool } = useSiteData()
  return useMemo(() => allArticlesMergedFrom(articles, stubPool), [articles, stubPool])
}

export function useArticlesInCategory(cat: NavCategory): Article[] {
  const { articles, stubPool } = useSiteData()
  return useMemo(
    () => articlesInCategoryFrom(cat, articles, stubPool),
    [cat, articles, stubPool],
  )
}

/** Safe when route category is not resolved yet (`null`). */
export function useArticlesInCategoryOrEmpty(cat: NavCategory | null): Article[] {
  const { articles, stubPool } = useSiteData()
  return useMemo(() => {
    if (!cat) return []
    return articlesInCategoryFrom(cat, articles, stubPool)
  }, [cat, articles, stubPool])
}

export function useFilterCount(id: ArticleCategory): number {
  return useSiteData().filterCounts[id]
}
