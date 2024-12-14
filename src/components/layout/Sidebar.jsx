import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { auth } = useAuth();

  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        <NavLink to="/app/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
          Dashboard
        </NavLink>
        {auth?.user?.role === 'admin' && (
          <>
            <NavLink to="/app/users" className={({ isActive }) => isActive ? 'active' : ''}>
              Users
            </NavLink>
            <NavLink to="/app/restaurants" className={({ isActive }) => isActive ? 'active' : ''}>
              Restaurants
            </NavLink>
          </>
        )}
        <NavLink to="/app/tables" className={({ isActive }) => isActive ? 'active' : ''}>
          Tables
        </NavLink>
        <NavLink to="/app/reservations" className={({ isActive }) => isActive ? 'active' : ''}>
          Reservations
        </NavLink>
        <NavLink to="/app/settings" className={({ isActive }) => isActive ? 'active' : ''}>
          Settings
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
