import { useState, useEffect } from 'react'
import { useSelectedItem } from '../../context/SelectedItemContext'
import '../../pages/Lists.css'

const ReservationsList = () => {
  const [reservations, setReservations] = useState([])
  const { selectItem } = useSelectedItem()

  useEffect(() => {
    fetch('http://localhost:3000/reservations')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched reservations:', data)
        setReservations(data)
      })
      .catch(error => console.error('Error fetching reservations:', error))
  }, [])

  const handleReservationClick = (reservation) => {
    console.log('Clicked reservation:', reservation)
    selectItem('reservation', reservation)
  }

  return (
    <div className="lists-item">
      <h2 className="list-title">Reservas</h2>
      <div className="list-content">
        {reservations.map(reservation => (
          <div
            key={reservation.reservation_id}
            className="list-item"
            onClick={() => handleReservationClick(reservation)}
          >
            <h3>Reserva #{reservation.reservation_id}</h3>
            <p>reservation_id: {reservation.reservation_id}</p>
            <p>reservation_user_id: {reservation.reservation_user_id}</p>
            <p>reservation_table_id: {reservation.reservation_table_id}</p>
            <p>reservation_restaurant_id: {reservation.reservation_restaurant_id}</p>
            <p>reservation_date: {reservation.reservation_date}</p>
            <p>reservation_time_slot: {reservation.reservation_time_slot}</p>
            <p>reservation_num_guests: {reservation.reservation_num_guests}</p>
            <p>reservation_status: {reservation.reservation_status}</p>
            <p>reservation_special_requests: {reservation.reservation_special_requests}</p>
            <p>reservation_created_at: {reservation.reservation_created_at}</p>
            <p>reservation_updated_at: {reservation.reservation_updated_at}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReservationsList
