import React, { Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { SelectedItemProvider } from './context/SelectedItemContext'
import AppRoutes from './routes/AppRoutes'
import LoadingSpinner from './components/common/LoadingSpinner'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <SelectedItemProvider>
        <Router>
          <Suspense fallback={<LoadingSpinner />}>
            <AppRoutes />
          </Suspense>
        </Router>
      </SelectedItemProvider>
    </AuthProvider>
  )
}

export default App
