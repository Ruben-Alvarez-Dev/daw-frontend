import './css/TableForm.css';
import React, { useState, useEffect } from 'react';
import { postTable, putTable, getTable } from '../helpers/api';

const TableForm = ({ table, onSave, fetchTables, fetchTableList }) => {
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [originalTable, setOriginalTable] = useState(null);
  const [capacityError, setCapacityError] = useState(false);

  useEffect(() => {
    if (table) {
      setIsEditing(true);
      fetchOriginalTable(table.id);
    } else {
      setName('');
      setCapacity('');
      setIsEditing(false);
      setOriginalTable(null);
      setCapacityError(false);
    }
  }, [table]);

  const fetchOriginalTable = async (tableId) => {
    try {
      const data = await getTable(tableId);
      setOriginalTable(data);
      setName(data.name);
      setCapacity(data.capacity.toString());
    } catch (error) {
      console.error('Error al obtener la mesa:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedTable = {
        name: name !== originalTable?.name ? name : undefined,
        capacity: capacity !== originalTable?.capacity ? parseInt(capacity) : undefined,
      };
      if (table) {
        await putTable(table.id, updatedTable);
      } else {
        if (!capacity) {
          setCapacityError(true);
          return;
        }
        await postTable({ name, capacity: parseInt(capacity) });
      }
      onSave();
      fetchTables();
      fetchTableList();
      resetForm();
    } catch (error) {
      console.error('Error al guardar la mesa:', error);
    }
  };

  const resetForm = () => {
    setName('');
    setCapacity('');
    setIsEditing(false);
    setOriginalTable(null);
    setCapacityError(false);
  };

  return (
    <form className="table-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
      <input
        type="number"
        placeholder="Capacidad"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
        className={capacityError ? 'error' : ''}
      />
      {capacityError && <p className="error-message">La capacidad es obligatoria al crear una nueva mesa.</p>}
      <div className="button-bar">
        <button type="submit">{table ? 'Guardar' : 'Crear'}</button>
        {isEditing && <button type="button" onClick={resetForm}>Clear</button>}
      </div>
    </form>
  );
};

export default TableForm;