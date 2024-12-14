import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Tables = () => {
  const { setActiveTable, activeItems } = useAuth();
  const [formData, setFormData] = useState({
    number: '',
    capacity: '',
    status: 'available'
  });
  
  const [tables, setTables] = useState([
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
  ]);

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
    
    if (activeItems.table) {
      // Update existing table
      const updatedTables = tables.map(table => {
        if (table.id === activeItems.table.id) {
          const updatedTable = {
            ...table,
            ...formData
          };
          setActiveTable(updatedTable); // Update active table in context
          return updatedTable;
        }
        return table;
      });
      setTables(updatedTables);
    } else {
      // Add new table
      const newTable = {
        id: tables.length + 1,
        ...formData
      };
      setTables([...tables, newTable]);
    }
    
    handleClear(); // Reset form and active table
  };

  const handleDelete = (id) => {
    const updatedTables = tables.filter(table => table.id !== id);
    setTables(updatedTables);
    if (activeItems.table?.id === id) {
      handleClear();
    }
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
                <button 
                  className="btn-secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(table);
                  }}
                >
                  Edit
                </button>
                <button 
                  className="btn-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(table.id);
                  }}
                >
                  Delete
                </button>
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
                required
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
                required
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                className="form-input"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
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
