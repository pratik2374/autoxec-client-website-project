import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSiteData } from '../context/SiteDataContext'
import { articleUrl } from '../lib/site'

export function NotFoundPage() {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const { trending } = useSiteData()

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const t = q.trim()
    if (t) navigate(`/search?q=${encodeURIComponent(t)}`)
  }

  return (
    <div className="page-shell-wide" style={{ textAlign: 'center', paddingTop: 48 }}>
      <p className="section-label">// PAGE NOT FOUND</p>
      <div className="page-title condensed" style={{ fontSize: 'clamp(4rem, 12vw, 8rem)', lineHeight: 1 }}>
        404
      </div>
      <h1 className="page-title condensed" style={{ marginTop: 16 }}>
        This road does not exist.
      </h1>
      <p className="page-lead" style={{ margin: '0 auto 28px', maxWidth: 480 }}>
        But there are dozens of other worth driving on AutoXec.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
        <Link to="/" className="nav-btn">
          GO TO HOMEPAGE →
        </Link>
        <Link to="/#articles" className="action-btn" style={{ padding: '10px 20px' }}>
          READ LATEST ARTICLES →
        </Link>
      </div>
      <p className="mono" style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12 }}>
        Or search for something specific:
      </p>
      <form onSubmit={submit} style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
        <input className="search-box" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" style={{ width: 280 }} />
        <button type="submit" className="nav-btn">
          Search
        </button>
      </form>
      <h2 className="sidebar-title" style={{ marginTop: 48, textAlign: 'left' }}>
        Trending now
      </h2>
      <div className="cat-grid" style={{ marginTop: 16 }}>
        {trending.slice(0, 3).map((t) => (
          <Link key={t.num} to={articleUrl(t.slug)} className="cat-mini-card" style={{ textDecoration: 'none' }}>
            <div className="cat-mini-title">{t.title}</div>
            <div className="cat-mini-meta mono">{t.meta}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
