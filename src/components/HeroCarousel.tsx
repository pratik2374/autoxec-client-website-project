import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import type { HeroSlide } from '../data'
import { articleUrl } from '../lib/site'

const ROTATE_MS = 6500

type Props = {
  slides: readonly HeroSlide[]
}

export function HeroCarousel({ slides }: Props) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const len = slides.length
  const slide = slides[active]

  const go = useCallback(
    (i: number) => {
      if (!len) return
      setActive(((i % len) + len) % len)
    },
    [len],
  )

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (paused || len <= 1 || reduceMotion) return
    tickRef.current = setInterval(() => {
      setActive((a) => (a + 1) % len)
    }, ROTATE_MS)
    return () => {
      if (tickRef.current) clearInterval(tickRef.current)
    }
  }, [paused, len])

  useEffect(() => {
    if (active >= len) setActive(0)
  }, [active, len])

  if (!slide) return null

  return (
    <div
      className="hero-main hero-carousel"
      aria-roledescription="carousel"
      aria-label="Featured stories"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="hero-slides">
        {slides.map((s, i) => (
          <div key={s.slug} className={`hero-slide${i === active ? ' hero-slide--active' : ''}`}>
            <img
              src={s.imageUrl}
              alt=""
              className="hero-slide-img"
              decoding="async"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>
      <div className="hero-overlay" aria-hidden />

      <div className="hero-content hero-content--floating">
        <Link to={`/category/${slide.categoryPath}`} className="hero-cat-link">
          <span className={`cat-badge ${slide.categoryClass}`}>{slide.category}</span>
        </Link>
        <Link to={articleUrl(slide.slug)} className="hero-story-block hero-story-block--stretch">
          <h1 className="hero-title">{slide.title}</h1>
          <div className="hero-meta">
            <span className="live-dot" aria-hidden />
            <span>{slide.author}</span>
            <span aria-hidden>·</span>
            <span className="mono">{slide.readTime}</span>
            <span aria-hidden>·</span>
            <span className="mono">{slide.upvotes}</span>
          </div>
        </Link>
        {len > 1 ? (
          <div className="hero-dots" role="tablist" aria-label="Choose featured story">
            {slides.map((s, i) => (
              <button
                key={s.slug}
                type="button"
                role="tab"
                aria-selected={i === active}
                className={`hero-dot${i === active ? ' hero-dot--active' : ''}`}
                aria-label={`Story ${i + 1}: ${s.title.slice(0, 52)}${s.title.length > 52 ? '…' : ''}`}
                onClick={() => go(i)}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
