import './Navbar.css'
import Button from '../../common/Button/Button'
import LanguageSelector from '../../common/LanguageSelector/LanguageSelector'
import ThemeToggle from '../../common/ThemeToggle/ThemeToggle'
import { useAlert } from '../../../context/AlertContext'

const Navbar = () => {
  const alert = useAlert()

  const handleLogout = () => {
    alert.success('hola')
  }

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-section logo">
          <span className="logo-text">Restaurant Reservations</span>
        </div>
        <div className="navbar-section left">
          <span className="user-info">Texto de ejemplo: Ruben Alvarez</span>
          <span className="user-info">admin</span>
        </div>
        <div className="navbar-section middle">
          <div className="middle-controls">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>
        <div className="navbar-section right">
          <Button 
            className="success"
            onClick={() => console.log('Login clicked')}
          >
            Login
          </Button>
          <Button 
            className="primary"
            onClick={() => console.log('Register clicked')}
          >
            Register
          </Button>
          <Button 
            className="danger"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
