import { useMemo } from 'react'
import { useSiteData } from '../context/SiteDataContext'

export function BreakingTicker() {
  const { tickerItems } = useSiteData()
  const tickerDup = useMemo(() => [...tickerItems, ...tickerItems], [tickerItems])

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-label mono">LIVE</div>
      <div className="ticker-track">
        <div className="ticker-inner">
          {tickerDup.map((text, i) => (
            <span key={`${text}-${i}`} className="ticker-item">
              {text}
              <span className="ticker-dot" aria-hidden>
                {' '}
                ●{' '}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
