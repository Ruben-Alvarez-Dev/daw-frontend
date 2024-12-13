import { useState } from 'react'
import './TablesForm.css'

const TablesForm = () => {
  const [formData, setFormData] = useState({
    number: '',
    capacity: '',
    location: '',
    status: 'available',
    restaurantId: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement API call to create/update table
    console.log('Form submitted:', formData)
  }

  return (
    <div className="tables-form-container">
      <h2>Table Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="number">Table Number:</label>
          <input
            type="number"
            id="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="capacity">Capacity:</label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., Indoor, Outdoor, Near Window"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="reserved">Reserved</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="restaurantId">Restaurant ID:</label>
          <input
            type="text"
            id="restaurantId"
            name="restaurantId"
            value={formData.restaurantId}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  )
}

export default TablesForm
