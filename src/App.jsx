import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar/Navbar';
import Sidebar from './components/layout/Sidebar/Sidebar';
import Main from './components/layout/Main/Main';
import Footer from './components/layout/Footer/Footer';
import Login from './components/Login';
import Home from './components/Home';
import Display from './components/Display';
import './App.css';

const App = () => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('global');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const handleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleCategorySelect = (category, restaurantId = null) => {
    setSelectedCategory(category);
    setSelectedRestaurant(restaurantId);
  };

  const isAdmin = user?.role?.toLowerCase() === 'admin';

  if (!user) {
    return (
      <Router>
        <div className="app">
          <Navbar user={null} onLogout={handleLogout} />
          <Main>
            <Login onLogin={handleLogin} />
          </Main>
          <Footer />
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <div className={`app ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Navbar user={user} onLogout={handleLogout} />
        <div className="content-wrapper">
          {isAdmin && (
            <Sidebar 
              isCollapsed={isSidebarCollapsed}
              onCollapse={handleSidebarCollapse}
              onCategorySelect={handleCategorySelect}
              restaurants={[
                { id: 1, name: 'Restaurante 1' },
                { id: 2, name: 'Restaurante 2' },
                { id: 3, name: 'Restaurante 3' },
              ]}
            />
          )}
          <Main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/display" element={<Display />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <div className="content">
              {/* Contenido principal */}
              <h1>Contenido de {selectedCategory}</h1>
              {selectedRestaurant && <p>Restaurante ID: {selectedRestaurant}</p>}
            </div>
          </Main>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;