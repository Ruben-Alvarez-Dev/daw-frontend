import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReservationForm from './ReservationForm';

const ReservationList = ({ onEdit }) => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axios.get('https://reservations.rubenalvarez.dev/public/index.php/api/reservations');
      setReservations(response.data);
    } catch (error) {
      console.error('Error al obtener las reservas:', error);
    }
  };

  const handleDelete = async (reservationId) => {
    try {
      await axios.delete(`https://reservations.rubenalvarez.dev/public/index.php/api/reservations/${reservationId}`);
      fetchReservations();
    } catch (error) {
      console.error('Error al eliminar la reserva:', error);
    }
  };

  const handleSave = () => {
    fetchReservations();
  };

  return (
    <div>
      <ul>
        {reservations.map(reservation => (
          <li key={reservation.id}>
            Reserva {reservation.id} - Usuario: {reservation.user_id} - Mesas: {reservation.table_ids ? reservation.table_ids.join(', ') : 'N/A'} - Fecha: {reservation.date} - Hora: {reservation.time} - Estado: {reservation.status}
            <button onClick={() => onEdit(reservation)}>Editar</button>
            <button onClick={() => handleDelete(reservation.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <ReservationForm reservation={null} onSave={handleSave} />
    </div>
  );
};

export default ReservationList;