import React, { useState, useEffect, useRef } from 'react';
import { postReservation, putReservation, getTables, deleteReservation } from '../helpers/api';

const ReservationForm = ({ reservation, onSave, fetchReservations, updateReservations }) => {
  const [userId, setUserId] = useState('');
  const [selectedTableIds, setSelectedTableIds] = useState([]);
  const [paxNumber, setPaxNumber] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [status, setStatus] = useState('pending');
  const [isEditing, setIsEditing] = useState(false);
  const [availableTables, setAvailableTables] = useState([]);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const selectRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (reservation) {
      setUserId(reservation.user_id.toString());
      setSelectedTableIds(reservation.table_ids);
      setPaxNumber(reservation.pax_number.toString());
      setDate(reservation.date);
      setTime(reservation.time);
      setStatus(reservation.status);
      setIsEditing(true);
    } else {
      setUserId('');
      setSelectedTableIds([]);
      setPaxNumber('');
      setDate('');
      setTime('');
      setStatus('pending');
      setIsEditing(false);
    }
    fetchAvailableTables();
  }, [reservation]);

  const fetchAvailableTables = async () => {
    try {
      const data = await getTables();
      setAvailableTables(data);
    } catch (error) {
      console.error('Error al obtener las mesas:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        user_id: parseInt(userId),
        table_ids: selectedTableIds,
        pax_number: parseInt(paxNumber),
        date,
        time,
        status,
      };

      if (isEditing) {
        await putReservation(reservation.id, data);
      } else {
        const newReservation = await postReservation(data);
        updateReservations(newReservation);
      }

      onSave();
      fetchReservations();
      resetForm();
    } catch (error) {
      console.error('Error al guardar la reserva:', error);
    }
  };

  const resetForm = () => {
    setUserId('');
    setSelectedTableIds([]);
    setPaxNumber('');
    setDate('');
    setTime('');
    setStatus('pending');
  };

  const handleDeleteReservation = async () => {
    try {
      if (isEditing && reservation.id) {
        await deleteReservation(reservation.id);
        onSave();
        fetchReservations();
        resetForm();
      }
    } catch (error) {
      console.error('Error al eliminar la reserva:', error);
    }
  };

  const toggleSelect = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  const handleClickOutside = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setIsSelectOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Editar Reserva' : 'Crear Reserva'}</h2>
      <input type="number" placeholder="ID de Usuario" value={userId} onChange={(e) => setUserId(e.target.value)} />
      <div ref={containerRef}>
        <label>Mesas:</label>
        <div>
          <select
            multiple
            value={selectedTableIds}
            onChange={(e) => setSelectedTableIds(Array.from(e.target.selectedOptions, (option) => parseInt(option.value)))}
            ref={selectRef}
            size={isSelectOpen ? 5 : 1}
          >
            <option value="">Seleccionar mesas</option>
            {availableTables.map((table) => (
              <option key={table.id} value={table.id}>
                {table.name} (Capacidad: {table.capacity})
              </option>
            ))}
          </select>
          <button type="button" onClick={toggleSelect}>
            {isSelectOpen ? 'Contraer' : 'Expandir'}
          </button>
        </div>
      </div>
      <input type="number" placeholder="Número de Personas" value={paxNumber} onChange={(e) => setPaxNumber(e.target.value)} />
      <input type="date" placeholder="Fecha" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="time" placeholder="Hora" value={time} onChange={(e) => setTime(e.target.value)} />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="pending">Pendiente</option>
        <option value="confirmed">Confirmada</option>
        <option value="cancelled">Cancelada</option>
      </select>
      <button type="submit">{isEditing ? 'Guardar' : 'Crear'}</button>
      {isEditing && <button type="button" onClick={handleDeleteReservation}>Eliminar</button>}
    </form>
  );
};

export default ReservationForm;