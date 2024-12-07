import PropTypes from 'prop-types'
import { useNavigate, useLocation } from 'react-router-dom'
import { MdSettings, MdDashboard, MdRestaurant, MdTableBar, MdEventAvailable, MdQueryStats, MdGroup } from 'react-icons/md'
import './Aside.css'

const Aside = ({ isCollapsed, onToggle }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavigation = (path) => {
    navigate(path)
  }

  return (
    <aside className={`aside ${isCollapsed ? 'collapsed' : ''}`}>
      <button className="toggle-button" onClick={onToggle}>
        <span>{isCollapsed ? '>' : '<'}</span>
      </button>
      <div className="aside-content">
        <div className="aside-section up">
          <button
            className="menu-item"
            onClick={() => handleNavigation('/dashboard')}
          >
            <MdDashboard className="menu-icon" />
            <span className="menu-text">Dashboard</span>
          </button>
          <button
            className="menu-item"
            onClick={() => handleNavigation('/users')}
          >
            <MdGroup className="menu-icon" />
            <span className="menu-text">Users</span>
          </button>
          <button
            className="menu-item"
            onClick={() => handleNavigation('/restaurants')}
          >
            <MdRestaurant className="menu-icon" />
            <span className="menu-text">Restaurantes</span>
          </button>
          <button
            className="menu-item"
            onClick={() => handleNavigation('/tables')}
          >
            <MdTableBar className="menu-icon" />
            <span className="menu-text">Mesas</span>
          </button>
          <button
            className="menu-item"
            onClick={() => handleNavigation('/reservations')}
          >
            <MdEventAvailable className="menu-icon" />
            <span className="menu-text">Reservas</span>
          </button>
          <button
            className="menu-item"
            onClick={() => handleNavigation('/statistics')}
          >
            <MdQueryStats className="menu-icon" />
            <span className="menu-text">Estadísticas</span>
          </button>
        </div>
        <div className="aside-section middle"></div>
        <div className="aside-section down">
          <button
            className="menu-item"
            onClick={() => handleNavigation('/settings')}
          >
            <MdSettings className="menu-icon" />
            <span className="menu-text">Configuración</span>
          </button>
        </div>
      </div>
    </aside>
  )
}

Aside.propTypes = {
  isCollapsed: PropTypes.bool,
  onToggle: PropTypes.func
}

export default Aside
