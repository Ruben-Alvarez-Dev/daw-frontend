import React from 'react';

const UserList = () => {
  const users = [
    { 
      id: 1, 
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin'
    },
    { 
      id: 2, 
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'supervisor'
    },
  ];

  return (
    <div className="card">
      <div className="card-header">
        <h2>Users</h2>
        <button className="btn-primary">Add User</button>
      </div>
      <div className="card-content">
        <div className="card-list">
          {users.map((user) => (
            <div key={user.id} className="card-list-item">
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
    </div>
  );
};

export default UserList;
