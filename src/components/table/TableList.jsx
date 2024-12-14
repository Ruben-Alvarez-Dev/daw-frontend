import React from 'react';

const TableList = () => {
  const tables = [
    { id: 1, number: '1', capacity: 4, status: 'available' },
    { id: 2, number: '2', capacity: 2, status: 'occupied' },
  ];

  return (
    <div className="card">
      <div className="card-header">
        <h2>Tables</h2>
        <button className="btn-primary">Add Table</button>
      </div>
      <div className="card-content">
        <div className="card-list">
          {tables.map((table) => (
            <div key={table.id} className="card-list-item">
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
    </div>
  );
};

export default TableList;
