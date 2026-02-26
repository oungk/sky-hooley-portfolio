import React from 'react';

export default function Contact() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'white',
      color: '#3E0230',
      fontFamily: "'Courier New', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
      padding: '2rem',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
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
        <a href="#" style={{color: '#3E0230 !important', textDecoration: 'none', fontWeight: 'normal', fontFamily: "'Courier New', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace"}} onMouseOver={(e) => e.target.style.fontWeight = 'bold'} onMouseOut={(e) => e.target.style.fontWeight = 'normal'} onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('navigate', { detail: 'home' })); }}>home</a>
        <a href="#" style={{color: '#3E0230 !important', textDecoration: 'none', fontWeight: 'normal', fontFamily: "'Courier New', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace"}} onMouseOver={(e) => e.target.style.fontWeight = 'bold'} onMouseOut={(e) => e.target.style.fontWeight = 'normal'} onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('navigate', { detail: 'work' })); }}>work</a>
        <a href="#" style={{color: '#3E0230 !important', textDecoration: 'none', fontWeight: 'normal', fontFamily: "'Courier New', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace"}} onMouseOver={(e) => e.target.style.fontWeight = 'bold'} onMouseOut={(e) => e.target.style.fontWeight = 'normal'} onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('navigate', { detail: 'bylines' })); }}>bylines</a>
        <a href="#" style={{color: '#3E0230 !important', textDecoration: 'none', fontWeight: 'bold', fontFamily: "'Courier New', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace"}} onMouseOver={(e) => e.target.style.fontWeight = 'bold'} onMouseOut={(e) => e.target.style.fontWeight = 'bold'} onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('navigate', { detail: 'contact' })); }}>contact me</a>
      </nav>

      {/* Main Content - Centered */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {/* Main Title */}
        <h1 style={{
          fontSize: '70px',
          fontFamily: "'Luxurious Script', cursive",
          color: '#3E0230',
          fontWeight: 'normal',
          margin: '0 0 3rem 0',
          textAlign: 'center'
        }}>
          Where I'm at...
        </h1>

        {/* Contact Links */}
        <div style={{
          display: 'flex',
          gap: '2rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <a href="mailto:katherine.oung@gmail.com" style={{
            color: '#3E0230',
            textDecoration: 'none',
            fontSize: '16px',
            fontFamily: "'Courier New', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
            fontWeight: 'normal'
            }} onMouseOver={(e) => e.target.style.fontWeight = 'bold'} onMouseOut={(e) => e.target.style.fontWeight = 'normal'}>
            email
            </a>
          <a href="https://twitter.com/kathoung" target="_blank" rel="noopener noreferrer" style={{
            color: '#3E0230',
            textDecoration: 'none',
            fontSize: '16px',
            fontFamily: "'Courier New', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
            fontWeight: 'normal'
          }} onMouseOver={(e) => e.target.style.fontWeight = 'bold'} onMouseOut={(e) => e.target.style.fontWeight = 'normal'}>
            twitter
          </a>
          <a href="https://linkedin.com/in/katherine-oung" target="_blank" rel="noopener noreferrer" style={{
            color: '#3E0230',
            textDecoration: 'none',
            fontSize: '16px',
            fontFamily: "'Courier New', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
            fontWeight: 'normal'
          }} onMouseOver={(e) => e.target.style.fontWeight = 'bold'} onMouseOut={(e) => e.target.style.fontWeight = 'normal'}>
            linkedin
          </a>
          <a href="https://github.com/oungk" target="_blank" rel="noopener noreferrer" style={{
            color: '#3E0230',
            textDecoration: 'none',
            fontSize: '16px',
            fontFamily: "'Courier New', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
            fontWeight: 'normal'
          }} onMouseOver={(e) => e.target.style.fontWeight = 'bold'} onMouseOut={(e) => e.target.style.fontWeight = 'normal'}>
            github
          </a>
        </div>
      </div>

      {/* Mobile Responsive Styles */}
      <style>{`
        nav a {
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
          .main-title {
            font-size: 50px !important;
          }
          .contact-links {
            flex-direction: column !important;
            gap: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}