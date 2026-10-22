import SiteNav from './SiteNav'
import { useEffect, useState } from 'react'
import Slider from "react-slick";
import DecalPic from './imgs/pics-decal.png'

const DATA_URL = `${import.meta.env.BASE_URL}data/photography.json`

function driveImageUrl(fileId) {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w2000`
}

export default function Photography({currentPage }) {
  const [photos, setPhotos] = useState([])
  const [loadError, setLoadError] = useState(null)
  const [loadedIndexes, setLoadedIndexes] = useState(() => new Set([0]))

  useEffect(() => {
    let cancelled = false
    setLoadError(null)
    fetch(DATA_URL, { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error(`Could not load ${DATA_URL}`)
        return res.json()
      })
      .then((data) => {
        if (!cancelled) {
          const rows = Array.isArray(data?.all) ? data.all : []
          const ids = rows
            .map((row) => row?.image_id)
            .filter(Boolean)
          setPhotos(ids)
          setLoadedIndexes(new Set([0]))
        }
      })
      .catch((err) => {
        if (!cancelled) setLoadError(err.message || String(err))
      })
    return () => {
      cancelled = true
    }
  }, [])

  const markLoaded = (index) => {
    setLoadedIndexes((prev) => {
      if (prev.has(index)) return prev
      const next = new Set(prev)
      next.add(index)
      return next
    })
  }

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: markLoaded,
  };

  return (
    <div style={{
      minHeight: '100vh',
      color: 'white',
      fontFamily: "Times New Roman",
      padding: '2rem 1rem',
      position: 'relative'
    }}>

    {/* Nav */}
    <SiteNav currentPage={currentPage} />

        {/* Main column — no maxHeight (was clipping the carousel) */}
        <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2rem',
      width: '100%',
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '2rem 1rem',
    }}>

      {!loadError && photos.length > 0 && (
        <div
          style={{
            width: '100%',
            maxWidth: '800px',
            boxSizing: 'border-box',
            padding: '12px',
          }}
        >
          <Slider {...settings} className="photography-slider" style={{ width: '100%' }}>
            {photos.map((id, index) => (
              <div key={id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '70vh',
              }}>
                {loadedIndexes.has(index) ? (
                  <img
                    src={driveImageUrl(id)}
                    alt=""
                    style={{
                      width: '100%',
                      maxHeight: '70vh',
                      objectFit: 'contain',
                      display: 'block',
                    }}
                  />
                ) : (
                  <div style={{ minHeight: '70vh' }} />
                )}
              </div>
            ))}
          </Slider>
        </div>
      )}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'black',
        }}
      >
        <img
          src={DecalPic}
          alt="Olympus Stylus 150"
          style={{
            width: '120px',
            height: 'auto',
            display: 'block',
          }}
        />
        <p style={{ margin: 0, fontSize: '18px' }}>
          shot on an olympus stylus 150
        </p>
      </div>
    </div>

    {/* Mobile Responsive Styles */}
    <style>{`
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