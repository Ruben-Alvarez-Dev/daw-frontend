import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ListComponent from '../components/lists/ListComponent'
import FormComponent from '../components/forms/FormComponent'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/lists/users" replace />} />
      
      {/* Rutas de listas */}
      <Route path="/lists" element={<Navigate to="/lists/users" replace />} />
      <Route path="/lists/users" element={<ListComponent type="users" />} />
      <Route path="/lists/restaurants" element={<ListComponent type="restaurants" />} />
      <Route path="/lists/tables" element={<ListComponent type="tables" />} />
      <Route path="/lists/reservations" element={<ListComponent type="reservations" />} />
      
      {/* Rutas de formularios */}
      <Route path="/forms" element={<Navigate to="/forms/users" replace />} />
      <Route path="/forms/users" element={<FormComponent type="users" />} />
      <Route path="/forms/restaurants" element={<FormComponent type="restaurants" />} />
      <Route path="/forms/tables" element={<FormComponent type="tables" />} />
      <Route path="/forms/reservations" element={<FormComponent type="reservations" />} />
    </Routes>
  )
}

export default AppRoutes
