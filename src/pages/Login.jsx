import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('user');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulamos login seleccionando un rol
    login({
      id: 1,
      name: 'Test User',
      role: selectedRole,
    });
    navigate('/app/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Restaurant App</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="role">Select Role:</label>
            <select 
              id="role"
              value={selectedRole} 
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="supervisor">Supervisor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
