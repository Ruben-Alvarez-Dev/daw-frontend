import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: 'admin@admin.com',
    password: 'admin'
  });
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(credentials);
      if (response.status) {
        navigate('/app/restaurants');
      } else {
        setError(response.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error en login:', error);
      setError('Email o contraseña incorrectos');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              className="auth-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="auth-input"
            />
          </div>
          <button type="submit" className="btn-primary">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
