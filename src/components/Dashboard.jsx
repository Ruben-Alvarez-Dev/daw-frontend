import React, { useState } from 'react';
import UserList from './UserList';
import UserForm from './UserForm';
import TableList from './TableList';
import TableForm from './TableForm';
import ReservationList from './ReservationList';
import ReservationForm from './ReservationForm';

const Dashboard = () => {
  const [userToEdit, setUserToEdit] = useState(null);
  const [tableToEdit, setTableToEdit] = useState(null);
  const [reservationToEdit, setReservationToEdit] = useState(null);

  const handleEditUser = (user) => {
    setUserToEdit(user);
  };

  const handleSaveUser = () => {
    setUserToEdit(null);
  };

  const handleEditTable = (table) => {
    setTableToEdit(table);
  };

  const handleSaveTable = () => {
    setTableToEdit(null);
  };

  const handleEditReservation = (reservation) => {
    setReservationToEdit(reservation);
  };

  const handleSaveReservation = () => {
    setReservationToEdit(null);
  };

  return (
    <div>
      <h2>Usuarios</h2>
      <UserForm user={userToEdit} onSave={handleSaveUser} />
      <UserList onEdit={handleEditUser} />

      <h2>Mesas</h2>
      <TableForm table={tableToEdit} onSave={handleSaveTable} />
      <TableList onEdit={handleEditTable} />

      <h2>Reservas</h2>
      <ReservationForm reservation={reservationToEdit} onSave={handleSaveReservation} />
      <ReservationList onEdit={handleEditReservation} />
    </div>
  );
};

export default Dashboard;