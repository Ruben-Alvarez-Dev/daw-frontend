import React, { useState, useEffect } from 'react';

const UserForm = ({ activeUser, onSave, onClean }) => {
  const [mode, setMode] = useState('view');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'customer'
  });

  useEffect(() => {
    if (activeUser) {
      setFormData({
        name: activeUser.name || '',
        email: activeUser.email || '',
        password: '',
        password_confirmation: '',
        role: activeUser.role || 'customer'
      });
      setMode('view');
    }
  }, [activeUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClean = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      role: 'customer'
    });
    setMode('view');
    onClean();
  };

  const handleEdit = () => {
    setMode('edit');
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>{activeUser ? 'User Details' : 'New User'}</h2>
      </div>
      <div className="card-body">
        <form className="card-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              disabled={mode === 'view'}
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              disabled={mode === 'view'}
            />
          </div>

          {(mode === 'edit' || !activeUser) && (
            <>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Confirm Password:</label>
                <input
                  type="password"
                  name="password_confirmation"
                  placeholder="Confirm Password"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label>Role:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled={mode === 'view'}
            >
              <option value="customer">Customer</option>
              <option value="supervisor">Supervisor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <div className="form-actions">
            {mode === 'view' && activeUser && (
              <button type="button" className="btn-primary" onClick={handleEdit}>Edit</button>
            )}
            {mode === 'edit' && (
              <button type="submit" className="btn-primary">Save</button>
            )}
            {!activeUser && (
              <button type="submit" className="btn-primary">Create</button>
            )}
            <button type="button" className="btn-secondary" onClick={handleClean}>Clean</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
