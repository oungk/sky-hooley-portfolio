import SiteNav from './SiteNav'
import { useEffect, useState } from 'react'
import Slider from "react-slick";

const DATA_URL = `${import.meta.env.BASE_URL}data/photography.json`

function driveImageUrl(fileId) {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w2000`
}

export default function Photography({currentPage }) {
  const [photos, setPhotos] = useState([])
  const [loadError, setLoadError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoadError(null)
    fetch(DATA_URL, { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error(`Could not load ${DATA_URL}`)
        return res.json()
      })
      .then((data) => {
        if (!cancelled && Array.isArray(data)) {
          const ids = data
            .map((row) => row?.image_id)
          setPhotos(ids)
        }
      })
      .catch((err) => {
        if (!cancelled) setLoadError(err.message || String(err))
      })
    return () => {
      cancelled = true
    }
  }, [])

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
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
      background: '#c9dbff',
    }}>

      {!loadError && photos.length > 0 && (
        <div
          style={{
            width: '100%',
            maxWidth: '800px',
            boxSizing: 'border-box',
            border: '3px solid #c9dbff',
            borderRadius: '8px',
            padding: '12px',
          }}
        >
          <Slider {...settings} className="photography-slider" style={{ width: '100%' }}>
            {photos.map((id) => (
              <div key={id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '70vh',
              }}>
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
              </div>
            ))}
          </Slider>
        </div>
      )}
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