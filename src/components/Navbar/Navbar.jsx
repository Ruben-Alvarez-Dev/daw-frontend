import { Link } from 'react-router-dom'
import { FaHome, FaInfo, FaList } from 'react-icons/fa'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">Mi App</h1>
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
          <Link to="/about" className="nav-links">
            <FaInfo className="nav-icon" /> Sobre Nosotros
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
