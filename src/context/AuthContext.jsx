import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    role: null, // 'admin', 'supervisor', 'user'
    activeRestaurant: null,
    activeTable: null,
    activeReservation: null
  });

  const login = (userData) => {
    setAuth({
      isAuthenticated: true,
      user: userData,
      role: userData.role,
      activeRestaurant: null,
      activeTable: null,
      activeReservation: null
    });
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      user: null,
      role: null,
      activeRestaurant: null,
      activeTable: null,
      activeReservation: null
    });
  };

  const setActiveItems = (items) => {
    setAuth(prev => ({
      ...prev,
      ...items
    }));
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, setActiveItems }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
