import './css/ReservationForm.css';
import React, { useState, useEffect } from 'react';
import { postReservation, putReservation, getUsers, getTables } from '../helpers/api';

const ReservationForm = ({ reservation, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    user_id: '',
    table_ids: [],
    date: '',
    time: '',
    status: '',
    pax_number: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserList, setShowUserList] = useState(false);
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);

  useEffect(() => {
    if (reservation) {
      setFormData({
        user_id: reservation.user_id ? reservation.user_id.toString() : '',
        table_ids: reservation.table_ids ? reservation.table_ids : [],
        date: reservation.date || '',
        time: reservation.time || '',
        status: reservation.status || '',
        pax_number: reservation.pax_number || ''
      });
      setSelectedUser({ id: reservation.user_id, name: reservation.user_name }); // Asumiendo que 'user_name' es parte del objeto de reserva
    } else {
      setFormData({
        user_id: '',
        table_ids: [],
        date: '',
        time: '',
        status: '',
        pax_number: ''
      });
      setSelectedUser(null);
    }
  }, [reservation]);

  useEffect(() => {
    fetchUsersData(); // Cargar los usuarios al montar el componente
    fetchTables(); // Cargar las mesas al montar el componente
  }, []);

  const fetchUsersData = async () => {
    try {
      const data = await getUsers();
      setFilteredUsers(data);
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
    if (value.trim() === '') {
      setFilteredUsers([]);
      setShowUserList(false);
    } else {
      const filtered = filteredUsers.filter(user =>
        user.name.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUsers(filtered);
      setShowUserList(true);
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
    } catch (error) {
      console.error('Error al guardar la reserva:', error);
    }
  };

  return (
    <form className="reservation-form" onSubmit={handleSubmit}>
      <div className="form-line">
        <input
          type="text"
          id="user_search"
          value={searchTerm}
          placeholder={selectedUser ? selectedUser.name : "Buscar..."}
          onChange={handleInputChange}
          onFocus={() => setShowUserList(true)} // Mostrar la lista de usuarios al enfocar el input
        />
        {showUserList && (
          <select
            className="user-select"
            onChange={handleUserSelect}
            value={selectedUser ? selectedUser.id : ''}
          >
            <option value="" disabled hidden>
              {selectedUser ? selectedUser.name : "Ningún usuario seleccionado"}
            </option>
            {filteredUsers.map(user => (
              <option key={user.id} value={user.id}>
                {user.name} - {user.email}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="form-line">
        <div>
          <span>
            {formData.table_ids.length > 0
              ? `Mesas seleccionadas: ${formData.table_ids.join(', ')}`
              : 'No hay mesas seleccionadas'}
          </span>
          <select
            value={selectedTable ? selectedTable.id : ''}
            onChange={(e) =>
              setSelectedTable(tables.find((table) => table.id === parseInt(e.target.value)))
            }
          >
            <option value="">Seleccionar mesa</option>
            {tables.map((table) => (
              <option key={table.id} value={table.id}>
                {table.name} (Capacidad: {table.capacity})
              </option>
            ))}
          </select>
          <button type="button" onClick={handleAddTable}>
            Agregar
          </button>
          <button type="button" onClick={handleClearTables}>
            Clear
          </button>
        </div>
      </div>

      <div className="form-line">
        <label htmlFor="date">Fecha</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="form-input"
        />
      </div>
      <div className="form-line">
        <label htmlFor="time">Hora</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          className="form-input"
        />
      </div>
      <div className="form-line">
        <label htmlFor="status">Estado</label>
        <input
          type="text"
          name="status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="form-input"
        />
      </div>
      <div className="form-line">
        <label htmlFor="pax_number">Número de personas</label>
        <input
          type="number"
          name="pax_number"
          value={formData.pax_number}
          onChange={(e) => setFormData({ ...formData, pax_number: e.target.value })}
          className="form-input"
        />
      </div>
      <div className="button-bar">
        <button type="submit">Guardar</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
};

export default ReservationForm;
