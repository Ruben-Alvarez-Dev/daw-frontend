import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { SelectedItemProvider } from './context/SelectedItemContext'
import Navbar from './components/Navbar'
import AppRoutes from './routes/AppRoutes'
import './App.css'

function App() {
  return (
    <SelectedItemProvider>
      <Router>
        <div className="app">
          <Navbar />
          <div className="display">
            <AppRoutes />
          </div>
        </div>
      </Router>
    </SelectedItemProvider>
  )
}

export default App
