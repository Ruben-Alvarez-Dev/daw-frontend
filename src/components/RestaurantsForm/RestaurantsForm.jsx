import { useState, useEffect } from 'react'
import { useSelectedItem } from '../../context/SelectedItemContext'
import './RestaurantsForm.css'

const RestaurantsForm = () => {
  const { selectedItem } = useSelectedItem()
  const [formData, setFormData] = useState({
    restaurant_id: '',
    restaurant_name: '',
    restaurant_address: '',
    restaurant_phone: '',
    restaurant_supervisor_id: '',
    restaurant_capacity: '',
    restaurant_cuisine_type: 'mediterranean',
    restaurant_rating: 0,
    restaurant_booking_hours: {
      lunch: {
        first_booking: '13:00',
        last_booking: '15:30',
        kitchen_closes: '16:00'
      },
      dinner: {
        first_booking: '20:00',
        last_booking: '22:30',
        kitchen_closes: '23:00'
      }
    },
    restaurant_zones: ['main']
  })

  useEffect(() => {
    if (selectedItem.type === 'restaurant' && selectedItem.item) {
      setFormData({
        restaurant_id: selectedItem.item.restaurant_id || '',
        restaurant_name: selectedItem.item.restaurant_name || '',
        restaurant_address: selectedItem.item.restaurant_address || '',
        restaurant_phone: selectedItem.item.restaurant_phone || '',
        restaurant_supervisor_id: selectedItem.item.restaurant_supervisor_id || '',
        restaurant_capacity: selectedItem.item.restaurant_capacity || '',
        restaurant_cuisine_type: selectedItem.item.restaurant_cuisine_type || 'mediterranean',
        restaurant_rating: selectedItem.item.restaurant_rating || 0,
        restaurant_booking_hours: selectedItem.item.restaurant_booking_hours || {
          lunch: {
            first_booking: '13:00',
            last_booking: '15:30',
            kitchen_closes: '16:00'
          },
          dinner: {
            first_booking: '20:00',
            last_booking: '22:30',
            kitchen_closes: '23:00'
          }
        },
        restaurant_zones: selectedItem.item.restaurant_zones || ['main']
      })
    }
  }, [selectedItem])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const url = 'http://localhost:3000/restaurants'
    const method = selectedItem.item ? 'PUT' : 'POST'
    const path = selectedItem.item ? `${url}/${selectedItem.item.restaurant_id}` : url

    fetch(path, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data)
      // TODO: Add success notification
    })
    .catch((error) => {
      console.error('Error:', error)
      // TODO: Add error notification
    })
  }

  return (
    <div className="restaurants-form-container">
      <h2>Restaurant Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="restaurant_id">restaurant_id:</label>
          <input
            type="number"
            id="restaurant_id"
            name="restaurant_id"
            value={formData.restaurant_id || ''}
            onChange={handleChange}
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="restaurant_name">restaurant_name:</label>
          <input
            type="text"
            id="restaurant_name"
            name="restaurant_name"
            value={formData.restaurant_name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="restaurant_address">restaurant_address:</label>
          <input
            type="text"
            id="restaurant_address"
            name="restaurant_address"
            value={formData.restaurant_address}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="restaurant_phone">restaurant_phone:</label>
          <input
            type="tel"
            id="restaurant_phone"
            name="restaurant_phone"
            value={formData.restaurant_phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="restaurant_supervisor_id">restaurant_supervisor_id:</label>
          <input
            type="number"
            id="restaurant_supervisor_id"
            name="restaurant_supervisor_id"
            value={formData.restaurant_supervisor_id}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="restaurant_capacity">restaurant_capacity:</label>
          <input
            type="number"
            id="restaurant_capacity"
            name="restaurant_capacity"
            value={formData.restaurant_capacity}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="restaurant_cuisine_type">restaurant_cuisine_type:</label>
          <select
            id="restaurant_cuisine_type"
            name="restaurant_cuisine_type"
            value={formData.restaurant_cuisine_type}
            onChange={handleChange}
          >
            <option value="mediterranean">mediterranean</option>
            <option value="spanish">spanish</option>
            <option value="japanese">japanese</option>
            <option value="italian">italian</option>
            <option value="mexican">mexican</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="restaurant_rating">restaurant_rating:</label>
          <input
            type="number"
            id="restaurant_rating"
            name="restaurant_rating"
            value={formData.restaurant_rating}
            onChange={handleChange}
            min="0"
            max="5"
            step="0.1"
          />
        </div>

        <div className="form-group">
          <label>restaurant_booking_hours:</label>
          <div className="booking-hours">
            <div>
              <h4>Lunch</h4>
              <div>
                <label htmlFor="lunch_first">First Booking:</label>
                <input
                  type="time"
                  id="lunch_first"
                  name="restaurant_booking_hours.lunch.first_booking"
                  value={formData.restaurant_booking_hours.lunch.first_booking}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="lunch_last">Last Booking:</label>
                <input
                  type="time"
                  id="lunch_last"
                  name="restaurant_booking_hours.lunch.last_booking"
                  value={formData.restaurant_booking_hours.lunch.last_booking}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="lunch_closes">Kitchen Closes:</label>
                <input
                  type="time"
                  id="lunch_closes"
                  name="restaurant_booking_hours.lunch.kitchen_closes"
                  value={formData.restaurant_booking_hours.lunch.kitchen_closes}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <h4>Dinner</h4>
              <div>
                <label htmlFor="dinner_first">First Booking:</label>
                <input
                  type="time"
                  id="dinner_first"
                  name="restaurant_booking_hours.dinner.first_booking"
                  value={formData.restaurant_booking_hours.dinner.first_booking}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="dinner_last">Last Booking:</label>
                <input
                  type="time"
                  id="dinner_last"
                  name="restaurant_booking_hours.dinner.last_booking"
                  value={formData.restaurant_booking_hours.dinner.last_booking}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="dinner_closes">Kitchen Closes:</label>
                <input
                  type="time"
                  id="dinner_closes"
                  name="restaurant_booking_hours.dinner.kitchen_closes"
                  value={formData.restaurant_booking_hours.dinner.kitchen_closes}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="restaurant_zones">restaurant_zones:</label>
          <select
            id="restaurant_zones"
            name="restaurant_zones"
            value={formData.restaurant_zones}
            onChange={handleChange}
            multiple
          >
            <option value="main">main</option>
            <option value="terrace">terrace</option>
            <option value="bar">bar</option>
            <option value="private">private</option>
          </select>
        </div>
        
        <button type="submit" className="submit-button">
          {selectedItem.item ? 'Update Restaurant' : 'Create Restaurant'}
        </button>
      </form>
    </div>
  )
}

export default RestaurantsForm
