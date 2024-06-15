import React, { useState, useEffect } from 'react';
import { postTable, putTable } from '../helpers/api';

const TableForm = ({ table, onSave, fetchTables }) => {
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
        await putTable(table.id, { name, capacity: parseInt(capacity) });
      } else {
        await postTable({ name, capacity: parseInt(capacity) });
      }
      onSave();
      fetchTables();
      resetForm();
    } catch (error) {
      console.error('Error al guardar la mesa:', error);
    }
  };

  const resetForm = () => {
    setName('');
    setCapacity('');
  };

  return (
    <form className="table-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} />
      <input type="number" placeholder="Capacidad" value={capacity} onChange={e => setCapacity(e.target.value)} />
      <button type="submit">{table ? 'Guardar' : 'Crear'}</button>
    </form>
  );
};

export default TableForm;