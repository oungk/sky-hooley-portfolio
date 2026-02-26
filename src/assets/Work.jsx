import React from 'react';

export default function Work() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'white',
      color: '#3E0230',
      fontFamily: "'Courier New', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
      padding: '2rem',
      position: 'relative'
    }}>
      {/* 🧭 Nav - Top Left */}
      <nav style={{
        position: 'absolute',
        top: '2rem',
        left: '2rem',
        display: 'flex',
        gap: '1.5rem',
        fontSize: '16px',
        zIndex: 10
      }}>
        <a href="#" style={{color: '#3E0230', textDecoration: 'none', fontWeight: 'normal'}} onMouseOver={(e) => e.target.style.fontWeight = 'bold'} onMouseOut={(e) => e.target.style.fontWeight = 'normal'} onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('navigate', { detail: 'home' })); }}>home</a>
        <a href="#" style={{color: '#3E0230', textDecoration: 'none', fontWeight: 'bold'}} onMouseOver={(e) => e.target.style.fontWeight = 'bold'} onMouseOut={(e) => e.target.style.fontWeight = 'bold'} onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('navigate', { detail: 'work' })); }}>work</a>
        <a href="#" style={{color: '#3E0230', textDecoration: 'none', fontWeight: 'normal'}} onMouseOver={(e) => e.target.style.fontWeight = 'bold'} onMouseOut={(e) => e.target.style.fontWeight = 'normal'} onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('navigate', { detail: 'bylines' })); }}>bylines</a>
        <a href="#" style={{color: '#3E0230', textDecoration: 'none', fontWeight: 'normal'}} onMouseOver={(e) => e.target.style.fontWeight = 'bold'} onMouseOut={(e) => e.target.style.fontWeight = 'normal'} onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('navigate', { detail: 'contact' })); }}>contact me</a>
      </nav>

      {/* Main Content Container */}
      <div className="main-content-container" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      minHeight: '100vh',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem',
      paddingLeft: '4rem',
      paddingTop: '4rem'
    }}>
        {/* Main Title */}
        <h1 style={{
          fontSize: '70px',
          fontFamily: "'Luxurious Script', cursive",
          color: '#3E0230',
          fontWeight: 'normal',
          margin: '0 0 3rem 0',
          textAlign: 'left'
        }}>
          What I'm doing...
        </h1>

        {/* Work Section */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '16px',
            fontFamily: "'Courier New', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
            color: '#3E0230',
            fontWeight: 'bold',
            margin: '0 0 1rem 0'
          }}>
            work
          </h2>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            <li style={{
              fontSize: '16px',
              fontFamily: "'Courier New', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
              color: '#3E0230',
              fontWeight: 'normal',
              marginBottom: '0.5rem'
            }}>
              property tax data reporting @ <em>Houston Chronicle</em> (current)
            </li>
            <li style={{
              fontSize: '16px',
              fontFamily: "'Courier New', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
              color: '#3E0230',
              fontWeight: 'normal',
              marginBottom: '0.5rem'
            }}>
              interactive news technology @ <em>The New York Times</em> 
            </li>
            <li style={{
              fontSize: '16px',
              fontFamily: "'Courier New', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
              color: '#3E0230',
              fontWeight: 'normal',
              marginBottom: '0.5rem'
            }}>
            games software engineering + data analytics @ <em>The New York Times</em>
            </li>
            <li style={{
              fontSize: '16px',
              fontFamily: "'Courier New', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
              color: '#3E0230',
              fontWeight: 'normal',
              marginBottom: '0.5rem'
            }}>
            election analytics @ <em>The New York Times</em>
            </li>
            <li style={{
              fontSize: '16px',
              fontFamily: "'Courier New', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
              color: '#3E0230',
              fontWeight: 'normal',
              marginBottom: '0.5rem'
            }}>
              data reporting + news engineering @ <em>The Vanderbilt Hustler</em>
            </li>
            <li style={{
              fontSize: '16px',
              fontFamily: "'Courier New', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
              color: '#3E0230',
              fontWeight: 'normal',
              marginBottom: '0.5rem'
            }}>
              investigative data reporting @ <em>The Indianapolis Star</em> and <em>Dow Jones News Fund</em>
            </li>
            <li style={{
              fontSize: '16px',
              fontFamily: "'Courier New', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
              color: '#3E0230',
              fontWeight: 'normal',
              marginBottom: '0.5rem'
            }}>
              data analysis + web development @ <em>Vanderbilt Data Science Institute</em>
            </li>
          </ul>
        </div>

        {/* Research Section */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '16px',
            fontFamily: "'Courier New', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
            color: '#3E0230',
            fontWeight: 'bold',
            margin: '0 0 1rem 0'
          }}>
            research
          </h2>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            <li style={{
              fontSize: '16px',
              fontFamily: "'Courier New', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
              color: '#3E0230',
              fontWeight: 'normal',
              marginBottom: '0.5rem'
            }}>
              climate + machine learning research @ <em>Research on Conflict and Collective Action Lab</em>
            </li>
            <li style={{
              fontSize: '16px',
              fontFamily: "'Courier New', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
              color: '#3E0230',
              fontWeight: 'normal',
              marginBottom: '0.5rem'
            }}>
              survey research @ <em>Latin American Public Opinion Lab</em>
            </li>
            <li style={{
              fontSize: '16px',
              fontFamily: "'Courier New', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
              color: '#3E0230',
              fontWeight: 'normal',
              marginBottom: '0.5rem'
            }}>
              reporting @ <em>Since Parkland Project</em>
            </li>
          </ul>
        </div>

        {/* More Section */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '16px',
            fontFamily: "'Courier New', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
            color: '#3E0230',
            fontWeight: 'bold',
            margin: '0 0 1rem 0'
          }}>
            more
          </h2>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            <li style={{
              fontSize: '16px',
              fontFamily: "'Courier New', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
              color: '#3E0230',
              fontWeight: 'normal',
              marginBottom: '0.5rem'
            }}>
              community building @ <em>Kappa Theta Pi Technology Fraternity</em>
            </li>
            <li style={{
              fontSize: '16px',
              fontFamily: "'Courier New', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
              color: '#3E0230',
              fontWeight: 'normal',
              marginBottom: '0.5rem'
            }}>
              creative writing mentoring @ <em>SUNHOUSE LITERARY</em>
            </li>
            <li style={{
              fontSize: '16px',
              fontFamily: "'Courier New', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
              color: '#3E0230',
              fontWeight: 'normal',
              marginBottom: '0.5rem'
            }}>
              freelance web design @ various
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Responsive Styles */}
      <style>{`
        em {
            color: #3E0230 !important;
            font-style: italic;
        }
        nav a {
            color: #3E0230 !important;
        }
        .subtitle {
            color: #3E0230 !important;
        }
        @media (max-width: 767px) {
            nav {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            justify-content: center !important;
            margin-bottom: 2rem !important;
            }
            .main-content-container {
            padding-left: 1rem !important;
            padding-top: 1rem !important;
            }
            h1 {
            font-size: 45px !important;
            margin-top: 0 !important;
            }
        }
       `}</style>
    </div>
  );
}