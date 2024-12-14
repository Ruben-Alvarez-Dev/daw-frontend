import React from 'react';
import { useAuth } from '../context/AuthContext';
import ReservationList from '../components/reservation/ReservationList';
import ReservationForm from '../components/reservation/ReservationForm';

const Reservations = () => {
  const { setActiveReservation } = useAuth();
  
  const reservations = [
    {
      id: 1,
      customerName: 'John Doe',
      date: '2024-12-14 at 19:00',
      guests: 4,
      status: 'confirmed'
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      date: '2024-12-15 at 20:00',
      guests: 2,
      status: 'pending'
    }
  ];

  const handleSelect = (reservation) => {
    setActiveReservation(reservation);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2>Reservations</h2>
          <button className="btn-primary">Add Reservation</button>
        </div>
        <div className="card-content">
          <div className="card-list">
            {reservations.map((reservation) => (
              <div 
                key={reservation.id} 
                className="card-list-item"
                onClick={() => handleSelect(reservation)}
                style={{ cursor: 'pointer' }}
              >
                <div>
                  <h3>{reservation.customerName}</h3>
                  <p>{reservation.date}</p>
                  <p>Guests: {reservation.guests}</p>
                  <p>Status: {reservation.status}</p>
                </div>
                <div className="card-actions">
                  <button className="btn-secondary">Edit</button>
                  <button className="btn-danger">Cancel</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="card">
          <div className="card-header">
            <h3>Add Reservation</h3>
          </div>
          <div className="card-content">
            <ReservationForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
