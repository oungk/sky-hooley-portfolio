import './App.css'
import { useState, useEffect } from 'react'
import Home from './assets/Home'
import Experience from './assets/Experience'
import Media from './assets/Media'
import Photography from './assets/Photography'
import Zine from './assets/Zine'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  useEffect(() => {
    const handleNavigate = (event) => {
      setCurrentPage(event.detail)
    }

    window.addEventListener('navigate', handleNavigate)
    return () => window.removeEventListener('navigate', handleNavigate)
  }, [])

  const renderPage = () => {
    switch (currentPage) {
      case 'my work':
        return <Experience />
      case "media i'm consuming":
        return <Media />
      case 'film photography':
        return <Photography />
      case 'zine':
        return <Zine />
      default:
        return <Home />
    }
  }

  return (
    <div className="min-h-screen bg-[#3E0230] w-full">
      {renderPage()}
    </div>
  )
}

export default App;