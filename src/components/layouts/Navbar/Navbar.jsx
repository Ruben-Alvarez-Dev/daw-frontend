import './Navbar.css'
import Button from '../../common/Button/Button'
import LanguageSelector from '../../common/LanguageSelector/LanguageSelector'
import ThemeToggle from '../../common/ThemeToggle/ThemeToggle'
import { useAlert } from '../../../context/AlertContext'
import { useRestaurants } from '../../../context/RestaurantsContext'

const Navbar = () => {
  const alert = useAlert()
  const { activeRestaurant } = useRestaurants()

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
          {activeRestaurant && (
            <span className="user-info">
              Restaurante: {activeRestaurant.name}
            </span>
          )}
          <span className="user-info">Ruben Alvarez</span>
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
            variant="success"
            onClick={() => console.log('Login clicked')}
          >
            Login
          </Button>
          <Button
            variant="primary"
            onClick={() => console.log('Register clicked')}
          >
            Register
          </Button>
          <Button 
            variant="danger"
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
