import './css/ReservationForm.css';
import React, { useState, useEffect } from 'react';
import { postReservation, putReservation, getUsers, getTables } from '../helpers/api';

const initialFormData = {
  id: '',
  user_id: '',
  table_ids: [],
  date: '',
  time: '',
  status: 'pending',
  pax_number: ''
};

const ReservationForm = ({ reservation, onSave, onCancel }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserList, setShowUserList] = useState(false);
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);

  useEffect(() => {
    if (reservation) {
      setFormData({
        id: reservation.id || '',
        user_id: reservation.user_id ? reservation.user_id.toString() : '',
        table_ids: reservation.table_ids ? reservation.table_ids : [],
        date: reservation.date || '',
        time: reservation.time || '',
        status: reservation.status || 'pending',
        pax_number: reservation.pax_number || ''
      });

      const fetchSelectedUser = async () => {
        try {
          const usersData = await getUsers();
          const selectedUser = usersData.find(user => user.id === reservation.user_id);
          setSelectedUser(selectedUser);
        } catch (error) {
          console.error('Error al obtener el usuario seleccionado:', error);
        }
      };

      fetchSelectedUser();
    } else {
      setFormData(initialFormData);
      setSelectedUser(null);
    }
  }, [reservation]);

  useEffect(() => {
    fetchUsersData();
    fetchTables();
  }, []);

  const fetchUsersData = async () => {
    try {
      const data = await getUsers();
      setFilteredUsers(data); // Inicializar filteredUsers con todos los usuarios al cargar
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  const fetchTables = async () => {
    try {
      const tablesData = await getTables();
      setTables(tablesData);
    } catch (error) {
      console.error('Error al obtener las mesas:', error);
    }
  };

  const handleInputChange = async (e) => {
    const { value } = e.target;
    setSearchTerm(value);

    try {
      const data = await getUsers(); // Obtener los usuarios cada vez que cambia el input
      const filtered = data.filter(user =>
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
    const userId = parseInt(e.target.value);
    const selectedUser = filteredUsers.find(user => user.id === userId);
    setSelectedUser(selectedUser);
    setFormData(prevFormData => ({
      ...prevFormData,
      user_id: selectedUser.id
    }));
    setSearchTerm(selectedUser.name); // Mostrar el nombre seleccionado como placeholder
    setShowUserList(false); // Ocultar la lista de usuarios al seleccionar uno
  };

  const handleAddTable = () => {
    if (selectedTable) {
      setFormData(prevFormData => ({
        ...prevFormData,
        table_ids: [...prevFormData.table_ids, selectedTable.id]
      }));
      setSelectedTable(null);
    }
  };

  const handleClearTables = () => {
    setFormData(prevFormData => ({
      ...prevFormData,
      table_ids: []
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await putReservation(formData.id, formData);
      } else {
        await postReservation(formData);
      }
      onSave();
      setFormData(initialFormData);
      setSelectedUser(null);
      setSelectedTable(null);
      setSearchTerm('');
      setShowUserList(false);
    } catch (error) {
      console.error('Error al guardar la reserva:', error);
    }
  };

  return (
    <form className="reservation-form" onSubmit={handleSubmit}>
      <div className="form-line column">
        <input
          type="text"
          className='user-search'
          id="user_search"
          value={searchTerm}
          placeholder={selectedUser ? selectedUser.name : "Buscar..."}
          onChange={handleInputChange}
          onFocus={() => setShowUserList(true)}
        />
        <select
          className="user-select"
          onChange={handleUserSelect}
          value={selectedUser ? selectedUser.id : ''}
        >
          {showUserList && (
            filteredUsers.length > 0 ? (
              <>
                <option value="" disabled hidden>
                  {selectedUser ? selectedUser.name : "Ningún usuario seleccionado"}
                </option>
                {filteredUsers.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name} - {user.email}
                  </option>
                ))}
              </>
            ) : (
              <option value="" disabled>No hay resultados</option>
            )
          )}
        </select>
      </div>

      <div className="form-line column">

          <div className="block">
            <span>
              {formData.table_ids.length > 0
                ? `Mesas: ${formData.table_ids.join(', ')}`
                : 'Sin mesa'}
            </span>
          </div>
          
          <div className='row'>
            
            <div>
              <select
                value={selectedTable ? selectedTable.id : ''}
                onChange={(e) =>
                  setSelectedTable(tables.find((table) => table.id === parseInt(e.target.value)))
                }
              >
                <option value="">Seleccionar...</option>
                {tables.map((table) => (
                  <option key={table.id} value={table.id}>
                    {table.name} (Capacidad: {table.capacity})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="button-bar">
              <button type="button" onClick={handleAddTable}>
                Agregar
              </button>
              <button type="button" onClick={handleClearTables}>
                Clear
              </button>
            </div>
            
          </div>

      </div>

      <div className="form-line">
        <label htmlFor="date-time">Fecha y Hora</label>
        <div>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="form-input"
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className="form-input"
          />
        </div>
      </div>

      <div className="form-line">
         <div className='block'>
          <select
            name="status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
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
            value={formData.pax_number}
            onChange={(e) => setFormData({ ...formData, pax_number: e.target.value })}
            className="form-input pax"
          />
        </div>
      </div>

      <div className="button-bar">
        <button type="submit">Guardar</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
};

export default ReservationForm;
