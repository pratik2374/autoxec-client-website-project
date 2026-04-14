import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PortableText } from '@portabletext/react'
import { SidebarWidgets } from '../components/SidebarWidgets'
import { categoryToPathSlug } from '../lib/site'
import { articleUrl } from '../lib/site'
import { urlForImage } from '../lib/sanity/image'
import { useArticleBySlug, useSiteData } from '../context/SiteDataContext'
import { useToast } from '../context/ToastContext'
import { NotFoundPage } from './NotFoundPage'

const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <img
          alt={value.alt || ' '}
          loading="lazy"
          src={urlForImage(value) || ''}
          style={{ width: '100%', borderRadius: '8px', margin: '24px 0' }}
        />
      )
    },
  },
}
export function ArticlePage() {
  const { slug } = useParams()
  const showToast = useToast()
  const [upvoted, setUpvoted] = useState(false)
  const { articles } = useSiteData()

  const article = useArticleBySlug(slug)

  const share = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation()
      const url = `${window.location.origin}${article ? articleUrl(article.slug) : ''}`
      void navigator.clipboard?.writeText(url).catch(() => {})
      showToast('Article link copied to clipboard')
    },
    [article, showToast],
  )

  useEffect(() => {
    if (article) {
      document.title = article.seoTitle || `${article.title} | AutoXec`
      let metaDesc = document.querySelector('meta[name="description"]')
      if (!metaDesc) {
        metaDesc = document.createElement('meta')
        metaDesc.setAttribute('name', 'description')
        document.head.appendChild(metaDesc)
      }
      metaDesc.setAttribute('content', article.seoDescription || article.excerpt || '')
    }
  }, [article])

  if (!article) {
    return <NotFoundPage />
  }

  const related = articles.filter((a) => a.cat === article.cat && a.slug !== article.slug).slice(0, 3)
  const categorySlug = categoryToPathSlug(article.cat)
  const categoryLabel = article.badge

  return (
    <div className="main-layout" style={{ gridTemplateColumns: '1fr 300px' }}>
      <article className="articles-section" style={{ borderRight: '1px solid var(--border)' }}>
        <div className="breadcrumb">
          <Link to="/">HOME</Link>
          <span aria-hidden>/</span>
          <Link to={`/category/${categorySlug}`}>{categoryLabel}</Link>
          <span aria-hidden>/</span>
          <span style={{ color: 'var(--text)' }}>{article.title.slice(0, 48)}…</span>
        </div>

        <div style={{ marginBottom: 16 }}>
          <Link to={`/category/${categorySlug}`} className={`cat-badge ${article.badgeClass}`} style={{ textDecoration: 'none' }}>
            {article.badge}
          </Link>
          {article.deepDive ? <span className="eng-tag" style={{ marginLeft: 8 }}>DEEP DIVE</span> : null}
        </div>

        <h1 className="hero-title" style={{ marginBottom: 12 }}>
          {article.title}
        </h1>
        {article.deck ? <p className="page-lead">{article.deck}</p> : null}

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
          <Link to="/author/preetam" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'inherit' }}>
            <span
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'linear-gradient(135deg,var(--purple),var(--red))',
                display: 'inline-block',
              }}
            />
            <span>
              <span style={{ display: 'block', fontWeight: 600 }}>By Preetam</span>
              <span className="mono" style={{ fontSize: 11, color: 'var(--dim)' }}>
                AutoXec
              </span>
            </span>
          </Link>
          <span className="mono" style={{ fontSize: 12, color: 'var(--dim)' }}>
            {article.published ? `Published ${article.published}` : null}
            {article.updated ? ` · Updated ${article.updated}` : null}
          </span>
        </div>

        <div className="article-actions" style={{ marginBottom: 24 }}>
          <button type="button" className={`action-btn${upvoted ? ' upvoted' : ''}`} onClick={() => {
            setUpvoted((u) => {
              if (!u) showToast('Upvoted! ▲')
              return !u
            })
          }}>
            <span className="upvote-arrow">▲</span> {article.upvotes + (upvoted ? 1 : 0)}
          </button>
          <button type="button" className="action-btn" onClick={() => share()}>
            ↗ Share
          </button>
          <span className="read-time mono">{article.readTime}</span>
        </div>

        {article.imageUrl ? (
          <img
            src={article.imageUrl}
            alt=""
            className="article-hero-img"
            loading="eager"
            decoding="async"
            style={{ marginBottom: 28 }}
          />
        ) : (
          <div
            className="thumb-placeholder"
            style={{
              minHeight: 220,
              width: '100%',
              background: article.thumbGradient,
              marginBottom: 28,
              borderRadius: 6,
              fontSize: 48,
            }}
          >
            {article.thumbLabel}
          </div>
        )}

        <div className="prose">
          {article.content ? (
            <PortableText value={article.content} components={portableTextComponents} />
          ) : (
            <>
              {article.bodyParagraphs?.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
              {!article.bodyParagraphs?.length ? <p>{article.excerpt}</p> : null}
            </>
          )}
        </div>

        <blockquote className="pull-quote">
          Engineering readers do not need hype — they need boundary conditions, test method, and source traceability.
        </blockquote>

        <p className="mono" style={{ fontSize: 12, color: 'var(--dim)' }}>
          [Source: OEM workshop material / regulatory filing / on-record engineering interview — cited per story in production.]
        </p>

        {article.keyTakeaways ? (
          <div className="key-box">
            <h3 className="condensed">KEY TAKEAWAY</h3>
            <ul>
              {article.keyTakeaways.map((k) => (
                <li key={k}>{k}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="article-actions" style={{ marginTop: 32 }}>
          <button type="button" className={`action-btn${upvoted ? ' upvoted' : ''}`} onClick={() => setUpvoted((u) => !u)}>
            <span className="upvote-arrow">▲</span> {article.upvotes + (upvoted ? 1 : 0)}
          </button>
          <button type="button" className="action-btn" onClick={() => share()}>
            ↗ Share
          </button>
        </div>

        <h3 className="sidebar-title" style={{ marginTop: 40 }}>
          SHARE THIS ARTICLE
        </h3>
        <div className="filter-row">
          <a className="action-btn" href={`https://wa.me/?text=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <a
            className="action-btn"
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noreferrer"
          >
            X
          </a>
          <a
            className="action-btn"
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <button type="button" className="action-btn" onClick={() => share()}>
            Copy Link
          </button>
        </div>

        {article.tags ? (
          <div style={{ marginTop: 24 }}>
            {article.tags.map((t) => (
              <Link key={t} to={`/search?q=${encodeURIComponent(t.replace('#', ''))}`} className="topic-chip" style={{ marginRight: 8 }}>
                {t}
              </Link>
            ))}
          </div>
        ) : null}

        <div style={{ marginTop: 40, padding: 20, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6 }}>
          <strong>About the author</strong>
          <p style={{ marginTop: 8, color: 'var(--muted)' }}>
            Preetam is Founder &amp; Editor of AutoXec — focused on verifiable automotive engineering for Indian readers.
          </p>
          <a className="nav-btn" href="https://instagram.com/autoxec" target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: 12 }}>
            Follow on Instagram
          </a>
        </div>

        <h3 className="section-label" style={{ marginTop: 40, display: 'block' }}>
          YOU MIGHT ALSO LIKE
        </h3>
        <div className="cat-grid" style={{ marginTop: 16 }}>
          {related.map((a) => (
            <Link key={a.slug} to={articleUrl(a.slug)} className="cat-mini-card" style={{ textDecoration: 'none' }}>
              <div className="cat-mini-title">{a.title}</div>
              <div className="cat-mini-meta mono">{a.upvotes.toLocaleString('en-IN')} ↑</div>
            </Link>
          ))}
        </div>
      </article>

      <div>
        <div className="sidebar-section sidebar" style={{ padding: '24px 24px 0' }}>
          <div className="sidebar-title">On this page</div>
          <ul className="mono" style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.8, paddingLeft: '1.1rem' }}>
            <li>Lead &amp; deck</li>
            <li>Mechanism</li>
            <li>Pull quote</li>
            <li>Sources &amp; takeaway</li>
          </ul>
        </div>
        <SidebarWidgets />
      </div>
    </div>
  )
}
