import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import users from '../../../data/users.json';
import tables from '../../../data/tables.json';
import reservations from '../../../data/reservations.json';
import restaurants from '../../../data/restaurants.json';
import UserList from './UserList';
import UserForm from './UserForm';
import TableList from './TableList';
import TableForm from './TableForm';
import ReservationList from './ReservationList';
import ReservationForm from './ReservationForm';
import Sidebar from './Sidebar';

const Dashboard = () => {
  const [userMode, setUserMode] = useState('create');
  const [tableMode, setTableMode] = useState('create');
  const [reservationMode, setReservationMode] = useState('create');
  const [userToEdit, setUserToEdit] = useState(null);
  const [tableToEdit, setTableToEdit] = useState(null);
  const [reservationToEdit, setReservationToEdit] = useState(null);
  const [usersList, setUsersList] = useState(users);
  const [tablesList, setTablesList] = useState(tables);
  const [reservationsList, setReservationsList] = useState(reservations);
  const [selectedCategory, setSelectedCategory] = useState('global');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const handleCategorySelect = (category, restaurantId = null) => {
    setSelectedCategory(category);
    setSelectedRestaurant(restaurantId);
  };

  const handleEditUser = (user) => {
    setUserMode('edit');
    setUserToEdit({...user});
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
    <div className="dashboard-container">
      <Sidebar 
        onCategorySelect={handleCategorySelect}
        restaurants={restaurants}
      />
      <div className="dashboard-content">
        {selectedCategory === 'global' && (
          <>
            <div className="card">
              <h2>Usuarios</h2>
              <UserList users={usersList} onEditUser={handleEditUser} onUpdateList={() => {}} />
              <UserForm mode={userMode} userToEdit={userToEdit} onSave={handleSaveUser} />
            </div>
            <div className="card">
              <h2>Mesas</h2>
              <TableList tables={tablesList} onEditTable={handleEditTable} onUpdateList={() => {}} />
              <TableForm mode={tableMode} tableToEdit={tableToEdit} onSave={handleSaveTable} />
            </div>
            <div className="card">
              <h2>Reservas</h2>
              <ReservationList
                reservations={reservationsList}
                onEditReservation={handleEditReservation}
                onUpdateList={() => {}}
              />
              <ReservationForm
                mode={reservationMode}
                reservationToEdit={reservationToEdit}
                onSave={handleSaveReservation}
                tables={tablesList}
                users={usersList}
              />
            </div>
          </>
        )}
        {selectedCategory === 'restaurant' && (
          <div className="restaurant-view">
            <h2>Vista del Restaurante {selectedRestaurant}</h2>
            {/* Aquí irá el contenido específico del restaurante */}
          </div>
        )}
        {selectedCategory === 'settings' && (
          <div className="settings-view">
            <h2>Configuración</h2>
            {/* Aquí irá el contenido de configuración */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;