import { Link } from 'react-router-dom'
import { FaHome, FaInfo } from 'react-icons/fa'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Mi App
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">
              <FaHome className="nav-icon" /> Inicio
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-links">
              <FaInfo className="nav-icon" /> Sobre Nosotros
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
