import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RootLayout from '../components/layout/RootLayout';
import ProtectedLayout from '../components/layout/ProtectedLayout';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Users from '../pages/Users';
import Restaurants from '../pages/Restaurants';
import Tables from '../pages/Tables';
import Reservations from '../pages/Reservations';

const AppRoutes = () => {
  const { auth } = useAuth();

  return (
    <Routes>
      <Route element={<RootLayout />}>
        {/* Public routes */}
        <Route index element={<Home />} />
        <Route path="login" element={
          !auth.isAuthenticated ? <Login /> : <Navigate to="/app/dashboard" replace />
        } />
        <Route path="register" element={<Register />} />

        {/* Protected routes */}
        <Route path="app" element={
          auth.isAuthenticated ? <ProtectedLayout /> : <Navigate to="/login" replace />
        }>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="restaurants" element={<Restaurants />} />
          <Route path="tables" element={<Tables />} />
          <Route path="reservations" element={<Reservations />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
