import { Link, useLocation } from 'react-router-dom'

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
  { to: '/', label: 'home' },
  { to: '/my-work', label: 'my work' },
  { to: 'https://americanboydoll.studio/', label: 'my zine' },
  { to: '/my-pics', label: 'my pics' },
  { to: '/me', label: 'me' },
]

export default function SiteNav({ links = NAV_LINKS, linkColor }) {
	const { pathname } = useLocation()
  
	const linkStyle = {
	  textDecoration: 'none',
	  fontWeight: 'normal',
	  ...(linkColor !== undefined ? { color: linkColor } : {}),
	}
  
	return (
	  <nav className="site-nav" style={NAV_STYLE}>
		{links.map(({ to, label }) => {
		  const isExternal = to.startsWith('http')
  
		  if (isExternal) {
			return (
			  <a
				key={to}
				href={to}
				target="_blank"
				rel="noopener noreferrer"
				style={linkStyle}
			  >
				{label}
			  </a>
			)
		  }
  
		  return (
			<Link
			  key={to}
			  to={to}
			  aria-current={pathname === to ? 'page' : undefined}
			  style={linkStyle}
			>
			  {label}
			</Link>
		  )
		})}
	  </nav>
	)
  }