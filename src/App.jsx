import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { AlertProvider } from './context/AlertContext'
import { RestaurantsProvider } from './context/RestaurantsContext'
import Dashboard from './views/Dashboard/Dashboard'
import Restaurants from './views/Restaurants/Restaurants'
import Tables from './views/Tables/Tables'
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
      <RestaurantsProvider>
        <Router>
          <div className="app">
            <Navbar activeRestaurant={activeRestaurant} />
            <Aside 
              isCollapsed={isCollapsed} 
              onToggle={toggleSidebar}
            />
            <Main>
              <Routes>
                <Route path="/" element={<Navigate to="/global" replace />} />
                <Route path="/global" element={<Dashboard />} />
                <Route path="/restaurants" element={<Restaurants />} />
                <Route path="/tables" element={<Tables />} />
              </Routes>
            </Main>
            <Footer />
          </div>
        </Router>
      </RestaurantsProvider>
    </AlertProvider>
  )
}

export default App