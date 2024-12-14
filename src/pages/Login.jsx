import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [selectedRole, setSelectedRole] = useState('Admin');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    const userData = {
      email: `test@${selectedRole.toLowerCase()}.com`,
      role: selectedRole
    };
    login(userData);
    navigate('/app/restaurants');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <select 
          value={selectedRole} 
          onChange={(e) => setSelectedRole(e.target.value)}
          className="auth-select"
        >
          <option value="Admin">Admin</option>
          <option value="Supervisor">Supervisor</option>
          <option value="Customer">Customer</option>
        </select>
        <button onClick={handleLogin} className="btn-primary">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
