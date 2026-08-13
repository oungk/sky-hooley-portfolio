import bioBackground from './imgs/bio-background.png';
import bioPortrait from './imgs/sky-bio-picture.png';
import bioPortraitSecondary from './imgs/sky-bio-picture-secondary.png'

import SiteNav from './SiteNav'

export default function Bio({currentPage }) {
  return (
    <div style={{
      minHeight: '100vh',
      color: 'white',
      fontFamily: "Times New Roman",
      padding: '2rem 1rem',
      position: 'relative',
      backgroundImage: `url(${bioBackground})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>

    {/* Nav */}
    <SiteNav currentPage={currentPage} />

      {/* Main content - Centered Layout */}
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      // justifyContent: 'center',
      gap: '2rem',
      width: '100%',
      maxWidth: '800px',
      minHeight: '100vh',
      margin: '0 auto',
    }}>

      {/* Body */}
      <div
        className="bio-body"
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: '2rem',
          width: '100%',
        }}
      >
        <div
          className="bio-portrait"
          style={{
            position: 'relative',
            width: '240px',
            flexShrink: 0,
          }}
        >
          <img
            className="bio-portrait-primary"
            src={bioPortrait}
            alt="Sky Hooley"
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
            }}
          />
          <img
            className="bio-portrait-secondary"
            src={bioPortraitSecondary}
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0,
              transition: 'opacity 0.25s ease',
            }}
          />
          <span
            className="bio-portrait-hint"
            style={{
              position: 'absolute',
              top: '0.75rem',
              left: '1rem',
              fontFamily: "'Ballet', cursive",
              fontSize: '28px',
              color: 'white',
              textAlign: 'center',
              pointerEvents: 'none',
              textShadow: '0 1px 8px rgba(0,0,0,0.45)',
              transition: 'opacity 0.25s ease',
            }}
          >
            hover for more
          </span>
        </div>
        <div
          className="bio-text"
          style={{ justifyContent: 'center' }}
        >
          <p><strong>
          sky is a los angeles-based creative and music industry professional skilled in creative project management and marketing. sky has experience strategizing with artists on the road, on set, in the studio, and beyond. he currently works at PULSE Records in artist marketing, and his background is in live music touring at William Morris Endeavor.
          </strong></p>
          <br></br>
          <p><strong>
          he has worked on tours of all sizes and across the globe, from small house shows in Nashville to clubs in LA, from theaters in London to arenas in Malaysia. sky is passionate about communicating an artist’s vision precisely, whether that means pairing artists with the right writers for sessions, booking them in the right rooms, or making the right visuals for new releases.
          </strong></p>
        </div>
      </div>


    </div>

    {/* Mobile Responsive Styles */}
    <style>{`
      .bio-portrait:hover .bio-portrait-secondary {
        opacity: 1 !important;
      }
      .bio-portrait:hover .bio-portrait-hint {
        opacity: 0;
      }
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