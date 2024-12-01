import React, { useState } from 'react';
import './css/Sidebar.css';
import { useTranslation } from 'react-i18next';
import { 
  FaGlobe, 
  FaUtensils, 
  FaCog, 
  FaChevronLeft, 
  FaUsers, 
  FaBorderAll, 
  FaCalendarAlt 
} from 'react-icons/fa';

const Sidebar = ({ isCollapsed, onCollapse, onCategorySelect, restaurants }) => {
  const [isRestaurantMenuOpen, setIsRestaurantMenuOpen] = useState(false);
  const { t } = useTranslation();

  const handleRestaurantClick = () => {
    if (!isCollapsed) {
      setIsRestaurantMenuOpen(!isRestaurantMenuOpen);
    }
  };

  return (
    <aside className={isCollapsed ? 'collapsed' : ''}>
      <FaChevronLeft 
        className={`collapse-toggle ${isCollapsed ? 'rotate-180' : ''}`}
        onClick={onCollapse}
        title={isCollapsed ? t('sidebar.expandMenu') : t('sidebar.collapseMenu')}
      />
      
      <div className="menu-items">
        {/* Elemento superior */}
        <div className="menu-section top">
          <a href="#" className="menu-item" onClick={() => onCategorySelect?.('global')} title={t('sidebar.global')}>
            <FaGlobe />
            <span>{t('sidebar.global')}</span>
          </a>
        </div>

        {/* Elementos principales */}
        <div className="menu-section main">
          <a href="#" className="menu-item" onClick={handleRestaurantClick} title={t('sidebar.restaurants')}>
            <FaUtensils />
            <span>{t('sidebar.restaurants')} {isRestaurantMenuOpen ? '▼' : '▶'}</span>
          </a>
          
          {isRestaurantMenuOpen && !isCollapsed && restaurants?.map((restaurant) => (
            <a
              key={restaurant.id}
              href="#"
              className="submenu-item"
              onClick={() => onCategorySelect?.('restaurant', restaurant.id)}
              title={restaurant.name}
            >
              <span>{restaurant.name}</span>
            </a>
          ))}

          <a href="#" className="menu-item" onClick={() => onCategorySelect?.('users')} title={t('sidebar.users')}>
            <FaUsers />
            <span>{t('sidebar.users')}</span>
          </a>

          <a href="#" className="menu-item" onClick={() => onCategorySelect?.('tables')} title={t('sidebar.tables')}>
            <FaBorderAll />
            <span>{t('sidebar.tables')}</span>
          </a>

          <a href="#" className="menu-item" onClick={() => onCategorySelect?.('reservations')} title={t('sidebar.reservations')}>
            <FaCalendarAlt />
            <span>{t('sidebar.reservations')}</span>
          </a>
        </div>

        {/* Elemento inferior */}
        <div className="menu-section bottom">
          <a href="#" className="menu-item" onClick={() => onCategorySelect?.('settings')} title={t('sidebar.settings')}>
            <FaCog />
            <span>{t('sidebar.settings')}</span>
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
