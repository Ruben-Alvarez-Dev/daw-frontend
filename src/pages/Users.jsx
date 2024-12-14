import React from 'react';
import { useAuth } from '../context/AuthContext';

const Users = () => {
  const { setActiveUser } = useAuth();
  
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
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Users</h2>
        <button className="btn-primary">Add User</button>
      </div>
      <div className="card-content">
        <div className="card-list">
          {users.map((user) => (
            <div 
              key={user.id} 
              className="card-list-item"
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
          <h3>Add User</h3>
        </div>
        <div className="card-content">
          <form className="form">
            <div className="form-group">
              <label>Name</label>
              <input type="text" className="form-input" placeholder="Full Name" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" className="form-input" placeholder="Email" />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select className="form-input">
                <option value="Admin">Admin</option>
                <option value="Supervisor">Supervisor</option>
                <option value="Customer">Customer</option>
              </select>
            </div>
            <button type="submit" className="btn-primary">Save User</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Users;
