import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Lists from './pages/Lists'

function App() {
  return (
    <BrowserRouter>
      <div className="app-container h-screen w-screen" style={{ height: '100vh', width: '100vw' }}>
        <Navbar style={{ height: '3rem' }} />
        <div className="app-content" style={{ height: 'calc(100vh - 3rem)' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/lists" element={<Lists />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
