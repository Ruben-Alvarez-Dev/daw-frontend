import { AlertProvider } from './context/AlertContext'
import { useState } from 'react'
import Navbar from './components/layouts/Navbar/Navbar'
import Aside from './components/layouts/Aside/Aside'
import Main from './components/layouts/Main/Main'
import Footer from './components/layouts/Footer/Footer'
import './App.css'

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <AlertProvider>
      <div className="app">
        <Navbar />
        <Aside isCollapsed={isCollapsed} onToggle={toggleSidebar} />
        <Main />
        <Footer />
      </div>
    </AlertProvider>
  )
}

export default App