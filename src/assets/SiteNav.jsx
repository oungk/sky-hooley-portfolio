const NAV_STYLE = {
	display: 'flex',
	justifyContent: 'center',
	flexWrap: 'wrap',
	gap: '1.5rem',
	fontSize: '16px',
	zIndex: 10,
	width: '100%',
	marginBottom: '2rem',
  }
  
  export const NAV_LINKS = [
	{ detail: 'home', label: 'home' },
	{ detail: 'my work', label: 'my work' },
	{ detail: 'my zine', label: 'my zine' },
	{ detail: 'my pics', label: 'my pics' },
  ]
  
  export default function SiteNav({ currentPage, links = NAV_LINKS, linkColor }) {
	return (
	  <nav className="site-nav" style={NAV_STYLE}>
		{links.map(({ detail, label }) => (
		  <a
			key={detail}
			href="#"
			aria-current={currentPage === detail ? 'page' : undefined}
			style={{
			  textDecoration: 'none',
			  fontWeight: 'normal',
			  ...(linkColor !== undefined ? { color: linkColor } : {}),
			}}
			onClick={(e) => {
			  e.preventDefault()
			  window.dispatchEvent(new CustomEvent('navigate', { detail }))
			}}
		  >
			{label}
		  </a>
		))}
	  </nav>
	)
  }