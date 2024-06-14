import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TableForm = ({ table, onSave }) => {
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState('');

  useEffect(() => {
    if (table) {
      setName(table.name);
      setCapacity(table.capacity.toString());
    } else {
      setName('');
      setCapacity('');
    }
  }, [table]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (table) {
        await axios.put(`https://reservations.rubenalvarez.dev/public/index.php/api/tables/${table.id}`, { name, capacity });
      } else {
        await axios.post('https://reservations.rubenalvarez.dev/public/index.php/api/tables', { name, capacity });
      }
      onSave();
      setName('');
      setCapacity('');
    } catch (error) {
      console.error('Error al guardar la mesa:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} />
      <input type="number" placeholder="Capacidad" value={capacity} onChange={e => setCapacity(e.target.value)} />
      <button type="submit">{table ? 'Guardar' : 'Crear'}</button>
    </form>
  );
};

export default TableForm;