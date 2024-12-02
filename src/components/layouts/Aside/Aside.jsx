import './Aside.css'
import { MdSettings, MdPublic, MdRestaurant, MdTableBar, MdEventAvailable, MdQueryStats } from 'react-icons/md'
import PropTypes from 'prop-types'

const Aside = ({ isCollapsed, onToggle, onSectionSelect, activeSection }) => {
  const handleItemClick = (section) => {
    onSectionSelect(section)
  }

  return (
    <aside className={`aside ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="aside-content">
        <div className="aside-section up">
          <div 
            className={`menu-item ${activeSection === 'global' ? 'active' : ''}`}
            onClick={() => handleItemClick('global')}
          >
            <MdPublic className="menu-icon" />
            <span className="menu-text">Global</span>
          </div>
          <div 
            className={`menu-item ${activeSection === 'restaurants' ? 'active' : ''}`}
            onClick={() => handleItemClick('restaurants')}
          >
            <MdRestaurant className="menu-icon" />
            <span className="menu-text">Restaurantes</span>
          </div>
          <div 
            className={`menu-item ${activeSection === 'tables' ? 'active' : ''}`}
            onClick={() => handleItemClick('tables')}
          >
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
        <span>{isCollapsed ? '>' : '<'}</span>
      </button>
    </aside>
  )
}

Aside.propTypes = {
  isCollapsed: PropTypes.bool,
  onToggle: PropTypes.func,
  onSectionSelect: PropTypes.func,
  activeSection: PropTypes.string
}

export default Aside
