import './Aside.css'
import { MdSettings, MdPublic, MdRestaurant, MdTableBar, MdEventAvailable, MdQueryStats } from 'react-icons/md'

const Aside = ({ isCollapsed, onToggle }) => {
  return (
    <aside className={`aside ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="aside-content">
        <div className="aside-section up">
          <div className="menu-item">
            <MdPublic className="menu-icon" />
            <span className="menu-text">Global</span>
          </div>
          <div className="menu-item">
            <MdRestaurant className="menu-icon" />
            <span className="menu-text">Restaurantes</span>
          </div>
          <div className="menu-item">
            <MdTableBar className="menu-icon" />
            <span className="menu-text">Mesas</span>
          </div>
          <div className="menu-item">
            <MdEventAvailable className="menu-icon" />
            <span className="menu-text">Reservas</span>
          </div>
          <div className="menu-item">
            <MdQueryStats className="menu-icon" />
            <span className="menu-text">Estadísticas</span>
          </div>
        </div>
        <div className="aside-section middle"></div>
        <div className="aside-section down">
          <div className="menu-item">
            <MdSettings className="menu-icon" />
            <span className="menu-text">Configuración</span>
          </div>
        </div>
      </div>
      <button 
        className="toggle-button"
        onClick={onToggle}
      >
        {isCollapsed ? '>' : '<'}
      </button>
    </aside>
  )
}

export default Aside
