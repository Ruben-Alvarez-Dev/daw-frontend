import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReservationForm = ({ reservation, onSave }) => {
  const [userId, setUserId] = useState('');
  const [tableIds, setTableIds] = useState('');
  const [paxNumber, setPaxNumber] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    if (reservation) {
      setUserId(reservation.user_id);
      setTableIds(reservation.table_ids ? reservation.table_ids.join(', ') : '');
      setPaxNumber(reservation.pax_number);
      setDate(reservation.date);
      setTime(reservation.time);
      setStatus(reservation.status);
    } else {
      setUserId('');
      setTableIds('');
      setPaxNumber('');
      setDate('');
      setTime('');
      setStatus('pending');
    }
  }, [reservation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        user_id: userId,
        table_ids: tableIds.split(',').map(id => parseInt(id.trim())),
        pax_number: paxNumber,
        date,
        time,
        status,
      };
      if (reservation) {
        await axios.put(`https://reservations.rubenalvarez.dev/public/index.php/api/reservations/${reservation.id}`, data);
      } else {
        await axios.post('https://reservations.rubenalvarez.dev/public/index.php/api/reservations', data);
      }
      onSave();
      setUserId('');
      setTableIds('');
      setPaxNumber('');
      setDate('');
      setTime('');
      setStatus('pending');
    } catch (error) {
      console.error('Error al guardar la reserva:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" placeholder="ID de Usuario" value={userId} onChange={e => setUserId(e.target.value)} />
      <input type="text" placeholder="IDs de Mesas (separados por comas)" value={tableIds} onChange={e => setTableIds(e.target.value)} />
      <input type="number" placeholder="Número de Personas" value={paxNumber} onChange={e => setPaxNumber(e.target.value)} />
      <input type="date" placeholder="Fecha" value={date} onChange={e => setDate(e.target.value)} />
      <input type="time" placeholder="Hora" value={time} onChange={e => setTime(e.target.value)} />
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="pending">Pendiente</option>
        <option value="confirmed">Confirmada</option>
        <option value="cancelled">Cancelada</option>
      </select>
      <button type="submit">{reservation ? 'Guardar' : 'Crear'}</button>
    </form>
  );
};

export default ReservationForm;