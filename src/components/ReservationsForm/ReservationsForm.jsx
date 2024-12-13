import { useState, useEffect } from 'react'
import { useSelectedItem } from '../../context/SelectedItemContext'
import './ReservationsForm.css'

const ReservationsForm = () => {
  const { selectedItem } = useSelectedItem()
  const [formData, setFormData] = useState({
    reservation_id: '',
    reservation_user_id: '',
    reservation_restaurant_id: '',
    reservation_table_id: '',
    reservation_date: '',
    reservation_time_slot: '',
    reservation_num_guests: '',
    reservation_status: 'pending',
    reservation_special_requests: '',
    reservation_created_at: new Date().toISOString(),
    reservation_updated_at: new Date().toISOString()
  })

  useEffect(() => {
    if (selectedItem.type === 'reservation' && selectedItem.item) {
      setFormData({
        reservation_id: selectedItem.item.reservation_id || '',
        reservation_user_id: selectedItem.item.reservation_user_id || '',
        reservation_restaurant_id: selectedItem.item.reservation_restaurant_id || '',
        reservation_table_id: selectedItem.item.reservation_table_id || '',
        reservation_date: selectedItem.item.reservation_date || '',
        reservation_time_slot: selectedItem.item.reservation_time_slot || '',
        reservation_num_guests: selectedItem.item.reservation_num_guests || '',
        reservation_status: selectedItem.item.reservation_status || 'pending',
        reservation_special_requests: selectedItem.item.reservation_special_requests || '',
        reservation_created_at: selectedItem.item.reservation_created_at || new Date().toISOString(),
        reservation_updated_at: new Date().toISOString()
      })
    }
  }, [selectedItem])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
      reservation_updated_at: new Date().toISOString()
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const url = 'http://localhost:3000/reservations'
    const method = selectedItem.item ? 'PUT' : 'POST'
    const path = selectedItem.item ? `${url}/${selectedItem.item.reservation_id}` : url

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
    <div className="reservations-form-container">
      <h2>Reservation Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="reservation_id">reservation_id:</label>
          <input
            type="number"
            id="reservation_id"
            name="reservation_id"
            value={formData.reservation_id || ''}
            onChange={handleChange}
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="reservation_user_id">reservation_user_id:</label>
          <input
            type="number"
            id="reservation_user_id"
            name="reservation_user_id"
            value={formData.reservation_user_id}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="reservation_restaurant_id">reservation_restaurant_id:</label>
          <input
            type="number"
            id="reservation_restaurant_id"
            name="reservation_restaurant_id"
            value={formData.reservation_restaurant_id}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="reservation_table_id">reservation_table_id:</label>
          <input
            type="number"
            id="reservation_table_id"
            name="reservation_table_id"
            value={formData.reservation_table_id}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="reservation_date">reservation_date:</label>
          <input
            type="date"
            id="reservation_date"
            name="reservation_date"
            value={formData.reservation_date}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="reservation_time_slot">reservation_time_slot:</label>
          <select
            id="reservation_time_slot"
            name="reservation_time_slot"
            value={formData.reservation_time_slot}
            onChange={handleChange}
            required
          >
            <option value="">Select a time slot</option>
            <option value="13:00">13:00</option>
            <option value="13:30">13:30</option>
            <option value="14:00">14:00</option>
            <option value="14:30">14:30</option>
            <option value="15:00">15:00</option>
            <option value="15:30">15:30</option>
            <option value="20:00">20:00</option>
            <option value="20:30">20:30</option>
            <option value="21:00">21:00</option>
            <option value="21:30">21:30</option>
            <option value="22:00">22:00</option>
            <option value="22:30">22:30</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="reservation_num_guests">reservation_num_guests:</label>
          <input
            type="number"
            id="reservation_num_guests"
            name="reservation_num_guests"
            value={formData.reservation_num_guests}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="reservation_status">reservation_status:</label>
          <select
            id="reservation_status"
            name="reservation_status"
            value={formData.reservation_status}
            onChange={handleChange}
          >
            <option value="pending">pending</option>
            <option value="confirmed">confirmed</option>
            <option value="cancelled">cancelled</option>
            <option value="completed">completed</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="reservation_special_requests">reservation_special_requests:</label>
          <textarea
            id="reservation_special_requests"
            name="reservation_special_requests"
            value={formData.reservation_special_requests}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="reservation_created_at">reservation_created_at:</label>
          <input
            type="datetime-local"
            id="reservation_created_at"
            name="reservation_created_at"
            value={formData.reservation_created_at}
            onChange={handleChange}
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="reservation_updated_at">reservation_updated_at:</label>
          <input
            type="datetime-local"
            id="reservation_updated_at"
            name="reservation_updated_at"
            value={formData.reservation_updated_at}
            onChange={handleChange}
            disabled
          />
        </div>
        
        <button type="submit" className="submit-button">
          {selectedItem.item ? 'Update Reservation' : 'Create Reservation'}
        </button>
      </form>
    </div>
  )
}

export default ReservationsForm
