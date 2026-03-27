import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TRENDING, TOPICS } from '../data'
import { articleUrl } from '../lib/site'
import { useToast } from '../context/ToastContext'
import { isFirebaseConfigured } from '../firebase/config'
import { saveNewsletterSignup } from '../firebase/newsletter'

export function SidebarWidgets() {
  const navigate = useNavigate()
  const showToast = useToast()
  const [briefEmail, setBriefEmail] = useState('')
  const [briefAgree, setBriefAgree] = useState(false)
  const [briefSubmitting, setBriefSubmitting] = useState(false)

  const submitIntelligenceBrief = async (e: FormEvent) => {
    e.preventDefault()
    if (!briefEmail.trim().includes('@')) {
      showToast('Enter a valid email address.')
      return
    }
    if (!briefAgree) {
      showToast('Accept the Privacy Policy to subscribe.')
      return
    }
    if (!isFirebaseConfigured()) {
      showToast('Newsletter backend is not configured. Add Firebase keys to .env')
      return
    }
    setBriefSubmitting(true)
    try {
      await saveNewsletterSignup({
        firstName: '',
        email: briefEmail.trim(),
        role: 'sidebar',
        privacyAccepted: true,
        source: 'sidebar',
      })
      showToast('Subscribed to Intelligence Brief!')
      setBriefEmail('')
      setBriefAgree(false)
    } catch (err) {
      console.error(err)
      const msg = err instanceof Error ? err.message : 'Could not save subscription. Try again.'
      showToast(msg.length > 80 ? 'Could not save subscription. Check console / Firestore rules.' : msg)
    } finally {
      setBriefSubmitting(false)
    }
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-title">Trending Now</div>
        {TRENDING.map((t) => (
          <Link key={t.num} to={articleUrl(t.slug)} className="trending-item" style={{ textDecoration: 'none' }}>
            <div className="trending-num">{t.num}</div>
            <div>
              <div className="trending-title">{t.title}</div>
              <div className="trending-meta mono">{t.meta}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="sidebar-section">
        <div className="sidebar-title">Explore Topics</div>
        <div className="topic-chips">
          {TOPICS.map((topic) => (
            <button
              key={topic}
              type="button"
              className="topic-chip"
              onClick={() => navigate(`/search?q=${encodeURIComponent(topic)}`)}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <form className="newsletter-box" onSubmit={submitIntelligenceBrief}>
          <div className="newsletter-title condensed">Intelligence Brief</div>
          <div className="newsletter-desc">
            Weekly engineering analysis delivered to your inbox. No spec sheets. No opinion. Just verified technical
            intelligence.
          </div>
          <input
            className="newsletter-input"
            placeholder="your@email.com"
            type="email"
            autoComplete="email"
            value={briefEmail}
            onChange={(ev) => setBriefEmail(ev.target.value)}
            disabled={briefSubmitting}
          />
          <label className="newsletter-sidebar-consent">
            <input
              type="checkbox"
              checked={briefAgree}
              onChange={(ev) => setBriefAgree(ev.target.checked)}
              disabled={briefSubmitting}
            />
            <span>
              I agree to AutoXec&apos;s{' '}
              <Link to="/privacy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </Link>
            </span>
          </label>
          <button type="submit" className="newsletter-btn condensed" disabled={briefSubmitting}>
            {briefSubmitting ? 'SUBMITTING…' : 'SUBSCRIBE FREE →'}
          </button>
        </form>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-title">This Week&apos;s Stats</div>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-val" style={{ color: 'var(--red)' }}>
              24
            </div>
            <div className="stat-lbl">ARTICLES</div>
          </div>
          <div className="stat-card">
            <div className="stat-val" style={{ color: 'var(--purpleL)' }}>
              11K
            </div>
            <div className="stat-lbl">UPVOTES</div>
          </div>
          <div className="stat-card">
            <div className="stat-val" style={{ color: '#4AE080' }}>
              48K
            </div>
            <div className="stat-lbl">READERS</div>
          </div>
          <div className="stat-card">
            <div className="stat-val" style={{ color: '#4ADADA' }}>
              3.2K
            </div>
            <div className="stat-lbl">SHARES</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
