import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        Mi App
      </Link>
      <div className="nav-links">
        <Link to="/" className="nav-link">
          Inicio
        </Link>
        <Link to="/about" className="nav-link">
          Sobre Nosotros
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
