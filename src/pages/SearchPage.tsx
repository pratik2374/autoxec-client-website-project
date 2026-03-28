import { FormEvent, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useAllArticlesMerged } from '../context/SiteDataContext'
import { articleUrl } from '../lib/site'

export function SearchPage() {
  const [params, setParams] = useSearchParams()
  const q = (params.get('q') ?? '').trim()
  const [draft, setDraft] = useState(q)
  const merged = useAllArticlesMerged()

  const results = useMemo(() => {
    if (!q) return []
    const low = q.toLowerCase()
    return merged.filter(
      (a) =>
        a.title.toLowerCase().includes(low) ||
        a.excerpt.toLowerCase().includes(low) ||
        a.badge.toLowerCase().includes(low),
    )
  }, [q, merged])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const t = draft.trim()
    if (t) setParams({ q: t })
  }

  return (
    <div className="page-shell-wide">
      <h1 className="page-title condensed">Search</h1>
      <form onSubmit={submit} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
        <input
          className="search-box"
          style={{ flex: '1 1 240px', width: '100%', maxWidth: 400 }}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Search AutoXec..."
          aria-label="Search query"
        />
        <button type="submit" className="nav-btn">
          Search
        </button>
      </form>
      {q ? (
        <p className="mono" style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 20 }}>
          {results.length} result{results.length === 1 ? '' : 's'} for “{q}”
        </p>
      ) : (
        <p style={{ color: 'var(--muted)' }}>Enter a query to search headlines and excerpts.</p>
      )}
      <div className="articles-grid">
        {results.map((a) => (
          <Link
            key={a.slug}
            to={articleUrl(a.slug)}
            className="article-card"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="article-body">
              <span className={`cat-badge ${a.badgeClass}`}>{a.badge}</span>
              <h3 className="article-title">{a.title}</h3>
              <p className="article-excerpt">{a.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
