import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { auth } = useAuth();

  const getMenuItems = () => {
    const commonItems = [
      { path: '/app/dashboard', label: 'Dashboard' },
    ];

    const roleSpecificItems = {
      admin: [
        { path: '/app/users', label: 'Users' },
        { path: '/app/restaurants', label: 'Restaurants' },
        { path: '/app/tables', label: 'Tables' },
        { path: '/app/reservations', label: 'Reservations' },
        { path: '/app/settings', label: 'Settings' }
      ],
      supervisor: [
        { path: '/app/users', label: 'Users' },
        { path: '/app/tables', label: 'Tables' },
        { path: '/app/reservations', label: 'Reservations' },
        { path: '/app/profile', label: 'Profile' },
        { path: '/app/settings', label: 'Settings' }
      ],
      user: [
        { path: '/app/reservations', label: 'Reservations' },
        { path: '/app/profile', label: 'Profile' },
        { path: '/app/settings', label: 'Settings' }
      ]
    };

    return [...commonItems, ...(roleSpecificItems[auth.role] || [])];
  };

  return (
    <aside className="sidebar">
      <nav>
        {getMenuItems().map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
