import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { RiDashboardLine, RiUserLine, RiStore2Line, RiLayoutGridLine, RiCalendarLine, RiSettings4Line } from 'react-icons/ri';

const Sidebar = () => {
  const { auth } = useAuth();
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}
         onMouseEnter={() => setIsExpanded(true)}
         onMouseLeave={() => setIsExpanded(false)}>
      <nav className="sidebar-nav">
        <NavLink to="/app/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
          <RiDashboardLine className="nav-icon" />
          <span className="nav-text">Dashboard</span>
        </NavLink>
        {auth?.user?.role === 'admin' && (
          <>
            <NavLink to="/app/users" className={({ isActive }) => isActive ? 'active' : ''}>
              <RiUserLine className="nav-icon" />
              <span className="nav-text">Users</span>
            </NavLink>
            <NavLink to="/app/restaurants" className={({ isActive }) => isActive ? 'active' : ''}>
              <RiStore2Line className="nav-icon" />
              <span className="nav-text">Restaurants</span>
            </NavLink>
          </>
        )}
        <NavLink to="/app/tables" className={({ isActive }) => isActive ? 'active' : ''}>
          <RiLayoutGridLine className="nav-icon" />
          <span className="nav-text">Tables</span>
        </NavLink>
        <NavLink to="/app/reservations" className={({ isActive }) => isActive ? 'active' : ''}>
          <RiCalendarLine className="nav-icon" />
          <span className="nav-text">Reservations</span>
        </NavLink>
        <NavLink to="/app/settings" className={({ isActive }) => isActive ? 'active' : ''}>
          <RiSettings4Line className="nav-icon" />
          <span className="nav-text">Settings</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
