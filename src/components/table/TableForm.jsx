import React, { useState } from 'react';

const TableForm = () => {
  const [formData, setFormData] = useState({
    number: '',
    capacity: '',
    status: 'available',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Add Table</h2>
      </div>
      <form className="card-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="number"
          placeholder="Table Number"
          value={formData.number}
          onChange={handleChange}
        />
        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={formData.capacity}
          onChange={handleChange}
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="available">Available</option>
          <option value="occupied">Occupied</option>
          <option value="reserved">Reserved</option>
        </select>
        <button type="submit">Save Table</button>
      </form>
    </div>
  );
};

export default TableForm;
