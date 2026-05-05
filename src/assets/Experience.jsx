import { useEffect, useMemo, useState } from 'react'
import SiteNav from './SiteNav'

const DATA_URL = `${import.meta.env.BASE_URL}data/experience.json`

function collectLinks(row) {
  return Object.keys(row)
    .filter((k) => k.startsWith('link'))
    .sort()
    .map((k) => row[k])
    .filter((url) => url != null && String(url).trim() !== '')
}

function groupWorkByCategoryAndYear(work) {
  const categoryOrder = []
  const byCategory = new Map()

  for (const item of work) {
    const category = item.category?.trim() || 'uncategorized'
    const year = item.year?.trim() ?? ''

    if (!byCategory.has(category)) {
      categoryOrder.push(category)
      byCategory.set(category, { yearOrder: [], byYear: new Map() })
    }
    const block = byCategory.get(category)
    if (!block.byYear.has(year)) {
      block.yearOrder.push(year)
      block.byYear.set(year, [])
    }
    block.byYear.get(year).push(item)
  }

  return { categoryOrder, byCategory }
}

function skillText(row) {
  if (row == null) return ''
  if (typeof row.skills === 'string') return row.skills.trim()
  const v = Object.values(row).find((x) => typeof x === 'string' && x.trim())
  return v ? v.trim() : ''
}

export default function Experience({ currentPage }) {
  const [work, setWork] = useState([])
  const [skills, setSkills] = useState([])
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
        if (!cancelled) {
          setWork(Array.isArray(data.work) ? data.work : [])
          setSkills(Array.isArray(data.skills) ? data.skills : [])
        }
      })
      .catch((err) => {
        if (!cancelled) setLoadError(err.message || String(err))
      })
    return () => {
      cancelled = true
    }
  }, [])

  const grouped = useMemo(() => groupWorkByCategoryAndYear(work), [work])

  const linkStyle = {
    textDecoration: 'underline',
    fontFamily: "'Courier New', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
    color: 'black'
  }

  return (
    <div style={{
      minHeight: '100vh',
      color: 'black',
      fontFamily: "Times New Roman",
      padding: '2rem 1rem',
      position: 'relative'
    }}>
    
    {/* Nav */}
    <SiteNav currentPage={currentPage} />

      {/* Main content - Centered Layout */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        width: '100%',
        maxWidth: '800px',
        minHeight: '100vh',
        margin: '0 auto',
        padding: '2rem 1rem'
      }}>

        <h2 style={{
          fontWeight: 'normal',
          margin: 0,
          textAlign: 'center'
        }}>
          EXPERIENCE
        </h2>

        {loadError && (
          <p style={{ fontSize: '16px', margin: 0, textAlign: 'center' }}>{loadError}</p>
        )}
        {!loadError && work.length === 0 && (
          <p style={{ fontSize: '16px', margin: 0, textAlign: 'center' }}>Loading…</p>
        )}

        <div style={{ width: '100%', alignSelf: 'stretch', textAlign: 'center', color:'black' }}>
          {grouped.categoryOrder.map((category) => {
            const { yearOrder, byYear } = grouped.byCategory.get(category)
            return (
              <section key={category} style={{ width: '100%', marginBottom: '1rem' }}>
                <h2 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  margin: '0 0 1rem 0',
                  textTransform: 'capitalize',
                }}>{category}</h2>
                {yearOrder.map((year) => (
                  <div key={`${category}-${year}`} style={{ marginBottom: '1.25rem' }}>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      margin: '0 0 0.5rem 0',
                    }}>{year}</h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {byYear.get(year).map((row, idx) => {
                        const links = collectLinks(row)
                        const title = row.title ?? ''
                        return (
                          <li key={`${title}-${idx}`} style={{
                            fontSize: '16px',
                            lineHeight: 1.6,
                            marginBottom: '0.75rem',
                          }}>
                            <span>{title}</span>
                            {links.length > 0 && (
                              <>
                                <span> <br></br> </span>
                                {links.map((href, i) => (
                                  <span key={href + i}>
                                    {i > 0 && <span> </span>}
                                    <a href={href} target="_blank" rel="noopener noreferrer" style={linkStyle}>★</a>
                                  </span>
                                ))}
                              </>
                            )}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ))}
              </section>
            )
          })}
        </div>
        <h2 style={{
          fontWeight: 'normal',
          margin: 0,
          textAlign: 'center'
        }}>
          SKILLS
        </h2>
        <div
          style={{
            width: '100%',
            textAlign: 'center',
            color: 'black',
            fontSize: '16px',
            lineHeight: 1.6,
            whiteSpace: 'pre-line',
          }}
        >
          {skills.map((row) => skillText(row)).filter(Boolean).join('\n')}
        </div>
      </div>

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