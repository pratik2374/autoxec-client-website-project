import { FormEvent, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { categoryToPathSlug } from '../lib/site'
import { useToast } from '../context/ToastContext'
import { useSiteData } from '../context/SiteDataContext'

export function SiteNav() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const showToast = useToast()
  const { navigation } = useSiteData()
  const [q, setQ] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  // Fixed navigation structure
  const isNavActive = (slug: string) => {
    return pathname === `/category/${categoryToPathSlug(slug)}`
  }


  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])



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
          <Link to="/" className={`nav-link${pathname === '/' ? ' active' : ''}`}>HOME</Link>
          {navigation?.map((nav, i) => {
            if (nav.type === 'dropdown') {
               const isActive = nav.dropdownItems?.some(s => isNavActive(s.slug))
               return (
                 <div key={i} className="nav-dropdown" onMouseEnter={() => setMenuOpen(false)}>
                   <div className={`nav-link nav-dropdown-toggle${isActive ? ' active' : ''}`} tabIndex={0}>
                     {nav.title}
                   </div>
                   <div className="nav-dropdown-content">
                     {nav.dropdownItems?.map(sub => (
                       <Link key={sub.slug} to={`/category/${categoryToPathSlug(sub.slug)}`} className={`nav-link${isNavActive(sub.slug) ? ' active' : ''}`}>
                         {sub.title}
                       </Link>
                     ))}
                   </div>
                 </div>
               )
            } else if (nav.type === 'category' && nav.categorySlug) {
               return (
                 <Link key={i} to={`/category/${categoryToPathSlug(nav.categorySlug)}`} className={`nav-link${isNavActive(nav.categorySlug) ? ' active' : ''}`}>
                   {nav.title}
                 </Link>
               )
            } else if (nav.type === 'path' && nav.path) {
               return (
                 <Link key={i} to={nav.path} className={`nav-link${pathname === nav.path || (nav.path === '/quick-reads' && pathname.includes('/quick-read')) ? ' active' : ''}`}>
                   {nav.title}
                 </Link>
               )
            }
            return null
          })}
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
        <Link to="/" className={`nav-link${pathname === '/' ? ' active' : ''}`}>HOME</Link>
        <div style={{ borderTop: '1px solid var(--border)', margin: '8px 0' }} />
        {navigation?.map((nav, i) => {
           if (nav.type === 'dropdown') {
             return (
               <div key={i}>
                 <div style={{ color: 'var(--muted)', fontSize: 12, padding: '12px 16px 4px', fontWeight: 600, letterSpacing: '1px' }}>{nav.title}</div>
                 {nav.dropdownItems?.map(sub => (
                   <Link key={sub.slug} to={`/category/${categoryToPathSlug(sub.slug)}`} className={`nav-link${isNavActive(sub.slug) ? ' active' : ''}`}>
                     {sub.title}
                   </Link>
                 ))}
                 <div style={{ borderTop: '1px solid var(--border)', margin: '8px 0' }} />
               </div>
             )
           } else if (nav.type === 'category' && nav.categorySlug) {
             return (
               <Link key={i} to={`/category/${categoryToPathSlug(nav.categorySlug)}`} className={`nav-link${isNavActive(nav.categorySlug) ? ' active' : ''}`}>
                 {nav.title}
               </Link>
             )
           } else if (nav.type === 'path' && nav.path) {
             return (
               <Link key={i} to={nav.path} className={`nav-link${pathname === nav.path || (nav.path === '/quick-reads' && pathname.includes('/quick-read')) ? ' active' : ''}`}>
                 {nav.title}
               </Link>
             )
           }
           return null
        })}
        <Link to="/subscribe" className="nav-btn" style={{ marginTop: 16 }}>
          SUBSCRIBE
        </Link>
      </div>
    </>
  )
}
