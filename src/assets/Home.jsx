import homeBackground from './imgs/home-background.gif';

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#73D1F5',
      color: 'white',
      fontFamily: "'Courier New', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
      padding: '2rem 1rem',
      position: 'relative',
      backgroundImage: `url(${homeBackground})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      {/* Nav - Top Left */}
    <nav style={{
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '1.5rem',
      fontSize: '16px',
      zIndex: 10,
      width: '100%',
      marginBottom: '2rem',
    }}>
      <a href="#" style={{textDecoration: 'none', fontWeight: 'normal'}} onMouseOver={(e) => e.target.style.fontWeight = 'bold'} onMouseOut={(e) => e.target.style.fontWeight = 'normal'} onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('navigate', { detail: 'home' })); }}>home</a>
      <a href="#" style={{textDecoration: 'none', fontWeight: 'normal'}} onMouseOver={(e) => e.target.style.fontWeight = 'bold'} onMouseOut={(e) => e.target.style.fontWeight = 'normal'} onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('navigate', { detail: 'my work' })); }}>my work</a>
      <a href="#" style={{textDecoration: 'none', fontWeight: 'normal'}} onMouseOver={(e) => e.target.style.fontWeight = 'bold'} onMouseOut={(e) => e.target.style.fontWeight = 'normal'} onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('navigate', { detail: 'zine' })); }}>zine</a>
      <a href="#" style={{textDecoration: 'none', fontWeight: 'normal'}} onMouseOver={(e) => e.target.style.fontWeight = 'bold'} onMouseOut={(e) => e.target.style.fontWeight = 'normal'} onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('navigate', { detail: "media i'm consuming" })); }}>media i'm consuming</a>
      <a href="#" style={{textDecoration: 'none', fontWeight: 'normal'}} onMouseOver={(e) => e.target.style.fontWeight = 'bold'} onMouseOut={(e) => e.target.style.fontWeight = 'normal'} onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('navigate', { detail: "film photography" })); }}>film photography</a>
    </nav>

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
          flex-wrap: wrap;
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