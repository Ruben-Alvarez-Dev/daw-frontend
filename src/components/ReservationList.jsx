import './css/ReservationList.css';
import React, { useEffect, useState } from 'react';
import { getReservations, deleteReservation, getUsers } from '../helpers/api';

const ReservationList = ({ onEdit, mode, fetchReservationList }) => {
  const [reservations, setReservations] = useState([]);
  const [users, setUsers] = useState({});

  useEffect(() => {
    fetchReservationsData();
    fetchUsersData();
  }, [fetchReservationList]);

  const fetchReservationsData = async () => {
    try {
      const data = await getReservations();
      setReservations(data);
    } catch (error) {
      console.error('Error al obtener las reservas:', error);
    }
  };

  const fetchUsersData = async () => {
    try {
      const data = await getUsers();
      const usersMap = data.reduce((acc, user) => {
        acc[user.id] = user.name;
        return acc;
      }, {});
      setUsers(usersMap);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
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
    <div className="reservation-list">
      {reservations && reservations.length > 0 ? (
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation.id}>
              {users[reservation.user_id] || 'Usuario desconocido'} - {reservation.table_ids.length > 2 ? reservation.table_ids.join(', ') : 'Sin mesa'} - Fecha/Hora: {reservation.date} - {reservation.time} - {reservation.status} - Pax: {reservation.pax_number}
              <button onClick={() => onEdit(reservation)}>Editar</button>
              <button onClick={() => handleDelete(reservation.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay reservas disponibles.</p>
      )}
    </div>
  );
};

export default ReservationList;
