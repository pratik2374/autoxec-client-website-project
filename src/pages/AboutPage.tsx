import { Link } from 'react-router-dom'
import { categoryToPathSlug } from '../lib/site'
import { InstagramIcon } from '../components/SocialIcons'

const CARDS = [
  {
    cat: 'ev',
    title: 'EV & Future Mobility',
    blurb: 'Battery systems, charging architecture, range physics, EV policy.',
    bar: '#04A777',
  },
  {
    cat: 'launch',
    title: 'Vehicle Launches',
    blurb: 'Engineering decisions behind new products, not just specifications.',
    bar: '#C0000A',
  },
  {
    cat: 'engineering',
    title: 'Engineering Deep Dives',
    blurb: 'How vehicles work at component and system level.',
    bar: '#6B3FA0',
  },
  {
    cat: 'motorsport',
    title: 'Motorsport',
    blurb: 'F1, MotoGP, WSBK, INRC, MMSC — with technical analysis.',
    bar: '#F25F5C',
  },
  {
    cat: 'twowheeler',
    title: 'Two-Wheelers',
    blurb: 'India’s most important vehicle segment, with engineering depth.',
    bar: '#007FFF',
  },
  {
    cat: 'industry',
    title: 'Industry & Policy',
    blurb: 'FAME, PLI incentives, component localisation, OEM strategy.',
    bar: '#FF9F1C',
  },
]

export function AboutPage() {
  return (
    <div className="page-shell-wide">
      <h1 className="page-title condensed">College makes graduates. AutoXec makes real engineers.</h1>
      <p className="page-lead">
        AutoXec is India&apos;s mobility intelligence newsroom. We cover automotive engineering, vehicle launches, EV
        technology, industry news, and motorsport through a single uncompromising lens:{' '}
        <strong>technical accuracy above entertainment</strong>.
      </p>

      <h2 className="sidebar-title" style={{ marginTop: 32 }}>
        What we cover
      </h2>
      <div className="cat-grid" style={{ marginTop: 16 }}>
        {CARDS.map((c) => (
          <Link
            key={c.cat}
            to={`/category/${categoryToPathSlug(c.cat)}`}
            className="cat-mini-card"
            style={{ textDecoration: 'none', borderTop: `2px solid ${c.bar}` }}
          >
            <div className="cat-mini-title">{c.title}</div>
            <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 8 }}>{c.blurb}</p>
          </Link>
        ))}
      </div>

      <h2 className="sidebar-title" style={{ marginTop: 40 }}>
        Editorial standard
      </h2>
      <p className="prose">
        Every technical claim in every AutoXec article is verified against engineering sources — OEM workshop manuals,
        peer-reviewed research, regulatory documents, or direct OEM communication. When we make an error, we publish a
        correction.
      </p>
      <Link to="/editorial-policy" className="see-all" style={{ display: 'inline-block', marginTop: 12 }}>
        Read our full editorial policy →
      </Link>

      <h2 className="sidebar-title" style={{ marginTop: 40 }}>
        Team
      </h2>
      <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))' }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: 20, borderRadius: 6 }}>
          <strong>Preetam</strong> — Founder &amp; Editor
          <p style={{ color: 'var(--muted)', marginTop: 8, fontSize: 14 }}>
            Builds AutoXec&apos;s technical voice and verification workflow — from workshop manuals to racetrack data.
          </p>
          <a href="https://instagram.com/autoxec" target="_blank" rel="noreferrer" className="social-btn" style={{ marginTop: 12 }}>
            <InstagramIcon /> Follow on Instagram
          </a>
        </div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: 20, borderRadius: 6 }}>
          <strong>Ashish</strong> — Co-Founder
          <p style={{ color: 'var(--muted)', marginTop: 8, fontSize: 14 }}>Operations and partnerships backbone.</p>
        </div>
      </div>

      <h2 className="sidebar-title" style={{ marginTop: 40 }}>
        Work with us
      </h2>
      <p style={{ color: 'var(--muted)' }}>If you are a brand, organisation, or researcher who wants to work with AutoXec:</p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 16 }}>
        <Link to="/media" className="nav-btn">
          VIEW MEDIA KIT
        </Link>
        <a className="action-btn" href="mailto:media@autoxec.in" style={{ padding: '10px 20px' }}>
          EMAIL US
        </a>
      </div>
    </div>
  )
}
