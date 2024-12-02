import { AlertProvider } from './context/AlertContext'
import { RestaurantsProvider } from './context/RestaurantsContext'
import { useState } from 'react'
import Navbar from './components/layouts/Navbar/Navbar'
import Aside from './components/layouts/Aside/Aside'
import Main from './components/layouts/Main/Main'
import Footer from './components/layouts/Footer/Footer'
import './App.css'

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeRestaurant, setActiveRestaurant] = useState(null)
  const [activeSection, setActiveSection] = useState('global')

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <AlertProvider>
      <RestaurantsProvider>
        <div className="app">
          <Navbar isCollapsed={isCollapsed} activeRestaurant={activeRestaurant} />
          <Aside 
            isCollapsed={isCollapsed} 
            onToggle={toggleSidebar}
            onSectionSelect={setActiveSection}
            activeSection={activeSection}
          />
          <Main 
            activeRestaurant={activeRestaurant} 
            setActiveRestaurant={setActiveRestaurant}
            activeSection={activeSection}
          />
          <Footer />
        </div>
      </RestaurantsProvider>
    </AlertProvider>
  )
}

export default App