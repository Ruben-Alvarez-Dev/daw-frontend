import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useSelectedItem } from '../context/SelectedItemContext'
import UserForm from '../components/forms/UserForm'
import RestaurantForm from '../components/forms/RestaurantForm'
import TableForm from '../components/forms/TableForm'
import ReservationForm from '../components/forms/ReservationForm'
import './Forms.css'

const Forms = () => {
  const { selectedItem } = useSelectedItem()

  return (
    <div className="forms-page">
      <nav className="form-nav">
        <Link to="/forms/users">Users</Link>
        <Link to="/forms/restaurants">Restaurants</Link>
        <Link to="/forms/tables">Tables</Link>
        <Link to="/forms/reservations">Reservations</Link>
      </nav>
      <div className="form-content">
        <Routes>
          <Route path="/" element={<div>Select a form to view</div>} />
          <Route path="/users" element={<UserForm />} />
          <Route path="/restaurants" element={<RestaurantForm />} />
          <Route path="/tables" element={<TableForm />} />
          <Route path="/reservations" element={<ReservationForm />} />
        </Routes>
      </div>
    </div>
  )
}

export default Forms
