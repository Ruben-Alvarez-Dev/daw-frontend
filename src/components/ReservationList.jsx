import './css/ReservationList.css';
import React, { useEffect, useState } from 'react';
import { getReservations, deleteReservation, getUsers, getTables, putTable } from '../helpers/api';

const ReservationList = ({ onEdit, mode, fetchReservationList, updateTables }) => {
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

  const handleDelete = async (reservation) => {
    try {
      // Actualizar el estado de las mesas asociadas a la reserva a "free"
      const updatedTables = await Promise.all(
        reservation.table_ids.map(async (tableId) => {
          const table = await putTable(tableId, { status: 'free' });
          return table;
        })
      );

      // Obtener la lista completa de mesas actualizada
      const allTables = await getTables();
      updateTables(allTables);

      // Eliminar la reserva después de actualizar el estado de las mesas
      await deleteReservation(reservation.id);

      // Volver a obtener la lista de reservas después de eliminar la reserva
      await fetchReservationsData();
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
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id} className={reservation.status.toLowerCase()}>
            <span>
              {users[reservation.user_id] || 'Usuario desconocido'} - 
              {reservation.table_ids.length > 0
                ? reservation.table_ids.map(tableId => tables[tableId]?.name).join(', ')
                : 'Sin mesa'} - 
              {reservation.date} - {reservation.time.slice(0, 5)} - 
              {" " + reservation.status} - Pax: {reservation.pax_number}
            </span>
            <span>
              <button className="edit-btn" onClick={() => onEdit(reservation)}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                  <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                </svg>
              </button>
              <button className="delete-btn" onClick={() => handleDelete(reservation)}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                  <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                </svg>
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationList;