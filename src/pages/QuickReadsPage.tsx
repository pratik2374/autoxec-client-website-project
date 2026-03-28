import { Link } from 'react-router-dom'
import { useSiteData } from '../context/SiteDataContext'
import { articleUrl } from '../lib/site'

export function QuickReadsPage() {
  const { stories } = useSiteData()
  return (
    <div className="page-shell-wide">
      <p className="section-label">// QUICK READS</p>
      <h1 className="page-title condensed">Bite-size engineering explainers</h1>
      <p className="page-lead">
        Two-to-five minute pieces built to share on WhatsApp — same strip as the homepage, on one page.
      </p>
      <div className="stories-row" style={{ flexWrap: 'wrap', paddingBottom: 40 }}>
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
  )
}
