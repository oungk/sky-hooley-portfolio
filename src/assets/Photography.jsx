import SiteNav from './SiteNav'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Slider from "react-slick";
import DecalPic from './imgs/pics-decal.png'

const DATA_URL = `${import.meta.env.BASE_URL}data/photography.json`
const COLUMN_GAP = 100

function driveImageUrl(fileId) {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w2000`
}

function idsFrom(data, key) {
  const rows = Array.isArray(data?.[key]) ? data[key] : []
  return rows.map((row) => row?.image_id).filter(Boolean)
}

function ScrollRow({ ids, visibleCount }) {
  const sectionRef = useRef(null)
  const frameRef = useRef(null)
  const navOffsetRef = useRef(0)
  const [progress, setProgress] = useState(0)
  const [stageHeight, setStageHeight] = useState(() => window.innerHeight)
  const [frameWidth, setFrameWidth] = useState(() => window.innerWidth)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useLayoutEffect(() => {
    const measure = () => {
      const nav = document.querySelector('.photography-nav')
      const navBottom = nav?.getBoundingClientRect().bottom ?? 0
      const nextStage = Math.round(Math.max(0, window.innerHeight - navBottom))
      const nextFrame = Math.round(frameRef.current?.clientWidth ?? window.innerWidth)
      navOffsetRef.current = navBottom
      setStageHeight((prev) => (prev === nextStage ? prev : nextStage))
      setFrameWidth((prev) => (prev === nextFrame ? prev : nextFrame))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [ids.length, visibleCount])

  useEffect(() => {
    if (reduceMotion) return
    const section = sectionRef.current
    if (!section || stageHeight <= 0) return

    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect()
        const pinDistance = rect.height - stageHeight
        const next = pinDistance <= 0
          ? 0
          : Math.min(1, Math.max(0, (navOffsetRef.current - rect.top) / pinDistance))
        setProgress(next)
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [reduceMotion, stageHeight, frameWidth, ids.length, visibleCount])

  if (ids.length === 0) return null

  const imageWidth = frameWidth > 0
    ? (frameWidth - COLUMN_GAP * (visibleCount - 1)) / visibleCount
    : 0
  const travel = Math.max(0, ids.length - visibleCount) * (imageWidth + COLUMN_GAP)
  const sectionHeight = stageHeight + travel
  const x = reduceMotion ? 0 : -progress * travel
  const trackWidth = imageWidth > 0
    ? ids.length * imageWidth + Math.max(0, ids.length - 1) * COLUMN_GAP
    : '100%'

  return (
    <section
      ref={sectionRef}
      style={{ height: reduceMotion ? 'auto' : sectionHeight }}
    >
      <div
        ref={frameRef}
        style={{
          position: reduceMotion ? 'relative' : 'sticky',
          top: reduceMotion ? undefined : navOffsetRef.current,
          height: reduceMotion ? '70vh' : stageHeight,
          overflow: reduceMotion ? 'auto' : 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: COLUMN_GAP,
            height: '100%',
            width: trackWidth,
            transform: reduceMotion ? undefined : `translate3d(${x}px, 0, 0)`,
          }}
        >
          {ids.map((id) => (
            <img
              key={id}
              src={driveImageUrl(id)}
              alt=""
              style={{
                flex: '0 0 auto',
                width: imageWidth || `${100 / visibleCount}%`,
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Photography({ currentPage }) {
  const [vertical, setVertical] = useState([])
  const [horizontal, setHorizontal] = useState([])
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
        if (cancelled) return
        setVertical(idsFrom(data, 'vertical'))
        setHorizontal(idsFrom(data, 'horizontal'))
        setPhotos(idsFrom(data, 'all'))
        setLoadedIndexes(new Set([0]))
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
      position: 'relative'
    }}>
    <div
      className="photography-nav"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        background: 'white',
        padding: '2rem 1rem 0',
      }}
    >
      <SiteNav currentPage={currentPage} />
    </div>

    {!loadError && vertical.length > 0 && (
      <ScrollRow ids={vertical} visibleCount={3} />
    )}
    {!loadError && horizontal.length > 0 && (
      <ScrollRow ids={horizontal} visibleCount={2} />
    )}

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

  </div>
  );
}