import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    role: null
  });

  const [activeItems, setActiveItems] = useState({
    user: null,
    restaurant: null,
    table: null,
    reservation: null
  });

  const login = (userData) => {
    setAuth({
      isAuthenticated: true,
      user: userData,
      role: userData.role
    });
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      user: null,
      role: null
    });
    setActiveItems({
      user: null,
      restaurant: null,
      table: null,
      reservation: null
    });
  };

  const setActiveUser = (user) => {
    setActiveItems(prev => ({
      ...prev,
      user
    }));
  };

  const setActiveRestaurant = (restaurant) => {
    setActiveItems(prev => ({
      ...prev,
      restaurant,
      table: null,
      reservation: null
    }));
  };

  const setActiveTable = (table) => {
    setActiveItems(prev => ({
      ...prev,
      table,
      reservation: null
    }));
  };

  const setActiveReservation = (reservation) => {
    setActiveItems(prev => ({
      ...prev,
      reservation
    }));
  };

  return (
    <AuthContext.Provider value={{
      auth,
      login,
      logout,
      activeItems,
      setActiveUser,
      setActiveRestaurant,
      setActiveTable,
      setActiveReservation
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
