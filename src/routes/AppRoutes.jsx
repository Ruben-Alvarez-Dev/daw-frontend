import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import RootLayout from '../components/layout/RootLayout'
import MainLayout from '../components/layout/MainLayout'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Users from '../pages/Users'
import Restaurants from '../pages/Restaurants'
import Tables from '../pages/Tables'
import Reservations from '../pages/Reservations'
import ProtectedRoute from './ProtectedRoute'

// Lazy load components for better performance
const ListComponent = React.lazy(() => import('../components/lists/ListComponent'))
const FormComponent = React.lazy(() => import('../components/forms/FormComponent'))

const AppRoutes = () => {
  const { auth } = useAuth()

  return (
    <Routes>
      <Route element={<RootLayout />}>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!auth.isAuthenticated ? <Login /> : <Navigate to="/app/dashboard" replace />} />
        
        {/* Protected routes */}
        <Route path="/app" element={<MainLayout />}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          
          {/* Common routes for all authenticated users */}
          <Route path="dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          {/* Admin routes */}
          <Route path="users" element={
            <ProtectedRoute allowedRoles={['admin', 'supervisor']}>
              <Users />
            </ProtectedRoute>
          } />
          
          <Route path="restaurants" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Restaurants />
            </ProtectedRoute>
          } />

          <Route path="tables" element={
            <ProtectedRoute allowedRoles={['admin', 'supervisor']}>
              <Tables />
            </ProtectedRoute>
          } />

          <Route path="reservations" element={
            <ProtectedRoute>
              <Reservations />
            </ProtectedRoute>
          } />

          <Route path="profile" element={
            <ProtectedRoute allowedRoles={['supervisor', 'user']}>
              <FormComponent type="profile" />
            </ProtectedRoute>
          } />

          <Route path="settings" element={
            <ProtectedRoute>
              <FormComponent type="settings" />
            </ProtectedRoute>
          } />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
