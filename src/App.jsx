import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Home from './components/Home';
import './App.css';

const App = () => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <Router>
      <div className="app">
        <Navbar user={user} onLogout={handleLogout} />
        <Main>
          <Routes>
            <Route 
              path="/login" 
              element={user ? <Navigate to={isAdmin ? "/dashboard" : "/"} /> : <Login onLogin={handleLogin} />} 
            />
            <Route 
              path="/dashboard" 
              element={isAdmin ? <Dashboard /> : <Navigate to="/login" />} 
            />
            <Route path="/" element={<Home />} />
          </Routes>
        </Main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;