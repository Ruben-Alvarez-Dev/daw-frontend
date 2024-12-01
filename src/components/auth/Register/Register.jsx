import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implementar registro
    navigate('/login');
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Registro</h2>
        <input
          type="text"
          placeholder="Usuario"
          value={formData.username}
          onChange={(e) => setFormData({...formData, username: e.target.value})}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
        />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
