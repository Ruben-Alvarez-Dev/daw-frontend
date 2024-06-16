import './css/ReservationList.css';
import React, { useEffect, useState } from 'react';
import { getReservations, deleteReservation, getUsers, getTables } from '../helpers/api';

const ReservationList = ({ onEdit, mode, fetchReservationList }) => {
  const [reservations, setReservations] = useState([]);
  const [users, setUsers] = useState({});
  const [tables, setTables] = useState({});

  useEffect(() => {
    fetchReservationsData();
    fetchUsersData();
    fetchTablesData();
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

  const fetchTablesData = async () => {
    try {
      const data = await getTables();
      const tablesMap = data.reduce((acc, table) => {
        acc[table.id] = table;
        return acc;
      }, {});
      setTables(tablesMap);
    } catch (error) {
      console.error('Error al obtener las mesas:', error);
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

  const getStatusClassName = (status) => {
    switch (status) {
      case 'pending':
        return 'pending';
      case 'confirmed':
        return 'confirmed';
      case 'cancelled':
        return 'cancelled';
      default:
        return '';
    }
  };

  return (
    <div className="reservation-list">
      {reservations && reservations.length > 0 ? (
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation.id} className={getStatusClassName(reservation.status)}>
              {users[reservation.user_id] || 'Usuario desconocido'} -
              {reservation.table_ids.length > 0
                ? reservation.table_ids.map(tableId => tables[tableId]?.name).join(', ')
                : 'Sin mesa'} -
              {reservation.date} - {reservation.time.slice(0, 5)} - 
              {" " + reservation.status} - Pax: {reservation.pax_number}
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
