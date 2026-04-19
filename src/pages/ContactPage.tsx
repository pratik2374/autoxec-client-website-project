import { FormEvent, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useToast } from '../context/ToastContext'
import { InstagramIcon } from '../components/SocialIcons'

const REASONS = [
  { id: 'media', icon: '📧', title: 'Media & Brand Partnerships', desc: 'Media accreditation or brand coverage.' },
  { id: 'correction', icon: '✏️', title: 'Editorial Correction', desc: 'Technical error in an AutoXec article.' },
  { id: 'reader', icon: '❓', title: 'Reader Question', desc: 'Question about something we covered.' },
  { id: 'general', icon: '💼', title: 'General Enquiry', desc: 'Something else.' },
] as const

export function ContactPage() {
  const [params] = useSearchParams()
  const preset = params.get('reason')
  const showToast = useToast()
  const [reason, setReason] = useState<(typeof REASONS)[number]['id']>(
    preset === 'correction' ? 'correction' : 'media',
  )
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [org, setOrg] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [articleUrlField, setArticleUrlField] = useState('')

  const needArticleLink = reason === 'correction'

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (message.trim().length < 50) {
      showToast('Message must be at least 50 characters.')
      return
    }
    if (needArticleLink && !articleUrlField.trim()) {
      showToast('Add the article link for corrections.')
      return
    }
    showToast('Message sent — we respond within 48 hours (demo).')
  }

  return (
    <div className="page-shell-wide">
      <h1 className="page-title condensed">Talk to AutoXec</h1>
      <p className="page-lead">For media partnerships, corrections, technical questions, or general enquiries.</p>

      <div className="cat-grid" style={{ marginBottom: 28 }}>
        {REASONS.map((r) => (
          <button
            key={r.id}
            type="button"
            className={`cat-mini-card${reason === r.id ? '' : ''}`}
            onClick={() => setReason(r.id)}
            style={{
              textAlign: 'left',
              cursor: 'pointer',
              borderTop: reason === r.id ? '3px solid var(--red)' : '1px solid var(--border)',
              background: reason === r.id ? 'var(--card)' : 'var(--surface)',
            }}
          >
            <div style={{ fontSize: 22 }} aria-hidden>
              {r.icon}
            </div>
            <div className="cat-mini-title" style={{ marginTop: 8 }}>
              {r.title}
            </div>
            <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 6 }}>{r.desc}</p>
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="newsletter-box" style={{ maxWidth: 560 }}>
        <input className="newsletter-input" required placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="newsletter-input" required placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="newsletter-input" placeholder="Organisation / company (optional)" value={org} onChange={(e) => setOrg(e.target.value)} />
        <input className="newsletter-input" required placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
        {needArticleLink ? (
          <input
            className="newsletter-input"
            required
            placeholder="Link to the article with the error"
            value={articleUrlField}
            onChange={(e) => setArticleUrlField(e.target.value)}
          />
        ) : null}
        <textarea
          className="newsletter-input"
          required
          placeholder="Message (min. 50 characters)"
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ resize: 'vertical' }}
        />
        <button type="submit" className="newsletter-btn condensed">
          SEND MESSAGE →
        </button>
        <p className="mono" style={{ fontSize: 10, color: 'var(--dim)', marginTop: 8 }}>
          We respond to all messages within 48 hours.
        </p>
      </form>

      <h2 className="sidebar-title" style={{ marginTop: 32 }}>
        Direct contact
      </h2>
      <p style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
        <strong>Media:</strong> <a href="mailto:media@autoxec.in">media@autoxec.in</a>
        <br />
        <strong>Instagram:</strong>{' '}
        <a className="social-btn" href="https://instagram.com/autoxec" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', marginLeft: 8 }}>
          <InstagramIcon /> @autoxec
        </a>
        <br />
        <strong>Urgent corrections:</strong>{' '}
        <a href="mailto:editorial@autoxec.in?subject=CORRECTION">editorial@autoxec.in</a> — use CORRECTION in the subject line.
      </p>
    </div>
  )
}
