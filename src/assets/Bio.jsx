import { useEffect, useState } from 'react'
import bioBackground from './imgs/bio-background.png';
import SiteNav from './SiteNav'
const DATA_URL = `${import.meta.env.BASE_URL}data/about.json`
function driveImageUrl(fileId) {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w2000`
}

export default function Bio({currentPage }) {
  const [headshotUrl, setHeadshotUrl] = useState('')
  const [hoverUrl, setHoverUrl] = useState('')
  const [bioHtml, setBioHtml] = useState('')


  useEffect(() => {
    let cancelled = false
    fetch(DATA_URL, { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error(`Could not load ${DATA_URL}`)
        return res.json()
      })
      .then((data) => {
        if (cancelled) return
        const headshotId = data.headshot?.[0]?.image_id
        const hoverId = data.hover?.[0]?.image_id
        const text = data.bio?.[0]?.bio_text ?? ''
        setHeadshotUrl(headshotId ? driveImageUrl(headshotId) : '')
        setHoverUrl(hoverId ? driveImageUrl(hoverId) : '')
        setBioHtml(text)
      })
      .catch((err) => console.error(err))
    return () => { cancelled = true }
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      color: 'white',
      fontFamily: "Times New Roman",
      padding: '2rem 1rem',
      position: 'relative',
      backgroundImage: `url(${bioBackground})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>

    {/* Nav */}
    <SiteNav currentPage={currentPage} />

      {/* Main content - Centered Layout */}
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      // justifyContent: 'center',
      gap: '2rem',
      width: '100%',
      maxWidth: '800px',
      minHeight: '100vh',
      margin: '0 auto',
    }}>

      {/* Body */}
      <div
        className="bio-body"
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: '2rem',
          width: '100%',
        }}
      >
        <div
          className="bio-portrait"
          style={{
            position: 'relative',
            width: '240px',
            flexShrink: 0,
          }}
        >
          <img
            className="bio-portrait-primary"
            src={headshotUrl}
            alt="Sky Hooley"
            style={{ display: 'block', width: '100%', height: 'auto', objectFit: 'cover' }}
          />
          <img
            className="bio-portrait-secondary"
            src={hoverUrl}
            alt=""
            aria-hidden="true"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0, transition: 'opacity 0.25s ease' }}
          />
          <span
            className="bio-portrait-hint"
            style={{
              position: 'absolute',
              top: '0.75rem',
              left: '1rem',
              fontFamily: "'Ballet', cursive",
              fontSize: '28px',
              color: 'white',
              textAlign: 'center',
              pointerEvents: 'none',
              textShadow: '0 1px 8px rgba(0,0,0,0.45)',
              transition: 'opacity 0.25s ease',
            }}
          >
            hover for more
          </span>
        </div>
        <div className="bio-text" style={{ justifyContent: 'center' }}>
          <p>
            <strong dangerouslySetInnerHTML={{ __html: bioHtml }} />
          </p>
        </div>
      </div>


    </div>

    {/* Mobile Responsive Styles */}
    <style>{`
      .bio-portrait:hover .bio-portrait-secondary {
        opacity: 1 !important;
      }
      .bio-portrait:hover .bio-portrait-hint {
        opacity: 0;
      }
      @media (min-width: 768px) {
        .main-content {
          flex-direction: row !important;
          align-items: flex-start !important;
          gap: 3rem !important;
        }
        .image-container {
          flex-shrink: 0 !important;
        }
        .description {
          text-align: left !important;
          max-width: 400px !important;
        }
        .name {
          top: -4rem !important;
          left: -2rem !important;
          transform: none !important;
        }
      }
      @media (max-width: 767px) {
        nav {
          position: relative !important;
          top: auto !important;
          left: auto !important;
          justify-content: center !important;
          margin-bottom: 2rem !important;
        }
      }
    `}</style>
  </div>
  );
}