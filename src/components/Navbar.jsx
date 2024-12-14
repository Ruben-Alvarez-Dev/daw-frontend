import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelectedItem } from '../context/SelectedItemContext'
import './Navbar.css'

const Navbar = () => {
  const { selectedItem } = useSelectedItem()
  const location = useLocation()

  const getDisplayName = (item, type) => {
    switch (type) {
      case 'users':
        return item.user_name
      case 'restaurants':
        return item.restaurant_name
      case 'tables':
        return `Mesa ${item.table_number}`
      case 'reservations':
        return `Reserva ${item.id} - ${item.user_name}`
      default:
        return `${type} ${item.id}`
    }
  }

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/lists" className={location.pathname.includes('/lists') ? 'active' : ''}>
          Lists
        </Link>
        <Link to="/forms" className={location.pathname.includes('/forms') ? 'active' : ''}>
          Forms
        </Link>
      </div>

      {selectedItem?.item && (
        <div className="selected-item">
          Selected: {getDisplayName(selectedItem.item, selectedItem.type)}
        </div>
      )}
    </nav>
  )
}

export default Navbar
