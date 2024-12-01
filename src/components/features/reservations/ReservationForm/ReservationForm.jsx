import React, { useState, useEffect } from 'react';
import './ReservationForm.css';
import { postReservation, putReservation, getUsers, getTables, putTable } from '../helpers/api';
import { Table, User, Reservation } from '../models';

const ReservationForm = ({ reservation, onSave, onCancel, fetchReservations, fetchReservationList, updateTables }) => {
  const [currentReservation, setCurrentReservation] = useState(new Reservation());
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserList, setShowUserList] = useState(false);
  const [selectedTableId, setSelectedTableId] = useState('');
  const [tables, setTables] = useState([]);

  // Cargar mesas solo una vez al montar el componente
  useEffect(() => {
    let isMounted = true;
    
    const loadTables = async () => {
      try {
        const tablesData = await getTables();
        if (isMounted) {
          // Convertir los datos de la API a instancias de Table
          const tablesToSet = tablesData.map(table => Table.fromAPI(table));
          setTables(tablesToSet);
        }
      } catch (error) {
        console.error('Error al cargar mesas:', error);
      }
    };

    loadTables();
    
    return () => {
      isMounted = false;
    };
  }, []); 

  // Manejar la reserva existente
  useEffect(() => {
    if (reservation) {
      const reservationInstance = Reservation.fromAPI(reservation);
      setCurrentReservation(reservationInstance);
    }
  }, [reservation]);

  const handleInputChange = async (e) => {
    const { value } = e.target;
    setSearchTerm(value);

    try {
      const data = await getUsers();
      const users = data.map(user => User.fromAPI(user));
      const filtered = users.filter(user =>
        user.name.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUsers(filtered);
      setShowUserList(true);
    } catch (error) {
      console.error('Error al filtrar usuarios:', error);
    }
  };

  const handleUserSelect = (e) => {
    const userEmail = e.target.value;
    const user = filteredUsers.find(user => user.email === userEmail);
    setSelectedUser(user);
    setCurrentReservation(prev => {
      prev.userId = user.id;
      return prev;
    });
    setSearchTerm(user ? user.name : '');
    setShowUserList(false);
  };

  const handleTableSelect = (e) => {
    const value = e.target.value;
    if (!value) return;
    setSelectedTableId(value);
  };

  const handleAddTable = async (e) => {
    e.preventDefault();
    if (!selectedTableId) return;

    try {
      const tableId = parseInt(selectedTableId, 10);
      const tableToAdd = tables.find(t => t.id === tableId);

      if (!tableToAdd) {
        alert('Mesa no encontrada');
        return;
      }

      // Usar el método de la clase Reservation
      currentReservation.addTable(tableId);
      setCurrentReservation({ ...currentReservation });

      // Marcar la mesa como scheduled
      tableToAdd.schedule();
      await putTable(tableId, tableToAdd.toAPI());

      // Actualizar lista de mesas
      const updatedTables = await getTables();
      setTables(updatedTables.map(table => Table.fromAPI(table)));

      // Limpiar selección
      setSelectedTableId('');

    } catch (error) {
      console.error('Error al agregar mesa:', error);
    }
  };

  const handleRemoveTable = async (tableId) => {
    try {
      // Usar el método de la clase Reservation
      currentReservation.removeTable(tableId);
      setCurrentReservation({ ...currentReservation });

      // Obtener la instancia de la mesa y marcarla como libre
      const table = tables.find(t => t.id === tableId);
      if (table) {
        table.free();
        await putTable(tableId, table.toAPI());
      }

      // Actualizar lista de mesas
      const updatedTables = await getTables();
      setTables(updatedTables.map(table => Table.fromAPI(table)));

    } catch (error) {
      console.error('Error al eliminar mesa:', error);
    }
  };

  const handleClearTables = async () => {
    try {
      // Liberar todas las mesas
      for (const tableId of currentReservation.tableIds) {
        const table = tables.find(t => t.id === tableId);
        if (table) {
          table.free();
          await putTable(tableId, table.toAPI());
        }
      }

      // Limpiar el estado
      currentReservation.clearTables();
      setCurrentReservation({ ...currentReservation });

      // Actualizar lista de mesas
      const updatedTables = await getTables();
      setTables(updatedTables.map(table => Table.fromAPI(table)));

    } catch (error) {
      console.error('Error al limpiar mesas:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentReservation.id) {
        await putReservation(currentReservation.id, currentReservation.toAPI());
      } else {
        await postReservation(currentReservation.toAPI());
      }
      onSave();
      setCurrentReservation(new Reservation());
      setSelectedUser(null);
      setSelectedTableId('');
      setSearchTerm('');
      setShowUserList(false);
    } catch (error) {
      console.error('Error al guardar la reserva:', error);
    }
  };

  const renderSelectedTables = () => {
    const selectedTables = currentReservation.tableIds;

    if (selectedTables.length === 0) {
      return <div>Sin mesas seleccionadas</div>;
    }

    return (
      <div className="selected-tables">
        <ul className="selected-tables-list">
          {selectedTables.map(tableId => {
            const table = tables.find(t => t.id === tableId);

            if (!table) return null;
            
            return (
              <li key={tableId}>
                Mesa {table.name} (Capacidad: {table.capacity})
                <button
                  type="button"
                  className="clear-table-btn"
                  onClick={() => handleRemoveTable(tableId)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                  </svg>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  const renderTableSelection = () => (
    <div className='table-selection'>
      <select 
        value={selectedTableId || ''} 
        onChange={handleTableSelect}
      >
        <option value="">Seleccionar mesa...</option>
        {tables
          .filter(table => table.status === 'free' || (currentReservation.tableIds && currentReservation.tableIds.includes(table.id)))
          .map(table => (
            <option key={table.id} value={table.id}>
              Mesa {table.name} (Capacidad: {table.capacity})
            </option>
          ))}
      </select>
      <button 
        type="button" 
        onClick={handleAddTable}
        disabled={!selectedTableId}
      >
        Agregar
      </button>
      {currentReservation.tableIds && currentReservation.tableIds.length > 0 && (
        <button 
          type="button" 
          onClick={handleClearTables}
          className="clear-btn"
        >
          Clear
        </button>
      )}
    </div>
  );

  return (
    <div className="reservation-form">
      <form onSubmit={handleSubmit}>
        <div className="form-line column">
          <div className="search-container">
            <input
              type="text"
              className='search-input'
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Buscar usuario..."
              onFocus={() => setShowUserList(true)}
              onBlur={() => {
                setTimeout(() => setShowUserList(false), 200);
              }}
            />
            {showUserList && filteredUsers.length > 0 && (
              <div className="search-results">
                {filteredUsers.map(user => (
                  <div
                    key={user.email}
                    className="search-result-item"
                    onClick={() => {
                      setSelectedUser(user);
                      setCurrentReservation(prev => {
                        prev.userId = user.id;
                        return prev;
                      });
                      setSearchTerm(`${user.name}`);
                      setShowUserList(false);
                    }}
                  >
                    {user.name}
                    <span className="email">({user.email})</span>
                  </div>
                ))}
              </div>
            )}
            <div className="selected-user-info">
              <span>
                {selectedUser ? 
                  `${selectedUser.name} - ${selectedUser.phone} - ${selectedUser.email}` : 
                  "Buscar nombre, email, teléfono..."
                }
              </span>
              <button
                type="button"
                className={`clear-user-btn ${!selectedUser ? 'disabled' : ''}`}
                onClick={() => {
                  if (selectedUser) {
                    setSelectedUser(null);
                    setSearchTerm('');
                    setCurrentReservation(prev => {
                      prev.userId = '';
                      return prev;
                    });
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                  <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="form-line column">
          <div className="block">
            {renderSelectedTables()}
          </div>

          {renderTableSelection()}
        </div>

        <div className="form-line">
          <label htmlFor="date-time">Fecha y Hora</label>
          <div>
            <input
              type="date"
              name="date"
              value={currentReservation.date}
              onChange={(e) => setCurrentReservation({ ...currentReservation, date: e.target.value })}
              className="form-input"
            />
            <input
              type="time"
              name="time"
              value={currentReservation.time}
              onChange={(e) => setCurrentReservation({ ...currentReservation, time: e.target.value })}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-line">
          <div className='block'>
            <select
              name="status"
              value={currentReservation.status}
              onChange={(e) => setCurrentReservation({ ...currentReservation, status: e.target.value })}
              className="form-input"
            >
              <option value="pending">Pendiente</option>
              <option value="confirmed">Confirmada</option>
              <option value="cancelled">Cancelada</option>
            </select>
          </div>
          <div className='row'>
            <label htmlFor="pax_number">Pax: </label>
            <input
              type="number"
              name="pax_number"
              value={currentReservation.paxNumber}
              onChange={(e) => setCurrentReservation({ ...currentReservation, paxNumber: e.target.value })}
              className="form-input pax"
            />
          </div>
        </div>

        <div className="button-bar">
          <button type="submit">Guardar</button>
          <button type="button" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;