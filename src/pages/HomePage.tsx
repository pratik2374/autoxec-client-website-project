import type { MouseEvent } from 'react'
import { useCallback, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArticleCard } from '../components/ArticleCard'
import { HeroCarousel } from '../components/HeroCarousel'
import { SidebarWidgets } from '../components/SidebarWidgets'
import type { ArticleCategory } from '../data'
import {
  ARTICLES,
  ENG_MINI,
  EV_MINI,
  FILTER_COUNTS,
  HERO_SIDE,
  HERO_SLIDES,
  STORIES,
} from '../data'
import { useToast } from '../context/ToastContext'
import { articleUrl, categoryToQueryValue, queryValueToCategory } from '../lib/site'

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const showToast = useToast()
  const [upvoted, setUpvoted] = useState<Record<string, boolean>>({})

  const filter: ArticleCategory = queryValueToCategory(searchParams.get('category'))

  const setFilter = (id: ArticleCategory) => {
    const q = categoryToQueryValue(id)
    if (q) setSearchParams({ category: q })
    else setSearchParams({})
  }

  const filteredArticles = useMemo(
    () => (filter === 'all' ? ARTICLES : ARTICLES.filter((a) => a.cat === filter)),
    [filter],
  )

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
        <HeroCarousel slides={HERO_SLIDES} />
        <div className="hero-side">
          {HERO_SIDE.map((item) => (
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
          {STORIES.map((s) => (
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

      <div className="main-layout" id="articles">
        <section className="articles-section" aria-labelledby="latest-heading">
          <h2 id="latest-heading" className="visually-hidden">
            Latest stories
          </h2>
          <div className="filter-row">
            {(
              [
                ['all', 'All Stories'],
                ['ev', 'EV & Future'],
                ['launch', 'Launches'],
                ['engineering', 'Engineering'],
                ['motorsport', 'Motorsport'],
                ['twowheeler', 'Two-Wheelers'],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                className={`filter-chip${filter === id ? ' active' : ''}`}
                onClick={() => setFilter(id)}
              >
                {label} <span className="filter-count">{FILTER_COUNTS[id]}</span>
              </button>
            ))}
          </div>

          <div className="articles-grid">
            {filteredArticles.map((a) => (
              <ArticleCard
                key={a.id}
                article={a}
                upvoted={!!upvoted[a.id]}
                onUpvote={(e) => toggleUpvote(a.id, e)}
                onShare={shareArticle}
              />
            ))}
          </div>

          <div className="load-more-wrap">
            <button
              type="button"
              className="action-btn load-more-btn"
              onClick={() => showToast('Loading more articles...')}
            >
              Load More Articles
            </button>
          </div>
        </section>

        <SidebarWidgets />
      </div>

      <section className="cat-section" aria-labelledby="ev-section">
        <div className="cat-section-header">
          <Link
            id="ev-section"
            to="/category/ev"
            className="cat-section-label condensed"
            style={{ color: '#4AE080', textDecoration: 'none' }}
          >
            EV INTELLIGENCE
          </Link>
          <div className="cat-line" />
          <Link to="/category/ev" className="see-all" style={{ textDecoration: 'none' }}>
            All EV stories →
          </Link>
        </div>
        <div className="cat-grid">
          {EV_MINI.map((c) => (
            <Link
              key={c.slug}
              to={articleUrl(c.slug)}
              className="cat-mini-card cat-mini-card--media"
              style={{ borderTop: '2px solid #1A7A3C', textDecoration: 'none' }}
            >
              <img className="cat-mini-img" src={c.imageUrl} alt="" loading="lazy" decoding="async" />
              <div className="cat-mini-body">
                <div className="cat-mini-title">{c.title}</div>
                <div className="cat-mini-meta mono">{c.meta}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="cat-section cat-section--alt" aria-labelledby="eng-section">
        <div className="cat-section-header">
          <Link
            id="eng-section"
            to="/category/engineering"
            className="cat-section-label condensed"
            style={{ color: '#B48FE8', textDecoration: 'none' }}
          >
            ENGINEERING DEEP DIVES
          </Link>
          <div className="cat-line" />
          <Link to="/category/engineering" className="see-all" style={{ textDecoration: 'none' }}>
            All engineering →
          </Link>
        </div>
        <div className="cat-grid">
          {ENG_MINI.map((c) => (
            <Link
              key={c.slug}
              to={articleUrl(c.slug)}
              className="cat-mini-card cat-mini-card--media"
              style={{ borderTop: '2px solid #6B3FA0', textDecoration: 'none' }}
            >
              <img className="cat-mini-img" src={c.imageUrl} alt="" loading="lazy" decoding="async" />
              <div className="cat-mini-body">
                <div className="cat-mini-title">{c.title}</div>
                <div className="cat-mini-meta mono">{c.meta}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
