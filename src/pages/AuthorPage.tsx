import { Link } from 'react-router-dom'
import { useSiteData } from '../context/SiteDataContext'
import { articleUrl } from '../lib/site'

export function AuthorPage() {
  const { articles } = useSiteData()
  const pieces = articles

  return (
    <div className="page-shell-wide">
      <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 24 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: 'linear-gradient(135deg,var(--purple),var(--red))',
          }}
        />
        <div>
          <h1 className="page-title condensed" style={{ marginBottom: 4 }}>
            Preetam
          </h1>
          <p className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>
            Founder &amp; Editor · AutoXec
          </p>
        </div>
      </div>
      <p className="page-lead">
        Writes and edits engineering-first automotive coverage for Indian readers — launches, EV systems, motorsport
        setup, and industry mechanics.
      </p>
      <a className="nav-btn" href="https://instagram.com/autoxec" target="_blank" rel="noreferrer" style={{ display: 'inline-block' }}>
        Follow on Instagram
      </a>
      <h2 className="sidebar-title" style={{ marginTop: 40 }}>
        Recent bylines
      </h2>
      <div className="articles-grid">
        {pieces.map((a) => (
          <Link key={a.slug} to={articleUrl(a.slug)} className="article-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="article-body">
              <h3 className="article-title">{a.title}</h3>
              <p className="article-excerpt">{a.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
