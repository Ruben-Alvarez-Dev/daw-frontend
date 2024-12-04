import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { AlertProvider } from './context/AlertContext'
import { RestaurantsProvider } from './context/RestaurantsContext'
import DashboardView from './views/DashboardView/DashboardView'
import UsersView from './views/UsersView/UsersView'
import RestaurantsView from './views/RestaurantsView/RestaurantsView'
import TablesView from './views/TablesView/TablesView'
import ReservationsView from './views/ReservationsView/ReservationsView'
import StatisticsView from './views/StatisticsView/StatisticsView'
import SettingsView from './views/SettingsView/SettingsView'
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
                <Route path="/dashboard" element={<DashboardView />} />
                <Route path="/users" element={<UsersView />} />
                <Route path="/restaurants" element={<RestaurantsView />} />
                <Route path="/tables" element={<TablesView />} />
                <Route path="/reservations" element={<ReservationsView />} />
                <Route path="/statistics" element={<StatisticsView />} />
                <Route path="/settings" element={<SettingsView />} />
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