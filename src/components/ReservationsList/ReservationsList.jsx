import { useState, useEffect } from 'react'
import { useSelectedItem } from '../../context/SelectedItemContext'
import '../../pages/Lists.css'

const ReservationsList = () => {
  const [reservations, setReservations] = useState([])
  const { selectItem } = useSelectedItem()

  useEffect(() => {
    fetch('http://localhost:3000/reservations')
      .then(response => response.json())
      .then(data => setReservations(data))
      .catch(error => console.error('Error fetching reservations:', error))
  }, [])

  const handleReservationClick = (reservation) => {
    selectItem('reservation', reservation)
  }

  return (
    <div className="lists-item">
      <h2 className="list-title">Reservations</h2>
      <div className="list-content">
        {reservations.map(reservation => (
          <div
            key={reservation.id}
            className="list-item"
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
