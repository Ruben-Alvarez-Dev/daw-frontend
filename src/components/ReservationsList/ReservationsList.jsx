import { useState, useEffect } from 'react'
import '../../pages/Lists.css'

const ReservationsList = () => {
  const [reservations, setReservations] = useState([])
  const [selectedReservation, setSelectedReservation] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3000/reservations')
      .then(response => response.json())
      .then(data => setReservations(data))
      .catch(error => console.error('Error fetching reservations:', error))
  }, [])

  const handleReservationClick = (reservation) => {
    setSelectedReservation(selectedReservation?.id === reservation.id ? null : reservation)
  }

  return (
    <div className="lists-item">
      <h2 className="list-title">Reservations</h2>
      <div className="list-content">
        {reservations.map(reservation => (
          <div
            key={reservation.id}
            className={`list-item ${selectedReservation?.id === reservation.id ? 'selected' : ''}`}
            onClick={() => handleReservationClick(reservation)}
          >
            <h3>Reservation #{reservation.id}</h3>
            <p>Date: {reservation.date}</p>
            <p>Time: {reservation.time}</p>
            <p>Table: {reservation.table}</p>
            <p>Guests: {reservation.guests}</p>
            <p>Status: {reservation.status}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReservationsList
