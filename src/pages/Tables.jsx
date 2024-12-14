import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Tables = () => {
  const { setActiveTable, activeItems } = useAuth();
  const [formData, setFormData] = useState({
    number: '',
    capacity: '',
    status: 'available'
  });
  
  const tables = [
    {
      id: 1,
      number: '1',
      capacity: 4,
      status: 'available'
    },
    {
      id: 2,
      number: '2',
      capacity: 2,
      status: 'occupied'
    }
  ];

  const handleSelect = (table) => {
    setActiveTable(table);
    setFormData({
      number: table.number,
      capacity: table.capacity,
      status: table.status
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
    console.log('Form submitted:', formData);
  };

  const handleClear = () => {
    setActiveTable(null);
    setFormData({
      number: '',
      capacity: '',
      status: 'available'
    });
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Tables</h2>
        <button className="btn-primary" onClick={handleClear}>Add Table</button>
      </div>
      <div className="card-content">
        <div className="card-list">
          {tables.map((table) => (
            <div 
              key={table.id} 
              className={`card-list-item ${activeItems.table?.id === table.id ? 'active' : ''}`}
              onClick={() => handleSelect(table)}
              style={{ cursor: 'pointer' }}
            >
              <div>
                <h3>Table {table.number}</h3>
                <p>Capacity: {table.capacity}</p>
                <p>Status: {table.status}</p>
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
          <h3>{activeItems.table ? 'Edit Table' : 'Add Table'}</h3>
        </div>
        <div className="card-content">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Table Number</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Table Number"
                name="number"
                value={formData.number}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Capacity</label>
              <input 
                type="number" 
                className="form-input" 
                min="1"
                name="capacity"
                value={formData.capacity}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                className="form-input"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="reserved">Reserved</option>
              </select>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {activeItems.table ? 'Update Table' : 'Save Table'}
              </button>
              {activeItems.table && (
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

export default Tables;
