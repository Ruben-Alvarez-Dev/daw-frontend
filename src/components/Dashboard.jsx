import React, { useState } from 'react';
import UserList from './UserList';
import UserForm from './UserForm';
import TableList from './TableList';
import TableForm from './TableForm';
import ReservationList from './ReservationList';
import ReservationForm from './ReservationForm';
import axios from 'axios';

const Dashboard = () => {
  const [userMode, setUserMode] = useState('create');
  const [tableMode, setTableMode] = useState('create');
  const [reservationMode, setReservationMode] = useState('create');
  const [userToEdit, setUserToEdit] = useState(null);
  const [tableToEdit, setTableToEdit] = useState(null);
  const [reservationToEdit, setReservationToEdit] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://reservations.rubenalvarez.dev/public/index.php/api/users');
      // Aquí puedes actualizar el estado de los usuarios si es necesario
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  const fetchTables = async () => {
    try {
      const response = await axios.get('https://reservations.rubenalvarez.dev/public/index.php/api/tables');
      // Aquí puedes actualizar el estado de las mesas si es necesario
    } catch (error) {
      console.error('Error al obtener las mesas:', error);
    }
  };

  const fetchReservations = async () => {
    try {
      const response = await axios.get('https://reservations.rubenalvarez.dev/public/index.php/api/reservations');
      // Aquí puedes actualizar el estado de las reservas si es necesario
    } catch (error) {
      console.error('Error al obtener las reservas:', error);
    }
  };

  const handleEditUser = (user) => {
    setUserMode('edit');
    setUserToEdit(user);
  };

  const handleSaveUser = () => {
    setUserMode('create');
    setUserToEdit(null);
  };

  const handleEditTable = (table) => {
    setTableMode('edit');
    setTableToEdit(table);
  };

  const handleSaveTable = () => {
    setTableMode('create');
    setTableToEdit(null);
  };

  const handleEditReservation = (reservation) => {
    setReservationMode('edit');
    setReservationToEdit(reservation);
  };

  const handleSaveReservation = () => {
    setReservationMode('create');
    setReservationToEdit(null);
  };

  return (
    <div>
      <h2>Usuarios</h2>
      {userMode === 'edit' ? (
        <UserForm user={userToEdit} onSave={handleSaveUser} fetchUsers={fetchUsers} />
      ) : (
        <UserForm onSave={handleSaveUser} fetchUsers={fetchUsers} />
      )}
      <UserList onEdit={handleEditUser} mode={userMode} fetchUsers={fetchUsers} />

      <h2>Mesas</h2>
      {tableMode === 'edit' ? (
        <TableForm table={tableToEdit} onSave={handleSaveTable} fetchTables={fetchTables} />
      ) : (
        <TableForm onSave={handleSaveTable} fetchTables={fetchTables} />
      )}
      <TableList onEdit={handleEditTable} mode={tableMode} fetchTables={fetchTables} />

      <h2>Reservas</h2>
      {reservationMode === 'edit' ? (
        <ReservationForm reservation={reservationToEdit} onSave={handleSaveReservation} fetchReservations={fetchReservations} />
      ) : (
        <ReservationForm onSave={handleSaveReservation} fetchReservations={fetchReservations} />
      )}
      <ReservationList onEdit={handleEditReservation} mode={reservationMode} fetchReservations={fetchReservations} />
    </div>
  );
};

export default Dashboard;