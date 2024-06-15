import React, { useEffect, useState } from 'react';
import { getReservations, deleteReservation } from '../helpers/api';

const ReservationList = ({ onEdit, mode, fetchReservations }) => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservationsData();
  }, [fetchReservations]);

  const fetchReservationsData = async () => {
    try {
      const data = await getReservations();
      setReservations(data);
    } catch (error) {
      console.error('Error al obtener las reservas:', error);
    }
  };

  const handleDelete = async (reservationId) => {
    try {
      await deleteReservation(reservationId);
      fetchReservationsData();
    } catch (error) {
      console.error('Error al eliminar la reserva:', error);
    }
  };

  return (
    <div>
      {mode === 'create' && reservations && reservations.length > 0 && (
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation.id}>
              Reserva {reservation.id} - Usuario: {reservation.user_id} - Mesas:{' '}
              {reservation.table_ids ? reservation.table_ids.join(', ') : 'N/A'} - Fecha: {reservation.date} - Hora:{' '}
              {reservation.time} - Estado: {reservation.status} - Número de personas: {reservation.pax_number}
              <button onClick={() => onEdit(reservation)}>Editar</button>
              <button onClick={() => handleDelete(reservation.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
      {mode === 'create' && (!reservations || reservations.length === 0) && (
        <p>No hay reservas disponibles.</p>
      )}
    </div>
  );
};

export default ReservationList;