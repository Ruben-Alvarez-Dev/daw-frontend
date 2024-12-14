import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import UserList from '../components/lists/UserList'
import RestaurantList from '../components/lists/RestaurantList'
import TableList from '../components/lists/TableList'
import ReservationList from '../components/lists/ReservationList'
import './Lists.css'

const Lists = () => {
  return (
    <div className="lists-page">
      <nav className="list-nav">
        <Link to="/lists/users">Users</Link>
        <Link to="/lists/restaurants">Restaurants</Link>
        <Link to="/lists/tables">Tables</Link>
        <Link to="/lists/reservations">Reservations</Link>
      </nav>
      <div className="list-content">
        <Routes>
          <Route path="/" element={<div>Select a list to view</div>} />
          <Route path="/users" element={<UserList />} />
          <Route path="/restaurants" element={<RestaurantList />} />
          <Route path="/tables" element={<TableList />} />
          <Route path="/reservations" element={<ReservationList />} />
        </Routes>
      </div>
    </div>
  )
}

export default Lists
