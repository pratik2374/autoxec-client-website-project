import { FormEvent, useState } from 'react'
import { useToast } from '../context/ToastContext'

export function GetAdvicePage() {
  const showToast = useToast()
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [vehicle, setVehicle] = useState('')
  const [budget, setBudget] = useState('')
  const [message, setMessage] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (message.trim().length < 20) {
      showToast('Please provide a bit more detail about what you need advice on.')
      return
    }
    showToast('Your advice request has been sent! We will reach out shortly.')
    setName('')
    setEmail('')
    setVehicle('')
    setBudget('')
    setMessage('')
  }

  return (
    <div className="page-shell-wide">
      <h1 className="page-title condensed">Get Expert Car Advice</h1>
      <p className="page-lead">Confused about which car to buy? Worried about long-term reliability or maintenance costs? Our engineering team will review your requirements and provide personalized advice.</p>

      <div style={{ marginTop: 32, marginBottom: 40 }}>
        <form onSubmit={submit} className="newsletter-box" style={{ maxWidth: 640 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label htmlFor="advice-name" style={{ display: 'block', marginBottom: 8, fontSize: 13, color: 'var(--muted)' }}>Name</label>
              <input id="advice-name" className="newsletter-input" required placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label htmlFor="advice-email" style={{ display: 'block', marginBottom: 8, fontSize: 13, color: 'var(--muted)' }}>Email Address</label>
              <input id="advice-email" className="newsletter-input" required placeholder="john@example.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
            <div>
              <label htmlFor="advice-vehicle" style={{ display: 'block', marginBottom: 8, fontSize: 13, color: 'var(--muted)' }}>Current / Targeted Vehicle(s)</label>
              <input id="advice-vehicle" className="newsletter-input" placeholder="e.g. Kia Seltos, VW Taigun" value={vehicle} onChange={(e) => setVehicle(e.target.value)} />
            </div>
            <div>
              <label htmlFor="advice-budget" style={{ display: 'block', marginBottom: 8, fontSize: 13, color: 'var(--muted)' }}>Budget Range</label>
              <input id="advice-budget" className="newsletter-input" placeholder="e.g. ₹15-20 Lakhs" value={budget} onChange={(e) => setBudget(e.target.value)} />
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <label htmlFor="advice-message" style={{ display: 'block', marginBottom: 8, fontSize: 13, color: 'var(--muted)' }}>What kind of advice are you looking for?</label>
            <textarea
              id="advice-message"
              className="newsletter-input"
              required
              placeholder="Tell us what you're confused about... (minimum 20 characters)"
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ resize: 'vertical' }}
            />
          </div>

          <button type="submit" className="newsletter-btn condensed" style={{ marginTop: 8 }}>
            REQUEST ADVICE →
          </button>
          
          <p className="mono" style={{ fontSize: 10, color: 'var(--dim)', marginTop: 12 }}>
            AutoXec advisors will never ask for payment. All advice is free and independent.
          </p>
        </form>
      </div>
      
      <div className="cat-grid" style={{ marginBottom: 40 }}>
        <div className="cat-mini-card" style={{ background: 'var(--surface)', cursor: 'default' }}>
          <div className="cat-mini-title" style={{ marginTop: 8 }}>Unbiased Opinion</div>
          <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 6 }}>We do not accept sales commissions from OEMs. Our advice is strictly based on engineering merits and your personal use case.</p>
        </div>
        <div className="cat-mini-card" style={{ background: 'var(--surface)', cursor: 'default' }}>
          <div className="cat-mini-title" style={{ marginTop: 8 }}>Technical Depth</div>
          <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 6 }}>We evaluate cars far beyond the spec sheet, diving into suspension geometry, transmission thermal management, and long-term chassis durability.</p>
        </div>
      </div>
    </div>
  )
}
