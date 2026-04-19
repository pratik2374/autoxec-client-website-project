import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Article } from '../types'
import { loadSiteContent, type SiteContent, getCachedSiteContent } from '../lib/sanity/fetchSite'
import { LoadingScreen } from '../components/LoadingScreen'

const SiteDataContext = createContext<SiteContent | null>(null)
const SiteLoadingContext = createContext<boolean>(true)

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteContent | null>(() => getCachedSiteContent())
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false
    void loadSiteContent()
      .then((next) => {
        if (!cancelled) {
          setData(next)
          setIsLoading(false)
          setError(null)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          if (!data) setError(err instanceof Error ? err : new Error('Failed to load site content'))
          setIsLoading(false)
        }
      })
    return () => {
      cancelled = true
    }
  }, []) // We purposely don't track 'data' here to avoid re-renders

  if (error && !data) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#08060F', color: '#fff', flexDirection: 'column' }}>
        <div style={{ padding: '40px', border: '1px solid #2A1F45', borderRadius: '12px', backgroundColor: '#110D1E', maxWidth: '600px', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'monospace', color: '#C0000A', fontSize: 24, marginBottom: 16 }}>[ SYSTEM OFFLINE ]</h1>
          <p style={{ fontFamily: 'sans-serif', color: '#9B8EC4', lineHeight: 1.6, marginBottom: 24 }}>
            The AutoXec knowledge base is temporarily offline. We are unable to establish a connection to the central CMS or retrieve intelligent cached data.
          </p>
          <div style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--muted)', background: '#08060F', padding: '12px', borderRadius: '6px' }}>
            ERR_CODE: {error.message.toUpperCase()}
          </div>
          <button 
            onClick={() => window.location.reload()} 
            style={{ marginTop: 24, padding: '12px 24px', background: '#C0000A', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            RETRY CONNECTION
          </button>
        </div>
      </div>
    )
  }

  // Before data is loaded, and no cache implies data = null
  if (!data) {
    // We return nothing (or just the provider with null) but if we return null here, App won't render.
    // However, App needs to render `<LoadingScreen />`. We can just render LoadingScreen directly here if data is null
    // But since LoadingScreen is in components, let's keep it simple: 
    // We must render SiteLoadingContext with `true` and the children, BUT App expects useSiteData to not be null.
    // So we can provide a dummy SiteContent just for the loading phase to avoid crashes, OR we bypass App until we have data.
    return <LoadingScreen />
  }

  return (
    <SiteLoadingContext.Provider value={isLoading}>
      <SiteDataContext.Provider value={data}>{children}</SiteDataContext.Provider>
    </SiteLoadingContext.Provider>
  )
}

export function useSiteData(): SiteContent {
  const v = useContext(SiteDataContext)
  if (!v) {
    throw new Error('useSiteData must be used within SiteDataProvider')
  }
  return v
}

export function useIsDataLoading(): boolean {
  return useContext(SiteLoadingContext)
}

export function useArticleBySlug(slug: string | undefined): Article | undefined {
  const { articles } = useSiteData()
  return useMemo(() => {
    if (!slug) return undefined
    return articles.find((a) => a.slug === slug)
  }, [slug, articles])
}

export function useAllArticlesMerged(): Article[] {
  const { articles } = useSiteData()
  return articles
}

export function useArticlesInCategory(cat: string): Article[] {
  const { articles } = useSiteData()
  return useMemo(() => articles.filter((a) => a.cat === cat), [cat, articles])
}

export function useArticlesInCategoryOrEmpty(cat: string | null): Article[] {
  const { articles } = useSiteData()
  return useMemo(() => {
    if (!cat) return []
    return articles.filter((a) => a.cat === cat)
  }, [cat, articles])
}

export function useFilterCount(id: string): number {
  return useSiteData().filterCounts[id] || 0
}
