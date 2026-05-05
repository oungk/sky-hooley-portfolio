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
        return <Experience currentPage={currentPage} />
      case "my favs":
        return <Media currentPage={currentPage} />
      case 'my pics':
        return <Photography currentPage={currentPage} />
      case 'my zine':
        return <Zine currentPage={currentPage} />
      case 'home':
        return <Home currentPage={currentPage} />
      default:
        return <Home currentPage={currentPage} />
    }
  }

  return (
    <div className="min-h-screen w-full">
      {renderPage()}
    </div>
  )
}

export default App;