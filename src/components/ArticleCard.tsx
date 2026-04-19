import type { MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Article } from '../types'
import { articleUrl, categoryToPathSlug } from '../lib/site'

function formatVotes(n: number): string {
  return n.toLocaleString('en-IN')
}

type Props = {
  article: Article
  upvoted: boolean
  onUpvote: (e: MouseEvent) => void
  onShare: (e: MouseEvent, slug: string) => void
}

export function ArticleCard({ article, upvoted, onUpvote, onShare }: Props) {
  const navigate = useNavigate()
  const extra = upvoted ? 1 : 0

  const go = () => navigate(articleUrl(article.slug))
  const goCategory = (e: MouseEvent) => {
    e.stopPropagation()
    navigate(`/category/${categoryToPathSlug(article.cat)}`)
  }

  return (
    <article
      className="article-card"
      data-cat={article.cat}
      onClick={go}
      onKeyDown={(e) => {
        if (e.key === 'Enter') go()
      }}
      role="link"
      tabIndex={0}
    >
      <div className="article-body">
        <div className="article-cat">
          <button
            type="button"
            className={`cat-badge ${article.badgeClass}`}
            onClick={goCategory}
            style={{ border: 'none', cursor: 'pointer', font: 'inherit' }}
          >
            {article.badge}
          </button>
          {article.deepDive ? <span className="eng-tag">DEEP DIVE</span> : null}
        </div>
        <h3 className="article-title">{article.title}</h3>
        <p className="article-excerpt">{article.excerpt}</p>
        <div className="article-actions">
          <button type="button" className={`action-btn${upvoted ? ' upvoted' : ''}`} onClick={onUpvote}>
            <span className="upvote-arrow">▲</span>{' '}
            <span className="vote-num">{formatVotes(article.upvotes + extra)}</span>
          </button>
          <button type="button" className="action-btn" onClick={(e) => onShare(e, article.slug)}>
            ↗ Share
          </button>
          <span className="read-time mono">{article.readTime}</span>
          <span className="article-meta">{article.meta}</span>
        </div>
      </div>
      <div className="article-thumb" aria-hidden>
        {article.imageUrl ? (
          <img src={article.imageUrl} alt="" className="thumb-img" loading="lazy" decoding="async" />
        ) : (
          <div className="thumb-placeholder" style={{ background: article.thumbGradient }}>
            {article.thumbLabel}
          </div>
        )}
      </div>
    </article>
  )
}
