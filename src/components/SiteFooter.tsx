import { Link } from 'react-router-dom'
import { categoryToPathSlug } from '../lib/site'
import type { NavCategory } from '../types'
import { InstagramIcon, YouTubeIcon, LinkedInIcon } from './SocialIcons'

const COVERAGE: { label: string; cat: NavCategory }[] = [
  { label: 'EV & Future Mobility', cat: 'ev' },
  { label: 'Vehicle Launches', cat: 'launch' },
  { label: 'Engineering Deep Dives', cat: 'engineering' },
  { label: 'Motorsport', cat: 'motorsport' },
  { label: 'Two-Wheelers', cat: 'twowheeler' },
  { label: 'Industry & Policy', cat: 'industry' },
]

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <Link to="/" className="footer-brand-name condensed" style={{ textDecoration: 'none' }}>
            AUTO<span>XEC</span>
          </Link>
          <p className="footer-tagline">
            India&apos;s mobility intelligence newsroom. Engineering-first automotive journalism — explaining not
            just what vehicles do, but how and why they do it.
          </p>
        </div>
        <div>
          <div className="footer-heading">Coverage</div>
          <div className="footer-links">
            {COVERAGE.map(({ label, cat }) => (
              <Link key={label} to={`/category/${categoryToPathSlug(cat)}`} className="footer-link">
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="footer-heading">AutoXec</div>
          <div className="footer-links">
            <Link to="/about" className="footer-link">
              About Us
            </Link>
            <Link to="/media" className="footer-link">
              Media Kit
            </Link>
            <Link to="/community" className="footer-link">
              Community
            </Link>
            <Link to="/subscribe" className="footer-link">
              Intelligence Brief
            </Link>
            <Link to="/contact" className="footer-link">
              Contact
            </Link>
          </div>
        </div>
        <div>
          <div className="footer-heading">Legal</div>
          <div className="footer-links">
            <Link to="/privacy" className="footer-link">
              Privacy Policy
            </Link>
            <Link to="/terms" className="footer-link">
              Terms of Service
            </Link>
            <Link to="/editorial-policy" className="footer-link">
              Editorial Policy
            </Link>
            <Link to="/corrections" className="footer-link">
              Corrections Policy
            </Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-copy">© 2026 AutoXec · media@autoxec.in · autoxec.in</div>
        <div className="social-links">
          <a className="social-btn" href="https://instagram.com/autoxec" target="_blank" rel="noreferrer">
            <InstagramIcon /> @autoxec
          </a>
          <a className="social-btn" href="https://youtube.com/@autoxec" target="_blank" rel="noreferrer">
            <YouTubeIcon /> YouTube
          </a>
          <a
            className="social-btn"
            href="https://linkedin.com/company/autoxec"
            target="_blank"
            rel="noreferrer"
          >
            <LinkedInIcon /> LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
