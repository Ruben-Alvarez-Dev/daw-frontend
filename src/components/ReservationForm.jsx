import './css/ReservationForm.css';
import React, { useState, useEffect } from 'react';
import { postReservation, putReservation, deleteReservation } from '../helpers/api';

const ReservationForm = ({ reservation, onSave, fetchReservations, fetchReservationList, updateReservations, tables }) => {
  const [reservationData, setReservationData] = useState({
    userId: '',
    selectedTableIds: [],
    paxNumber: '',
    date: '',
    time: '',
    status: 'pending',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);

  useEffect(() => {
    if (reservation) {
      setReservationData({
        userId: reservation.user_id.toString(),
        selectedTableIds: reservation.table_ids,
        paxNumber: reservation.pax_number.toString(),
        date: reservation.date,
        time: reservation.time,
        status: reservation.status,
      });
      setIsEditing(true);
    } else {
      setReservationData({
        userId: '',
        selectedTableIds: [],
        paxNumber: '',
        date: '',
        time: '',
        status: 'pending',
      });
      setIsEditing(false);
    }
  }, [reservation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        user_id: parseInt(reservationData.userId),
        table_ids: JSON.stringify(reservationData.selectedTableIds),
        pax_number: parseInt(reservationData.paxNumber),
        date: reservationData.date,
        time: reservationData.time,
        status: reservationData.status,
      };
  
      console.log('Datos enviados:', data);
  
      if (isEditing) {
        await putReservation(reservation.id, data);
      } else {
        const newReservation = await postReservation(data);
        updateReservations(newReservation);
      }
  
      onSave();
      fetchReservations();
      fetchReservationList();
      resetForm();
    } catch (error) {
      console.error('Error al guardar la reserva:', error);
    }
  };


  const resetForm = () => {
    setReservationData({
      userId: '',
      selectedTableIds: [],
      paxNumber: '',
      date: '',
      time: '',
      status: 'pending',
    });
    setSelectedTable(null);
  };

  const handleDeleteReservation = async () => {
    try {
      if (isEditing && reservation.id) {
        await deleteReservation(reservation.id);
        onSave();
        fetchReservations();
        fetchReservationList();
        resetForm();
      }
    } catch (error) {
      console.error('Error al eliminar la reserva:', error);
    }
  };

  const handleAddTable = () => {
    if (selectedTable) {
      setReservationData((prevData) => ({
        ...prevData,
        selectedTableIds: [...prevData.selectedTableIds, selectedTable.id],
      }));
      setSelectedTable(null);
    }
  };

  const handleClearTables = () => {
    setReservationData((prevData) => ({
      ...prevData,
      selectedTableIds: [],
    }));
  };

  return (
    <form className="reservation-form" onSubmit={handleSubmit}>
      <div className="reservation-line">
        <h2>{isEditing ? 'Editar Reserva' : 'Crear Reserva'}</h2>
      </div>
      <div className="reservation-line">
        <input
          type="number"
          placeholder="ID de Usuario"
          value={reservationData.userId}
          onChange={(e) => setReservationData((prevData) => ({ ...prevData, userId: e.target.value }))}
        />
      </div>

      <div className="reservation-line">
        <div>
          <span>
            {reservationData.selectedTableIds.length > 0
              ? `Mesas seleccionadas: ${reservationData.selectedTableIds.join(', ')}`
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

      <div className="reservation-line">
        <input
          type="date"
          placeholder="Fecha"
          value={reservationData.date}
          onChange={(e) => setReservationData((prevData) => ({ ...prevData, date: e.target.value }))}
        />
        <input
          type="time"
          placeholder="Hora"
          value={reservationData.time}
          onChange={(e) => setReservationData((prevData) => ({ ...prevData, time: e.target.value }))}
        />
      </div>
      <div className="reservation-line">
        <input
          type="number"
          placeholder="Número de Personas"
          value={reservationData.paxNumber}
          onChange={(e) => setReservationData((prevData) => ({ ...prevData, paxNumber: e.target.value }))}
        />
        <select
          value={reservationData.status}
          onChange={(e) => setReservationData((prevData) => ({ ...prevData, status: e.target.value }))}
        >
          <option value="pending">Pendiente</option>
          <option value="confirmed">Confirmada</option>
          <option value="cancelled">Cancelada</option>
        </select>
      </div>
      <div className="reservation-line">
        <button type="submit">{isEditing ? 'Guardar' : 'Crear'}</button>
        {isEditing && <button type="button" onClick={handleDeleteReservation}>Eliminar</button>}
      </div>
    </form>
  );
};

export default ReservationForm;