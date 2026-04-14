import { FormEvent, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { categoryToPathSlug } from '../lib/site'
import { useToast } from '../context/ToastContext'
import { useSiteData } from '../context/SiteDataContext'

export function SiteNav() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const showToast = useToast()
  const { categories } = useSiteData()
  const [q, setQ] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { slug: 'all', title: 'All' },
    ...categories.map(c => ({ slug: c.slug, title: c.title }))
  ]


  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const isNavActive = (slug: string) => {
    if (slug === 'all') return pathname === '/'
    return pathname === `/category/${categoryToPathSlug(slug)}`
  }

  const onSearch = (e: FormEvent) => {
    e.preventDefault()
    const query = q.trim()
    if (!query) {
      showToast('Type a search query')
      return
    }
    navigate(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <>
      <nav className="nav" aria-label="Primary">
        <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
          <div className="nav-logo-text condensed">
            AUTO<span>XEC</span>
          </div>
          <div className="nav-tag mono">MOBILITY INTELLIGENCE</div>
        </Link>

        <div className="nav-links">
          {navItems.map(({ slug, title }) =>
            slug === 'all' ? (
              <Link
                key={slug}
                to="/"
                className={`nav-link${isNavActive(slug) ? ' active' : ''}`}
              >
                {title}
              </Link>
            ) : (
              <Link
                key={slug}
                to={`/category/${categoryToPathSlug(slug)}`}
                className={`nav-link${isNavActive(slug) ? ' active' : ''}`}
              >
                {title}
              </Link>
            ),
          )}
        </div>

        <div className="nav-right">
          <form className="nav-search-form" onSubmit={onSearch}>
            <label htmlFor="site-search" className="visually-hidden">
              Search AutoXec
            </label>
            <input
              id="site-search"
              className="search-box"
              placeholder="Search AutoXec..."
              autoComplete="off"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </form>
          <Link to="/subscribe" className="nav-btn" style={{ textAlign: 'center' }}>
            SUBSCRIBE
          </Link>
          <button
            type="button"
            className="nav-menu-toggle"
            aria-expanded={menuOpen}
            aria-label="Open menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`nav-overlay${menuOpen ? ' open' : ''}`} role="dialog" aria-label="Menu">
        {navItems.map(({ slug, title }) =>
          slug === 'all' ? (
            <Link key={slug} to="/" className={`nav-link${isNavActive(slug) ? ' active' : ''}`}>
              {title}
            </Link>
          ) : (
            <Link
              key={slug}
              to={`/category/${categoryToPathSlug(slug)}`}
              className={`nav-link${isNavActive(slug) ? ' active' : ''}`}
            >
              {title}
            </Link>
          ),
        )}
        <Link to="/subscribe" className="nav-btn" style={{ marginTop: 16 }}>
          SUBSCRIBE
        </Link>
      </div>
    </>
  )
}
