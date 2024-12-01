import React from 'react';
import './Navbar.css';
import NavbarControls from './NavbarControls';

const Navbar = ({ onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        Restaurant Manager
      </div>
      <NavbarControls onLogout={onLogout} />
    </nav>
  );
};

export default Navbar;
