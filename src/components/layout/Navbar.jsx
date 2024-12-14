import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { auth, logout, activeItems } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Restaurant App</Link>
      </div>
      <div className="navbar-content">
        {auth.isAuthenticated ? (
          <>
            <div className="navbar-info">
              <span>{auth.user?.email}</span>
              <span>{auth.user?.role}</span>
              {activeItems.user && (
                <span className="active-item">User: {activeItems.user.name}</span>
              )}
            </div>
            <div className="navbar-actions">
              <button onClick={handleLogout} className="btn-secondary">Logout</button>
            </div>
          </>
        ) : (
          <div className="navbar-actions">
            <Link to="/login" className="btn-link">Login</Link>
            <Link to="/register" className="btn-link">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
