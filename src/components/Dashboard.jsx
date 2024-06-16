import './css/Dashboard.css';
import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import UserForm from './UserForm';
import TableList from './TableList';
import TableForm from './TableForm';
import ReservationList from './ReservationList';
import ReservationForm from './ReservationForm';
import axios from 'axios';
import { getUsers, getTables, getReservations } from '../helpers/api';

const Dashboard = () => {
  const [userMode, setUserMode] = useState('create');
  const [tableMode, setTableMode] = useState('create');
  const [reservationMode, setReservationMode] = useState('create');
  const [userToEdit, setUserToEdit] = useState(null);
  const [tableToEdit, setTableToEdit] = useState(null);
  const [reservationToEdit, setReservationToEdit] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [users, setUsers] = useState([]);
  const [tables, setTables] = useState([]);

  useEffect(() => {
    fetchUserList();
    fetchTableList();
    fetchReservationList();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://reservations.rubenalvarez.dev/public/index.php/api/users');
      // Aquí puedes actualizar el estado de los usuarios si es necesario
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  const fetchUserList = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  const fetchTableList = async () => {
    try {
      const data = await getTables();
      setTables(data);
    } catch (error) {
      console.error('Error al obtener las mesas:', error);
    }
  };

  const fetchReservations = async () => {
    try {
      const response = await axios.get('https://reservations.rubenalvarez.dev/public/index.php/api/reservations');
      setReservations(response.data);
    } catch (error) {
      console.error('Error al obtener las reservas:', error);
    }
  };

  const fetchReservationList = async () => {
    try {
      const data = await getReservations();
      setReservations(data);
    } catch (error) {
      console.error('Error al obtener las reservas:', error);
    }
  };

  const updateReservations = (newReservation) => {
    setReservations((prevReservations) => [...prevReservations, newReservation]);
  };

  const handleEditUser = (user) => {
    setUserMode('edit');
    setUserToEdit(user);
  };

  const handleSaveUser = () => {
    setUserMode('create');
    setUserToEdit(null);
    fetchUserList();
  };

  const handleEditTable = (table) => {
    setTableMode('edit');
    setTableToEdit(table);
  };

  const handleSaveTable = () => {
    setTableMode('create');
    setTableToEdit(null);
    fetchTableList();
  };

  const updateTables = (updatedTables) => {
    setTables(updatedTables);
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
    <div className="dashboard">
      <div className="card">
        <h2>Usuarios</h2>
        {userMode === 'edit' ? (
          <UserForm user={userToEdit} onSave={handleSaveUser} fetchUsers={fetchUsers} fetchUserList={fetchUserList} />
        ) : (
          <UserForm onSave={handleSaveUser} fetchUsers={fetchUsers} fetchUserList={fetchUserList} />
        )}
        <UserList users={users} onEdit={handleEditUser} mode={userMode} fetchUserList={fetchUserList} />
      </div>

      <div className="card">
        <h2>Mesas</h2>
        {tableMode === 'edit' ? (
          <TableForm
            table={tableToEdit}
            onSave={handleSaveTable}
            fetchTableList={fetchTableList}
            updateTables={updateTables}
          />
        ) : (
          <TableForm
            onSave={handleSaveTable}
            fetchTableList={fetchTableList}
            updateTables={updateTables}
          />
        )}
        <TableList tables={tables} onEdit={handleEditTable} mode={tableMode} fetchTableList={fetchTableList} />
      </div>

      <div className="card">
        <h2>Reservas</h2>
        {reservationMode === 'edit' ? (
          <ReservationForm
            reservation={reservationToEdit}
            onSave={handleSaveReservation}
            fetchReservations={fetchReservations}
            fetchReservationList={fetchReservationList}
            tables={tables}
            updateTables={updateTables}
          />
        ) : (
          <ReservationForm
            onSave={handleSaveReservation}
            fetchReservations={fetchReservations}
            updateReservations={updateReservations}
            fetchReservationList={fetchReservationList}
            tables={tables}
            updateTables={updateTables}
          />
        )}
        <ReservationList
          reservations={reservations}
          onEdit={handleEditReservation}
          mode={reservationMode}
          fetchReservationList={fetchReservationList}
          updateTables={updateTables}
        />
      </div>
    </div>
  );
};

export default Dashboard;