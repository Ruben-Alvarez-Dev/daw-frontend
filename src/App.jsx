import { AlertProvider } from './context/AlertContext'
import { useState } from 'react'
import Navbar from './components/layouts/Navbar/Navbar'
import Aside from './components/layouts/Aside/Aside'
import Main from './components/layouts/Main/Main'
import Footer from './components/layouts/Footer/Footer'
import './App.css'

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeRestaurant, setActiveRestaurant] = useState(null)

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <AlertProvider>
      <div className="app">
        <Navbar activeRestaurant={activeRestaurant} />
        <Aside isCollapsed={isCollapsed} onToggle={toggleSidebar} />
        <Main 
          activeRestaurant={activeRestaurant} 
          setActiveRestaurant={setActiveRestaurant}
        />
        <Footer />
      </div>
    </AlertProvider>
  )
}

export default App