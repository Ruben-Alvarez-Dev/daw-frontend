import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaSun, FaMoon, FaGlobe } from 'react-icons/fa';
import './NavbarControls.css';

const NavbarControls = ({ onLogout }) => {
  const { i18n } = useTranslation();
  const [isDarkMode, setIsDarkMode] = React.useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark-mode');
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="navbar-controls">
      <button 
        className="control-button lang-button" 
        onClick={toggleLanguage}
        title={i18n.language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
      >
        <FaGlobe />
        <span className="lang-indicator">{i18n.language.toUpperCase()}</span>
      </button>

      <div className="theme-toggle">
        <button 
          className="control-button theme-button"
          onClick={toggleDarkMode}
          title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
          <div className="theme-icons">
            <FaSun className={`sun-icon ${!isDarkMode ? 'active' : ''}`} />
            <FaMoon className={`moon-icon ${isDarkMode ? 'active' : ''}`} />
          </div>
        </button>
      </div>

      <button className="logout-button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default NavbarControls;
