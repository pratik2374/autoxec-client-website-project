import React, { useEffect, useState } from 'react'
import './LoadingScreen.css'

interface LoadingScreenProps {
  exiting?: boolean
}

export function LoadingScreen({ exiting }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const exitingRef = React.useRef(exiting)

  // Force progress to 100% when told to exit
  useEffect(() => {
    exitingRef.current = exiting
    if (exiting) {
      setProgress(100)
    }
  }, [exiting])

  useEffect(() => {
    if (exiting) return // Stop running if we are already exiting
    let current = 0
    let timer: number

    // Recursive random timeout to mimic network load hesitation
    const updateProgress = () => {
      if (exitingRef.current) return // Immediately halt loop if we start exiting
      
      let increment = 0
      let delay = 0

      if (current < 80) {
        // FAST interval 0-80
        increment = Math.floor(Math.random() * 10) + 5
        delay = Math.floor(Math.random() * 100) + 50
      } else {
        // SLOW interval 80-100
        increment = Math.floor(Math.random() * 2) + 1
        delay = Math.floor(Math.random() * 200) + 150
      }

      current += increment

      if (current >= 100) {
        setProgress(100)
        return
      }

      setProgress(current)
      timer = window.setTimeout(updateProgress, delay)
    }

    timer = window.setTimeout(updateProgress, 100) // initial delay

    return () => clearTimeout(timer)
  }, []) // Empty dependency array so it only mounts once

  return (
    <div className={`loading-screen ${exiting ? 'exiting' : ''}`}>
      <div className="loading-content">
        <div className="loading-logo-box">
          <span className="loading-logo">
            <span style={{ color: '#fff' }}>AUTO</span>
            <span style={{ color: 'var(--red)' }}>XEC</span>
          </span>
        </div>
        <div className="loading-progress-box">
          <div className="loading-number-wrap mono">
            <span className="loading-number">{progress}</span>
          </div>
          <div className="loading-bar-wrap">
            <div className="loading-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  )
}
