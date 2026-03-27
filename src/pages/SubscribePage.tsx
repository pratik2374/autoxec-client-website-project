import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { useToast } from '../context/ToastContext'
import { isFirebaseConfigured } from '../firebase/config'
import { saveNewsletterSignup } from '../firebase/newsletter'

const PAST = [
  { date: '17 Mar 2026', topics: '800V packs · Tyre construction · PLI update' },
  { date: '10 Mar 2026', topics: 'Suspension kinematics · CNG combustion · MotoGP aero' },
  { date: '3 Mar 2026', topics: 'BMS edge cases · Localisation map · Reader Q&A' },
]

export function SubscribePage() {
  const showToast = useToast()
  const [first, setFirst] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('student')
  const [agree, setAgree] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!first.trim() || !email.includes('@') || !agree) {
      showToast('Fill all fields and accept the Privacy Policy.')
      return
    }
    if (!isFirebaseConfigured()) {
      showToast('Newsletter backend is not configured. Add Firebase keys to .env')
      return
    }

    setSubmitting(true)
    try {
      await saveNewsletterSignup({
        firstName: first.trim(),
        email: email.trim(),
        role,
        privacyAccepted: agree,
        source: 'subscribe_page',
      })
      showToast('Subscribed to Intelligence Brief!')
      setFirst('')
      setEmail('')
      setRole('student')
      setAgree(false)
    } catch (err) {
      console.error(err)
      const msg = err instanceof Error ? err.message : 'Could not save subscription. Try again.'
      showToast(msg.length > 80 ? 'Could not save subscription. Check console / Firestore rules.' : msg)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="page-shell-wide">
      <p className="section-label">THE INTELLIGENCE BRIEF</p>
      <h1 className="page-title condensed">Weekly automotive engineering intelligence — every Monday morning</h1>
      <p className="page-lead">It is free. It is weekly. It has no opinion. Only verified engineering intelligence.</p>
      <ul style={{ color: 'var(--muted)', lineHeight: 1.9, marginBottom: 28 }}>
        <li>The 3 most technically significant automotive developments of the week</li>
        <li>One engineering deep-dive topic explained in 5 minutes</li>
        <li>India EV data update — sales, infrastructure, policy</li>
        <li>What to read this week on AutoXec — 3 recommended articles</li>
      </ul>

      <form onSubmit={submit} className="newsletter-box" style={{ maxWidth: 480 }}>
        <div className="newsletter-title condensed">Sign up</div>
        <input className="newsletter-input" placeholder="First name" value={first} onChange={(e) => setFirst(e.target.value)} disabled={submitting} />
        <input
          className="newsletter-input"
          placeholder="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={submitting}
        />
        <label className="mono" style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>
          I am a…
        </label>
        <select
          className="newsletter-input"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ cursor: 'pointer' }}
          disabled={submitting}
        >
          <option value="student">Engineering Student</option>
          <option value="pro">Working Professional</option>
          <option value="fan">Automotive Enthusiast</option>
          <option value="other">Other</option>
        </select>
        <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: 'var(--muted)', marginBottom: 12 }}>
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} disabled={submitting} />
          I agree to AutoXec&apos;s{' '}
          <Link to="/privacy" target="_blank">
            Privacy Policy
          </Link>
        </label>
        <button type="submit" className="newsletter-btn condensed" disabled={submitting}>
          {submitting ? 'SUBMITTING…' : 'SUBSCRIBE TO INTELLIGENCE BRIEF →'}
        </button>
        <p className="mono" style={{ fontSize: 10, color: 'var(--dim)', marginTop: 8 }}>
          No spam. Unsubscribe any time with one click.
        </p>
      </form>

      <h2 className="sidebar-title" style={{ marginTop: 40 }}>
        Past issues (preview)
      </h2>
      <div className="cat-grid">
        {PAST.map((p) => (
          <div key={p.date} className="cat-mini-card">
            <div className="cat-mini-meta mono">{p.date}</div>
            <div className="cat-mini-title" style={{ marginTop: 8 }}>
              {p.topics}
            </div>
            <button type="button" className="see-all" style={{ marginTop: 12 }} onClick={() => showToast('Newsletter archive — link per issue in production')}>
              Read this issue →
            </button>
          </div>
        ))}
      </div>

      <h2 className="sidebar-title" style={{ marginTop: 32 }}>
        What subscribers say
      </h2>
      <p style={{ color: 'var(--muted)', fontStyle: 'italic' }}>Quotes from early subscribers — coming as the list grows.</p>
    </div>
  )
}
