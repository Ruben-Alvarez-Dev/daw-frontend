import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

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
              <span>{auth.role}</span>
              {activeItems.restaurant && (
                <span className="active-item">Restaurant: {activeItems.restaurant.name}</span>
              )}
              {activeItems.table && (
                <span className="active-item">Table: {activeItems.table.number}</span>
              )}
              {activeItems.reservation && (
                <span className="active-item">Reservation: #{activeItems.reservation.id}</span>
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
