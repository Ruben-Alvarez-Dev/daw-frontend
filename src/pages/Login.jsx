import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [selectedRole, setSelectedRole] = useState('customer');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulamos login seleccionando un rol
    login({
      email: `test@${selectedRole}.com`,
      role: selectedRole,
    });
    navigate('/app/dashboard');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="auth-form">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="auth-select"
          >
            <option value="customer">Customer</option>
            <option value="supervisor">Supervisor</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
