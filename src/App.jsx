import './App.css'
import { Routes, Route } from 'react-router-dom'

import Home from './assets/Home'
import Experience from './assets/Experience'
import Photography from './assets/Photography'
import Bio from './assets/Bio'

function App() {
  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/my-work" element={<Experience />} />
    <Route path="/my-pics" element={<Photography />} />
    <Route path="/me" element={<Bio />} />
  </Routes>
  )
}

export default App;