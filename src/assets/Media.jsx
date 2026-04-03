export default function Media() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#73D1F5',
      color: 'white',
      fontFamily: "'Courier New', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
      padding: '2rem 1rem',
      position: 'relative'
    }}>
      {/* Nav - Top Left */}
    <nav style={{
      position: 'absolute',
      top: '2rem',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '1.5rem',
      fontSize: '16px',
      zIndex: 10,
    }}>
      <a href="#" style={{color: 'white', textDecoration: 'none', fontWeight: 'normal'}} onMouseOver={(e) => e.target.style.fontWeight = 'bold'} onMouseOut={(e) => e.target.style.fontWeight = 'normal'} onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('navigate', { detail: 'home' })); }}>home</a>
      <a href="#" style={{color: 'white', textDecoration: 'none', fontWeight: 'normal'}} onMouseOver={(e) => e.target.style.fontWeight = 'bold'} onMouseOut={(e) => e.target.style.fontWeight = 'normal'} onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('navigate', { detail: 'my work' })); }}>my work</a>
      <a href="#" style={{color: 'white', textDecoration: 'none', fontWeight: 'normal'}} onMouseOver={(e) => e.target.style.fontWeight = 'bold'} onMouseOut={(e) => e.target.style.fontWeight = 'normal'} onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('navigate', { detail: 'zine' })); }}>zine</a>
      <a href="#" style={{color: 'white', textDecoration: 'none', fontWeight: 'normal'}} onMouseOver={(e) => e.target.style.fontWeight = 'bold'} onMouseOut={(e) => e.target.style.fontWeight = 'normal'} onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('navigate', { detail: "media i'm consuming" })); }}>media i'm consuming</a>
      <a href="#" style={{color: 'white', textDecoration: 'none', fontWeight: 'normal'}} onMouseOver={(e) => e.target.style.fontWeight = 'bold'} onMouseOut={(e) => e.target.style.fontWeight = 'normal'} onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('navigate', { detail: "film photography" })); }}>film photography</a>
    </nav>

      {/* 📸 Main content - Centered Layout */}
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

      {/* Sky Hooley Name */}
      <h1 style={{
        fontSize: '70px',
        fontFamily: "'Luxurious Script', cursive",
        color: 'white',
        fontWeight: 'normal',
        margin: 0,
        textAlign: 'center'
      }}>
        Media I'm Consuming
      </h1>

      {/* Image */}
      {/*
      <img
        src={homeImage}
        alt="Sky Hooley"
        style={{
          width: '200px',
          height: '200px',
          objectFit: 'cover',
        }}
      />
      */}

      {/* Description text */}
      <p style={{
        fontSize: '16px',
        lineHeight: '1.625',
        textAlign: 'center',
        color: 'white',
        fontFamily: "'Courier New', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
        fontWeight: 'normal',
        maxWidth: '400px',
        margin: 0
      }}>
        TKTKTK.
      </p>

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