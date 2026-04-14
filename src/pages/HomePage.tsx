import type { MouseEvent } from 'react'
import { useCallback, useMemo, useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArticleCard } from '../components/ArticleCard'
import { HeroCarousel } from '../components/HeroCarousel'
import { SidebarWidgets } from '../components/SidebarWidgets'
import type { ArticleCategory } from '../data'
import { useSiteData } from '../context/SiteDataContext'
import { useToast } from '../context/ToastContext'
import { articleUrl, categoryToQueryValue, queryValueToCategory } from '../lib/site'

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const showToast = useToast()
  const [upvoted, setUpvoted] = useState<Record<string, boolean>>({})
  const {
    articles,
    heroSlides,
    heroSide,
    stories,
    filterCounts,
    topDynamicRows,
    bottomDynamicRows,
    categories,
    latestStoriesLimit,
  } = useSiteData()

  const [page, setPage] = useState(1)

  const filter: string = queryValueToCategory(searchParams.get('category')) || 'all'

  useEffect(() => {
    setPage(1)
  }, [filter])

  const setFilter = (id: ArticleCategory) => {
    const q = categoryToQueryValue(id)
    if (q) setSearchParams({ category: q })
    else setSearchParams({})
  }

  const filteredArticles = useMemo(
    () => (filter === 'all' ? articles : articles.filter((a) => a.cat === filter)),
    [filter, articles],
  )

  const displayedArticles = useMemo(
    () => filteredArticles.slice(0, page * latestStoriesLimit),
    [filteredArticles, page, latestStoriesLimit]
  )

  const hasMore = page * latestStoriesLimit < filteredArticles.length

  const toggleUpvote = (id: string, e: MouseEvent) => {
    e.stopPropagation()
    setUpvoted((prev) => {
      const next = !prev[id]
      if (next) showToast('Upvoted! ▲')
      return { ...prev, [id]: next }
    })
  }

  const shareArticle = useCallback(
    (e: MouseEvent, slug: string) => {
      e.stopPropagation()
      const url = `${window.location.origin}${articleUrl(slug)}`
      void navigator.clipboard?.writeText(url).catch(() => {})
      showToast('Article link copied to clipboard')
    },
    [showToast],
  )

  return (
    <>
      <div className="hero">
        <HeroCarousel slides={heroSlides} />
        <div className="hero-side">
          {heroSide.map((item) => (
            <Link
              key={item.slug}
              to={articleUrl(item.slug)}
              className="hero-side-card"
              style={{ textDecoration: 'none' }}
            >
              <div className="hero-side-copy">
                <span className={`hero-side-cat cat-badge ${item.catClass}`} style={{ fontSize: 9 }}>
                  {item.cat}
                </span>
                <div className="hero-side-title">{item.title}</div>
                <div className="hero-side-meta mono">{item.meta}</div>
              </div>
              <img className="hero-side-thumb" src={item.imageUrl} alt="" loading="lazy" decoding="async" />
            </Link>
          ))}
        </div>
      </div>

      <div className="stories-bar">
        <div className="section-header">
          <span className="section-label">// QUICK READS</span>
          <Link to="/quick-reads" className="see-all">
            See all →
          </Link>
        </div>
        <div className="stories-row">
          {stories.map((s) => (
            <Link key={s.slug} to={articleUrl(s.slug)} className="story-card" style={{ textDecoration: 'none' }}>
              <div className="story-thumb">
                <div className="story-bg story-bg--photo">
                  <img src={s.imageUrl} alt="" className="story-photo" loading="lazy" decoding="async" />
                  <div className="story-gradient" />
                  <div className="story-text">{s.title}</div>
                </div>
              </div>
              <div className="story-cat mono">{s.meta}</div>
            </Link>
          ))}
        </div>
      </div>

      {topDynamicRows.map((row) => (
        <section key={`top-${row.slug}`} className="cat-section cat-section--alt" aria-labelledby={`cat-${row.slug}`}>
          <div className="cat-section-header">
            <Link
              id={`cat-${row.slug}`}
              to={`/category/${row.slug}`}
              className="cat-section-label condensed"
              style={{ color: row.accentColor || '#B48FE8', textDecoration: 'none' }}
            >
              {row.title.toUpperCase()}
            </Link>
            <div className="cat-line" />
            <Link to={`/category/${row.slug}`} className="see-all" style={{ textDecoration: 'none' }}>
              All {row.title} →
            </Link>
          </div>
          <div className="cat-grid">
            {row.articles.length === 0 ? (
              <div style={{
                color: 'var(--border)',
                padding: '48px 24px',
                border: '1px dashed var(--border)',
                borderRadius: '8px',
                gridColumn: '1 / -1',
                textAlign: 'center',
                fontFamily: 'monospace',
                fontSize: 12,
                letterSpacing: 2
              }}>
                [ COMING SOON ]
              </div>
            ) : row.articles.map((c) => {
              const k = c.upvotes >= 1000 ? `${(c.upvotes / 1000).toFixed(1)}K` : String(c.upvotes)
              return (
                <Link
                  key={c.slug}
                  to={articleUrl(c.slug)}
                  className="cat-mini-card cat-mini-card--media"
                  style={{ borderTop: `2px solid ${row.barColor || '#6B3FA0'}`, textDecoration: 'none' }}
                >
                  <img className="cat-mini-img" src={c.imageUrl} alt="" loading="lazy" decoding="async" />
                  <div className="cat-mini-body">
                    <div className="cat-mini-title">{c.title}</div>
                    <div className="cat-mini-meta mono">5 MIN · {k} ↑</div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      ))}

      <div className="main-layout" id="articles">
        <section className="articles-section" aria-labelledby="latest-heading">
          <h2 id="latest-heading" className="visually-hidden">
            Latest stories
          </h2>
          <div className="filter-row">
            <button
              type="button"
              className={`filter-chip${filter === 'all' ? ' active' : ''}`}
              onClick={() => setFilter('all' as any)}
            >
              All Stories <span className="filter-count">{filterCounts['all'] || 0}</span>
            </button>
            {categories.map((c) => (
              <button
                key={c.slug}
                type="button"
                className={`filter-chip${filter === c.slug ? ' active' : ''}`}
                onClick={() => setFilter(c.slug as any)}
              >
                {c.title} <span className="filter-count">{filterCounts[c.slug as any] || 0}</span>
              </button>
            ))}
          </div>

          <div className="articles-grid">
            {displayedArticles.map((a) => (
              <ArticleCard
                key={a.id}
                article={a}
                upvoted={!!upvoted[a.id]}
                onUpvote={(e) => toggleUpvote(a.id, e)}
                onShare={shareArticle}
              />
            ))}
          </div>

          {hasMore && (
            <div className="load-more-wrap">
              <button
                type="button"
                className="action-btn load-more-btn"
                onClick={() => setPage(p => p + 1)}
              >
                Load More Articles
              </button>
            </div>
          )}
        </section>

        <SidebarWidgets />
      </div>

      {bottomDynamicRows.map((row) => (
        <section key={`bot-${row.slug}`} className="cat-section cat-section--alt" aria-labelledby={`cat-${row.slug}`}>
          <div className="cat-section-header">
            <Link
              id={`cat-${row.slug}`}
              to={`/category/${row.slug}`}
              className="cat-section-label condensed"
              style={{ color: row.accentColor || '#B48FE8', textDecoration: 'none' }}
            >
              {row.title.toUpperCase()}
            </Link>
            <div className="cat-line" />
            <Link to={`/category/${row.slug}`} className="see-all" style={{ textDecoration: 'none' }}>
              All {row.title} →
            </Link>
          </div>
          <div className="cat-grid">
            {row.articles.length === 0 ? (
              <div style={{
                color: 'var(--border)',
                padding: '48px 24px',
                border: '1px dashed var(--border)',
                borderRadius: '8px',
                gridColumn: '1 / -1',
                textAlign: 'center',
                fontFamily: 'monospace',
                fontSize: 12,
                letterSpacing: 2
              }}>
                [ COMING SOON ]
              </div>
            ) : row.articles.map((c) => {
              const k = c.upvotes >= 1000 ? `${(c.upvotes / 1000).toFixed(1)}K` : String(c.upvotes)
              return (
                <Link
                  key={c.slug}
                  to={articleUrl(c.slug)}
                  className="cat-mini-card cat-mini-card--media"
                  style={{ borderTop: `2px solid ${row.barColor || '#6B3FA0'}`, textDecoration: 'none' }}
                >
                  <img className="cat-mini-img" src={c.imageUrl} alt="" loading="lazy" decoding="async" />
                  <div className="cat-mini-body">
                    <div className="cat-mini-title">{c.title}</div>
                    <div className="cat-mini-meta mono">5 MIN · {k} ↑</div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      ))}
    </>
  )
}
