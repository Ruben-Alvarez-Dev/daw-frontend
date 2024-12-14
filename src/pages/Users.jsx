import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Users = () => {
  const { setActiveUser, activeItems } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Customer'
  });
  
  const users = [
    {
      id: 1,
      name: 'John Admin',
      email: 'john@admin.com',
      role: 'Admin'
    },
    {
      id: 2,
      name: 'Sarah Supervisor',
      email: 'sarah@supervisor.com',
      role: 'Supervisor'
    },
    {
      id: 3,
      name: 'Mike Customer',
      email: 'mike@customer.com',
      role: 'Customer'
    }
  ];

  const handleSelect = (user) => {
    setActiveUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar/actualizar el usuario
    console.log('Form submitted:', formData);
  };

  const handleClear = () => {
    setActiveUser(null);
    setFormData({
      name: '',
      email: '',
      role: 'Customer'
    });
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Users</h2>
        <button className="btn-primary" onClick={handleClear}>Add User</button>
      </div>
      <div className="card-content">
        <div className="card-list">
          {users.map((user) => (
            <div 
              key={user.id} 
              className={`card-list-item ${activeItems.user?.id === user.id ? 'active' : ''}`}
              onClick={() => handleSelect(user)}
              style={{ cursor: 'pointer' }}
            >
              <div>
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                <p>Role: {user.role}</p>
              </div>
              <div className="card-actions">
                <button className="btn-secondary">Edit</button>
                <button className="btn-danger">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="card">
        <div className="card-header">
          <h3>{activeItems.user ? 'Edit User' : 'Add User'}</h3>
        </div>
        <div className="card-content">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Full Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                className="form-input" 
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select 
                className="form-input"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
              >
                <option value="Admin">Admin</option>
                <option value="Supervisor">Supervisor</option>
                <option value="Customer">Customer</option>
              </select>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {activeItems.user ? 'Update User' : 'Save User'}
              </button>
              {activeItems.user && (
                <button type="button" className="btn-secondary" onClick={handleClear}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Users;
