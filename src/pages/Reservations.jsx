import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ReservationList from '../components/reservation/ReservationList';
import ReservationForm from '../components/reservation/ReservationForm';

const Reservations = () => {
  const { setActiveReservation, activeItems } = useAuth();
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '',
    status: 'pending',
    notes: ''
  });
  
  const [reservations, setReservations] = useState([
    {
      id: 1,
      date: '2024-12-15',
      time: '20:00',
      guests: 4,
      status: 'confirmed',
      notes: 'Birthday celebration'
    },
    {
      id: 2,
      date: '2024-12-16',
      time: '21:00',
      guests: 2,
      status: 'pending',
      notes: 'Window table preferred'
    }
  ]);

  const handleSelect = (reservation) => {
    setActiveReservation(reservation);
    setFormData({
      date: reservation.date,
      time: reservation.time,
      guests: reservation.guests,
      status: reservation.status,
      notes: reservation.notes
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
    
    if (activeItems.reservation) {
      // Update existing reservation
      const updatedReservations = reservations.map(reservation => {
        if (reservation.id === activeItems.reservation.id) {
          const updatedReservation = {
            ...reservation,
            ...formData
          };
          setActiveReservation(updatedReservation); // Update active reservation in context
          return updatedReservation;
        }
        return reservation;
      });
      setReservations(updatedReservations);
    } else {
      // Add new reservation
      const newReservation = {
        id: reservations.length + 1,
        ...formData
      };
      setReservations([...reservations, newReservation]);
    }
    
    handleClear(); // Reset form and active reservation
  };

  const handleDelete = (id) => {
    const updatedReservations = reservations.filter(reservation => reservation.id !== id);
    setReservations(updatedReservations);
    if (activeItems.reservation?.id === id) {
      handleClear();
    }
  };

  const handleClear = () => {
    setActiveReservation(null);
    setFormData({
      date: '',
      time: '',
      guests: '',
      status: 'pending',
      notes: ''
    });
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2>Reservations</h2>
          <button className="btn-primary" onClick={handleClear}>Add Reservation</button>
        </div>
        <div className="card-content">
          <div className="card-list">
            {reservations.map((reservation) => (
              <div 
                key={reservation.id} 
                className={`card-list-item ${activeItems.reservation?.id === reservation.id ? 'active' : ''}`}
                onClick={() => handleSelect(reservation)}
                style={{ cursor: 'pointer' }}
              >
                <div>
                  <h3>Reservation for {reservation.guests} guests</h3>
                  <p>Date: {reservation.date}</p>
                  <p>Time: {reservation.time}</p>
                  <p>Status: {reservation.status}</p>
                  {reservation.notes && <p>Notes: {reservation.notes}</p>}
                </div>
                <div className="card-actions">
                  <button 
                    className="btn-secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(reservation);
                    }}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(reservation.id);
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
            <h3>{activeItems.reservation ? 'Edit Reservation' : 'Add Reservation'}</h3>
          </div>
          <div className="card-content">
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Date</label>
                <input 
                  type="date" 
                  className="form-input"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Time</label>
                <input 
                  type="time" 
                  className="form-input"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Number of Guests</label>
                <input 
                  type="number" 
                  className="form-input"
                  min="1"
                  name="guests"
                  value={formData.guests}
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
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="form-group">
                <label>Notes</label>
                <textarea 
                  className="form-input"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="3"
                ></textarea>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {activeItems.reservation ? 'Update Reservation' : 'Save Reservation'}
                </button>
                {activeItems.reservation && (
                  <button type="button" className="btn-secondary" onClick={handleClear}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
