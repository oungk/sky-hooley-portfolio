import './App.css'
import { useState, useEffect } from 'react'
import Home from './assets/Home'
import Work from './assets/Work'
import Contact from './assets/Contact'
import Bylines from './assets/Bylines'

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
      case 'work':
        return <Work />
      case 'contact':
        return <Contact />
      case 'bylines':
        return <Bylines />
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