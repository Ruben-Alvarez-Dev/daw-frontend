import React, { useState, useEffect } from 'react';
import { postReservation, putReservation, getUsers, getTables, putTable } from '../helpers/api';
import './css/ReservationForm.css';

const initialFormData = {
  id: '',
  user_id: '',
  table_ids: [],
  date: '',
  time: '',
  status: 'pending',
  pax_number: ''
};

const ReservationForm = ({ reservation, onSave, onCancel, fetchReservations, fetchReservationList, tables, updateTables }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserList, setShowUserList] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [originalTableIds, setOriginalTableIds] = useState([]);

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
      setOriginalTableIds(reservation.table_ids || []);

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
      setOriginalTableIds([]);
    }
  }, [reservation]);

  const handleInputChange = async (e) => {
    const { value } = e.target;
    setSearchTerm(value);

    try {
      const data = await getUsers();
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
    setSearchTerm(selectedUser.name);
    setShowUserList(false);
  };

  const handleAddTable = async () => {
    if (selectedTable) {
      try {
        // Actualizar el estado de la mesa a "scheduled"
        const updatedTable = await putTable(selectedTable.id, { status: 'scheduled' });

        // Agregar la mesa a la lista de mesas seleccionadas
        setFormData(prevFormData => ({
          ...prevFormData,
          table_ids: [...prevFormData.table_ids, selectedTable.id]
        }));

        // Actualizar el estado de las mesas en el componente padre
        const updatedTables = await getTables();
        updateTables(updatedTables);

        setSelectedTable(null);
      } catch (error) {
        console.error('Error al actualizar la mesa:', error);
      }
    }
  };

  const handleClearTables = async () => {
    try {
      // Revertir el estado de las mesas agregadas a "free"
      const updatedTables = await Promise.all(
        formData.table_ids.map(async (tableId) => {
          const table = await putTable(tableId, { status: 'free' });
          return table;
        })
      );

      setFormData(prevFormData => ({
        ...prevFormData,
        table_ids: []
      }));

      // Actualizar el estado de las mesas en el componente padre
      const allTables = await getTables();
      updateTables(allTables);
    } catch (error) {
      console.error('Error al revertir el estado de las mesas:', error);
    }
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
              {tables.filter(table => table.status === 'free').map((table) => (
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