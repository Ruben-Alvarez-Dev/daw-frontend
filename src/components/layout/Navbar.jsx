import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const renderContextInfo = () => {
    if (!auth.isAuthenticated) return null;

    return (
      <div className="context-info">
        <span>Role: {auth.role}</span>
        {auth.activeRestaurant && <span>Restaurant: {auth.activeRestaurant.name}</span>}
        {auth.activeTable && <span>Table: {auth.activeTable.name}</span>}
        {auth.activeReservation && <span>Reservation: #{auth.activeReservation.id}</span>}
      </div>
    );
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Restaurant App
      </Link>
      
      {auth.isAuthenticated ? (
        <>
          {renderContextInfo()}
          <div className="nav-actions">
            <span>Welcome, {auth.user?.name}</span>
            <Link to="/app/dashboard" className="nav-link">Dashboard</Link>
            <button onClick={handleLogout} className="nav-button">Logout</button>
          </div>
        </>
      ) : (
        <div className="nav-actions">
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-button">Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
