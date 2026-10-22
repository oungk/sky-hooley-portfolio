import { useEffect, useState } from 'react'
import homeBackground from './imgs/home-background.gif'
import homeBackgroundStatic from './imgs/home-background-static.png'
import homeSpinnySky from './imgs/home-spinny-sky-icon.gif'
import SiteNav from './SiteNav'

const DATA_URL = `${import.meta.env.BASE_URL}data/home.json`

export default function Home({ currentPage }) {
  const [bioText, setBioText] = useState('')
  const [loadError, setLoadError] = useState(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    let cancelled = false
    fetch(DATA_URL, { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error(`Could not load ${DATA_URL}`)
        return res.json()
      })
      .then((data) => {
        if (!cancelled) setBioText(data.bio?.[0]?.bio_text ?? '')
      })
      .catch((err) => {
        if (!cancelled) setLoadError(err.message || String(err))
      })
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const fadeDistance = Math.max(window.innerHeight * 0.85, 1)
      setScrollProgress(Math.min(1, Math.max(0, window.scrollY / fadeDistance)))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const gifOpacity = Math.max(0.001, 1 - scrollProgress)
  const staticOpacity = scrollProgress
  const bioOpacity = Math.min(1, Math.max(0, (scrollProgress - 0.35) / 0.45))

  return (
    <div style={{ position: 'relative', minHeight: '200vh', color: 'white', fontFamily: 'Times New Roman' }}>
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${homeBackground})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: gifOpacity,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${homeBackgroundStatic})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: staticOpacity,
        }} />
      </div>

      {/* Sticky nav */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          padding: '2rem 1rem 0',
        }}
      >
        <SiteNav currentPage={currentPage} />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ minHeight: '100vh' }} />
        <div style={{
          width: '100%',
          minHeight: '100vh',
          margin: 0,
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'center',
          gap: '1.5rem',
          opacity: bioOpacity,
          transform: `translateY(${(1 - bioOpacity) * 24}px)`,
          boxSizing: 'border-box',
        }}>
          <img
            src={homeSpinnySky}
            alt=""
            style={{
              display: 'block',
              width: '600px',
              maxWidth: '100%',
              height: 'auto',
              margin: '0 auto',
            }}
          />
          {loadError && <p style={{ margin: 0, padding: '0 1rem' }}>{loadError}</p>}
          {bioText && (
            <p
              style={{
                whiteSpace: 'pre-line',
                margin: 0,
                padding: '0 1rem 2rem',
                width: '100%',
                boxSizing: 'border-box',
                fontSize: '27pt',
              }}
            >
              <strong>{bioText}</strong>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
