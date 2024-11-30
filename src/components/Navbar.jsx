import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar-container">
      <nav>
        <div className="content">
          <h1 className="title">Restaurant Reservations</h1>
          <button className="menu-button" onClick={toggleMenu}>
            ☰
          </button>
          <ul className={`navLinks ${menuOpen ? 'open' : ''}`}>
            <li><Link to="/" className="link">Home</Link></li>
            <li><Link to="/reservations" className="link">Reservations</Link></li>
            <li><Link to="/tables" className="link">Tables</Link></li>
            <li><Link to="/users" className="link">Users</Link></li>
            {user ? (
              <>
                <li className="userInfo">Welcome, {user.name} ({user.role})</li>
                <li className="userInfo">{user.email}</li>
                <li><button className="button" onClick={onLogout}>Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="link">Login</Link></li>
                <li><Link to="/register" className="link">Register</Link></li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
