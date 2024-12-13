import { Link } from 'react-router-dom'
import { FaHome, FaInfo, FaList, FaWpforms, FaTimes } from 'react-icons/fa'
import './Navbar.css'
import { useSelectedItem } from '../../context/SelectedItemContext'

const Navbar = () => {
  const { selectedItems, clearSelection } = useSelectedItem()

  const getSelectedItemsLabels = () => {
    const labels = []
    
    if (selectedItems.user) {
      labels.push({
        type: 'user',
        text: `Usuario: ${selectedItems.user.user_id}`
      })
    }
    if (selectedItems.restaurant) {
      labels.push({
        type: 'restaurant',
        text: `Restaurante: ${selectedItems.restaurant.restaurant_id}`
      })
    }
    if (selectedItems.table) {
      labels.push({
        type: 'table',
        text: `Mesa: ${selectedItems.table.table_id}`
      })
    }
    if (selectedItems.reservation) {
      labels.push({
        type: 'reservation',
        text: `Reserva: ${selectedItems.reservation.reservation_id}`
      })
    }
    
    return labels
  }

  const handleClearItem = (type) => {
    clearSelection(type)
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-title">Mi App</h1>
        <div className="selected-items-labels">
          {getSelectedItemsLabels().map((label, index) => (
            <span key={index} className="selected-item-label">
              {label.text}
              <button 
                className="clear-label-button"
                onClick={() => handleClearItem(label.type)}
                aria-label={`Eliminar ${label.text}`}
              >
                <FaTimes />
              </button>
            </span>
          ))}
        </div>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/" className="nav-links">
            <FaHome className="nav-icon" />
            Inicio
          </Link>
        </li>
        <li>
          <Link to="/lists" className="nav-links">
            <FaList className="nav-icon" />
            Listas
          </Link>
        </li>
        <li>
          <Link to="/forms" className="nav-links">
            <FaWpforms className="nav-icon" />
            Formularios
          </Link>
        </li>
        <li>
          <Link to="/about" className="nav-links">
            <FaInfo className="nav-icon" />
            Sobre Nosotros
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
