import { Link } from 'react-router-dom'
import { FaHome, FaInfo, FaList, FaWpforms } from 'react-icons/fa'
import './Navbar.css'
import { useSelectedItem } from '../../context/SelectedItemContext'

const Navbar = () => {
  const { selectedItem } = useSelectedItem()

  const getSelectedItemLabel = () => {
    if (!selectedItem.item) return null

    const labels = {
      user: 'Usuario',
      restaurant: 'Restaurante',
      table: 'Mesa',
      reservation: 'Reserva'
    }

    return `${labels[selectedItem.type]}: ${selectedItem.item.name || selectedItem.item.id || ''}`
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-title">Mi App</h1>
        {selectedItem.item && (
          <span className="selected-item-label">
            {getSelectedItemLabel()}
          </span>
        )}
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/" className="nav-links">
            <FaHome className="nav-icon" /> Inicio
          </Link>
        </li>
        <li>
          <Link to="/lists" className="nav-links">
            <FaList className="nav-icon" /> Listas
          </Link>
        </li>
        <li>
          <Link to="/forms" className="nav-links">
            <FaWpforms className="nav-icon" /> Formularios
          </Link>
        </li>
        <li>
          <Link to="/about" className="nav-links">
            <FaInfo className="nav-icon" /> Sobre Nosotros
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
