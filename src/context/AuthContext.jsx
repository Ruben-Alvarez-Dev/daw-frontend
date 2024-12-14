import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    token: null
  });

  const [activeItems, setActiveItems] = useState({
    user: null,
    restaurant: null,
    table: null,
    reservation: null
  });

  useEffect(() => {
    // Verificar si hay un token guardado al cargar la aplicación
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setAuth(prev => ({
        ...prev,
        isAuthenticated: true,
        token,
        user: JSON.parse(userData)
      }));
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await api.login(credentials);
      const userData = {
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        role: response.user.role
      };
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(userData));
      setAuth({
        isAuthenticated: true,
        user: userData,
        token: response.token
      });
      return response;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setAuth({
        isAuthenticated: false,
        user: null,
        token: null
      });
      setActiveItems({
        user: null,
        restaurant: null,
        table: null,
        reservation: null
      });
    }
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

  const value = {
    auth,
    activeItems,
    login,
    logout,
    setActiveUser,
    setActiveRestaurant,
    setActiveTable,
    setActiveReservation
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export default AuthContext;
