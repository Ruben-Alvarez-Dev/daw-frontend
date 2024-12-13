import { useState } from 'react'
import './RestaurantsForm.css'

const RestaurantsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    capacity: '',
    openingTime: '',
    closingTime: ''
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
    // TODO: Implement API call to create/update restaurant
    console.log('Form submitted:', formData)
  }

  return (
    <div className="restaurants-form-container">
      <h2>Restaurant Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
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
          <label htmlFor="openingTime">Opening Time:</label>
          <input
            type="time"
            id="openingTime"
            name="openingTime"
            value={formData.openingTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="closingTime">Closing Time:</label>
          <input
            type="time"
            id="closingTime"
            name="closingTime"
            value={formData.closingTime}
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

export default RestaurantsForm
