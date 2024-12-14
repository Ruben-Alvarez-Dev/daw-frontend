import React from 'react';

const ReservationList = () => {
  const reservations = [
    { 
      id: 1, 
      customerName: 'John Doe',
      date: '2024-12-14',
      time: '19:00',
      guests: 4,
      status: 'confirmed'
    },
    { 
      id: 2, 
      customerName: 'Jane Smith',
      date: '2024-12-15',
      time: '20:00',
      guests: 2,
      status: 'pending'
    },
  ];

  return (
    <div className="card">
      <div className="card-header">
        <h2>Reservations</h2>
        <button className="btn-primary">Add Reservation</button>
      </div>
      <div className="card-content">
        <div className="card-list">
          {reservations.map((reservation) => (
            <div key={reservation.id} className="card-list-item">
              <div>
                <h3>{reservation.customerName}</h3>
                <p>{reservation.date} at {reservation.time}</p>
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
    </div>
  );
};

export default ReservationList;
