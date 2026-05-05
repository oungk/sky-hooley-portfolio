import SiteNav from './SiteNav'

export default function Zine({currentPage }) {
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

      {/* Body */}
      <p>
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