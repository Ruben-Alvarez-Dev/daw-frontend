import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { AlertProvider } from './context/AlertContext'
import { RestaurantsProvider } from './context/RestaurantsContext'
import Dashboard from './views/Dashboard/Dashboard'
import Users from './views/Users/Users'
import Restaurants from './views/Restaurants/Restaurants'
import Tables from './views/Tables/Tables'
import Reservations from './views/Reservations/Reservations'
import Statistics from './views/Statistics/Statistics'
import Settings from './views/Settings/Settings'
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
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/restaurants" element={<Restaurants />} />
                <Route path="/tables" element={<Tables />} />
                <Route path="/reservations" element={<Reservations />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/settings" element={<Settings />} />
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