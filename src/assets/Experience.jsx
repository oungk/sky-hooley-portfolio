import { useEffect, useMemo, useState } from 'react'
import SiteNav from './SiteNav'

import cassette from './work/cassette.png'
import headphones from './work/Headphones.png'
import microphone from './work/mic.png'
import guitar from './work/PumpAction.png'
import radio from './work/wme.png'
import record from './work/record.gif'

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
    fontFamily: "Times New Roman",
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

    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
    <img src={headphones} alt="" style={{ position: 'absolute', top: '4%', left: '8%', width: '280px', transform: 'translate(-50%, -50%)' }} />
    <img src={headphones} alt="" style={{ position: 'absolute', top: '-6%', left: '100%', width: '280px', transform: 'translate(-70%, 0) rotate(270deg)' }} />
    <img src={cassette} alt="" style={{ position: 'absolute', top: '22%', left: '50%', width: '220px', transform: 'translate(-50%, -50%)' }} />
    <img src={guitar} alt="" style={{ position: 'absolute', top: '62%', left: '12%', width: '400px', transform: 'translate(-50%, -50%) rotate(30deg)' }} />
    <img src={radio} alt="" style={{ position: 'absolute', top: '70%', left: '48%', width: '250px', transform: 'translate(-50%, -50%)' }} />
    <img src={microphone} alt="" style={{ position: 'absolute', top: '68%', left: '88%', width: '140px', transform: 'translate(-50%, -50%)' }} />
    <img src={record} alt="" style={{ position: 'absolute', top: '40%', left: '78%', width: '160px', transform: 'translate(-50%, -50%)' }} />
  </div>

      {/* Main content - Centered Layout */}
      <div
  className="experience-columns"
  style={{
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: '4rem',
    width: '100%',
    maxWidth: '1100px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
  }}
>
  <div style={{ flex: '1 1 0', maxWidth: '360px', textAlign: 'center' }}>
    <h2 style={{
      fontWeight: 'normal',
      margin: 0,
      textAlign: 'center',
      fontFamily: 'Ballet',
      fontSize: '50px',
      lineHeight: 0.5,
    }}>
      experience
    </h2>

    <div style={{ width: '100%', textAlign: 'center', color: 'black', marginTop: '2rem' }}>
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
  </div>

  <div
    className="experience-skills"
    style={{ flex: '1 1 0', maxWidth: '360px', textAlign: 'center', paddingTop: '10rem' }}
  >
    <h2 style={{
      fontWeight: 'normal',
      margin: 0,
      textAlign: 'center',
      fontFamily: 'Ballet',
      fontSize: '50px',
      lineHeight: 0.5,
    }}>
      skills
    </h2>
    <div style={{
      width: '100%',
      textAlign: 'center',
      color: 'black',
      fontSize: '16px',
      lineHeight: 1.6,
      whiteSpace: 'pre-line',
      marginTop: '2rem',
    }}>
      {skills.map((row) => skillText(row)).filter(Boolean).join('\n')}
    </div>
  </div>
</div>

      <style>{`
  @media (max-width: 767px) {
    .experience-columns {
      flex-direction: column !important;
      align-items: center !important;
    }
    .experience-skills {
      padding-top: 0 !important;
    }
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