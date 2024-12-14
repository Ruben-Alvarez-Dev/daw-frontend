import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';
import Restaurants from '../pages/Restaurants';
import Tables from '../pages/Tables';
import Reservations from '../pages/Reservations';
import Settings from '../pages/Settings';
import RootLayout from '../components/layout/RootLayout';
import ProtectedLayout from '../components/layout/ProtectedLayout';
import { useAuth } from '../context/AuthContext';

const AppRoutes = () => {
  const { auth } = useAuth();

  return (
    <Routes>
      <Route element={<RootLayout />}>
        {/* Public routes */}
        <Route path="/login" element={!auth.isAuthenticated ? <Login /> : <Navigate to="/app/restaurants" />} />
        <Route path="/register" element={!auth.isAuthenticated ? <Register /> : <Navigate to="/app/restaurants" />} />
        
        {/* Protected routes */}
        <Route path="/app" element={auth.isAuthenticated ? <ProtectedLayout /> : <Navigate to="/login" />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="restaurants" element={<Restaurants />} />
          <Route path="tables" element={<Tables />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Redirect root to login or dashboard */}
        <Route path="/" element={
          auth.isAuthenticated ? 
          <Navigate to="/app/restaurants" /> : 
          <Navigate to="/login" />
        } />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
