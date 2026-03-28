import { Link } from 'react-router-dom'
import { useSiteData } from '../context/SiteDataContext'
import { articleUrl } from '../lib/site'

export function MediaKitPage() {
  const { articles } = useSiteData()
  const samples = articles.slice(0, 4)

  return (
    <div className="page-shell-wide">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <p className="section-label">MEDIA &amp; PRESS</p>
          <p className="mono" style={{ fontSize: 11, color: 'var(--dim)' }}>
            Last updated: March 2026
          </p>
          <h1 className="page-title condensed" style={{ marginTop: 12 }}>
            AutoXec — India&apos;s Mobility Intelligence Newsroom
          </h1>
        </div>
        <button type="button" className="nav-btn" onClick={() => alert('PDF download — add media-kit.pdf to /public when ready.')}>
          DOWNLOAD MEDIA KIT PDF →
        </button>
      </div>

      <div className="stats-grid" style={{ marginTop: 32, gridTemplateColumns: 'repeat(4,1fr)' }}>
        {[
          ['48K', 'Readers'],
          ['12%', 'Eng. rate (demo)'],
          ['Coming', 'Community'],
          ['24+', 'Articles / wk'],
        ].map(([a, b]) => (
          <div key={b} className="stat-card">
            <div className="stat-val condensed" style={{ color: 'var(--red)' }}>
              {a}
            </div>
            <div className="stat-lbl">{b}</div>
          </div>
        ))}
      </div>
      <p className="mono" style={{ fontSize: 11, color: 'var(--dim)', marginTop: 8 }}>
        All numbers accurate as of publish date. Updated quarterly in production.
      </p>

      <h2 className="sidebar-title" style={{ marginTop: 32 }}>
        Who AutoXec is
      </h2>
      <div className="prose">
        <p>
          AutoXec is an engineering-first Indian automotive newsroom — built for readers who want how and why, not
          brochure language.
        </p>
        <p>
          We publish launches, EV systems, motorsport analysis, and policy with traceable sources — workshop manuals,
          regulatory text, and on-record engineering.
        </p>
      </div>

      <h2 className="sidebar-title" style={{ marginTop: 28 }}>
        Audience profile
      </h2>
      <ul style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
        <li>Age: 18–32 primary · 32–45 secondary</li>
        <li>Geography: India — Tier 1 &amp; Tier 2 cities</li>
        <li>Education: majority engineering / technical backgrounds</li>
        <li>Interests: enthusiasts, engineering students, working professionals</li>
      </ul>

      <h2 className="sidebar-title" style={{ marginTop: 28 }}>
        Sample coverage
      </h2>
      <div className="articles-grid">
        {samples.map((a) => (
          <div key={a.slug} className="article-card" style={{ cursor: 'default' }}>
            <div className="article-body">
              <h3 className="article-title">{a.title}</h3>
              <Link to={articleUrl(a.slug)} className="see-all">
                Read full article →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <h2 className="sidebar-title" style={{ marginTop: 32 }}>
        Contact
      </h2>
      <p style={{ color: 'var(--muted)' }}>
        <strong>Email:</strong> <a href="mailto:media@autoxec.in">media@autoxec.in</a>
        <br />
        <strong>Name:</strong> Preetam, Founder &amp; Editor
        <br />
        <strong>Phone:</strong> <a href="tel:+917497895036">+91 7497895036</a>
        <br />
        <strong>LinkedIn:</strong>{' '}
        <a href="https://linkedin.com/company/autoxec" target="_blank" rel="noreferrer">
          company/autoxec
        </a>
      </p>
    </div>
  )
}
