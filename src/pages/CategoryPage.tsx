import type { MouseEvent } from 'react'
import { useCallback, useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { ArticleCard } from '../components/ArticleCard'
import { useArticlesInCategoryOrEmpty, useSiteData } from '../context/SiteDataContext'
import { useToast } from '../context/ToastContext'
import { categoryToPathSlug, pathSlugToCategory } from '../lib/site'
import { NotFoundPage } from './NotFoundPage'

export function CategoryPage() {
  const { slug } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const showToast = useToast()
  const [upvoted, setUpvoted] = useState<Record<string, boolean>>({})

  const { categories } = useSiteData()

  const cat = slug ? pathSlugToCategory(slug) : null
  const sort = searchParams.get('sort') ?? 'latest'

  const baseList = useArticlesInCategoryOrEmpty(cat)
  const metaCategory = categories.find((c) => c.slug === cat)

  const items = useMemo(() => {
    if (!cat) return []
    let list = baseList
    if (sort === 'upvotes') list = [...list].sort((a, b) => b.upvotes - a.upvotes)
    if (sort === 'oldest') list = [...list].reverse()
    return list
  }, [cat, sort, baseList])

  const toggleUpvote = (id: string, e: MouseEvent) => {
    e.stopPropagation()
    setUpvoted((prev) => {
      const next = !prev[id]
      if (next) showToast('Upvoted! ▲')
      return { ...prev, [id]: next }
    })
  }

  const shareArticle = useCallback(
    (e: MouseEvent, slugArticle: string) => {
      e.stopPropagation()
      const url = `${window.location.origin}/article/${slugArticle}`
      void navigator.clipboard?.writeText(url).catch(() => {})
      showToast('Article link copied to clipboard')
    },
    [showToast],
  )

  if (!cat) {
    return <NotFoundPage />
  }

  const meta = metaCategory || {
    title: cat.toUpperCase(),
    description: `Articles related to ${cat}`,
    accentColor: '#B48FE8',
    barColor: '#6B3FA0',
  }
  
  const featured = items[0]
  const rest = items.slice(1)

  return (
    <div>
      <div
        style={{
          borderTop: `3px solid ${meta.barColor}`,
          background: 'linear-gradient(180deg, rgba(42,31,69,0.35) 0%, transparent 100%)',
        }}
      >
        <div className="page-shell-wide" style={{ paddingTop: 28 }}>
          <h1 className="page-title condensed" style={{ color: meta.accentColor }}>
            {meta.title}
          </h1>
          <p className="page-lead">{meta.description}</p>
          <p className="mono" style={{ fontSize: 12, color: 'var(--dim)', marginBottom: 24 }}>
            {items.length} articles in this category
          </p>

          {featured ? (
            <Link
              to={`/article/${featured.slug}`}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'block',
                border: '1px solid var(--border)',
                borderRadius: 6,
                padding: 20,
                marginBottom: 28,
                background: 'var(--surface)',
              }}
            >
              <span className="section-label" style={{ display: 'block', marginBottom: 12 }}>
                FEATURED
              </span>
              <div className="article-title">{featured.title}</div>
              <p className="article-excerpt" style={{ marginTop: 12 }}>
                {featured.excerpt}
              </p>
            </Link>
          ) : null}

          <div className="filter-row" style={{ marginBottom: 8 }}>
            <span className="mono" style={{ fontSize: 11, color: 'var(--muted)', marginRight: 8 }}>
              Sort by:
            </span>
            {(
              [
                ['latest', 'Latest'],
                ['upvotes', 'Most Upvoted'],
                ['shares', 'Most Shared'],
                ['oldest', 'Oldest'],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                className={`filter-chip${sort === key ? ' active' : ''}`}
                onClick={() => {
                  if (key === 'shares') {
                    showToast('Sort: most shared — demo')
                    return
                  }
                  setSearchParams(key === 'latest' ? {} : { sort: key })
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="page-shell-wide" style={{ paddingTop: 0 }}>
        <div className="articles-grid">
          {rest.map((a) => (
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
          <button type="button" className="action-btn load-more-btn" onClick={() => showToast('Loading more…')}>
            Load More Articles
          </button>
        </div>
        <p className="mono" style={{ fontSize: 11, color: 'var(--dim)', marginTop: 24 }}>
          Other categories:{' '}
          {categories
            .filter((c) => c.slug !== cat)
            .map((c) => (
              <Link key={c.slug} to={`/category/${categoryToPathSlug(c.slug)}`} style={{ color: 'var(--purpleL)', marginRight: 10 }}>
                {c.title}
              </Link>
            ))}
        </p>
      </div>
    </div>
  )
}
