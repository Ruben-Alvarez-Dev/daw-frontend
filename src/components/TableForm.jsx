import './css/TableForm.css';
import React, { useState, useEffect, useCallback } from 'react';
import { postTable, putTable, getTable, deleteTable, getTables } from '../helpers/api';

const TableForm = ({ table, onSave, fetchTableList, updateTables }) => {
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [status, setStatus] = useState('free');
  const [isEditing, setIsEditing] = useState(false);
  const [originalTable, setOriginalTable] = useState(null);
  const [capacityError, setCapacityError] = useState(false);
  const [nameError, setNameError] = useState(false);

  useEffect(() => {
    if (table) {
      setIsEditing(true);
      fetchOriginalTable(table.id);
    } else {
      setName('');
      setCapacity('');
      setStatus('free');
      setIsEditing(false);
      setOriginalTable(null);
      setCapacityError(false);
      setNameError(false);
    }
  }, [table]);

  const fetchOriginalTable = useCallback(async (tableId) => {
    try {
      const data = await getTable(tableId);
      setOriginalTable(data);
      setName(data.name);
      setCapacity(data.capacity.toString());
      setStatus(data.status);
    } catch (error) {
      console.error('Error al obtener la mesa:', error);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      setNameError(true);
      return;
    }

    if (!capacity) {
      setCapacityError(true);
      return;
    }

    try {
      const updatedTable = {
        name: name !== originalTable?.name ? name : undefined,
        capacity: capacity !== originalTable?.capacity ? parseInt(capacity) : undefined,
        status: status !== originalTable?.status ? status : undefined,
      };

      let updatedTables;

      if (table) {
        const response = await putTable(table.id, updatedTable);
        updatedTables = await getTables();
      } else {
        const newTable = await postTable({ name, capacity: parseInt(capacity), status });
        updatedTables = await getTables();
      }

      onSave();
      fetchTableList();
      updateTables(updatedTables);
      resetForm();
    } catch (error) {
      console.error('Error al guardar la mesa:', error);
    }
  };

  const resetForm = () => {
    setName('');
    setCapacity('');
    setStatus('free');
    setIsEditing(false);
    setOriginalTable(null);
    setCapacityError(false);
    setNameError(false);
  };

  const handleDeleteTable = async () => {
    try {
      if (isEditing && table.id) {
        await deleteTable(table.id);
        const updatedTables = await getTables();
        onSave();
        fetchTableList();
        updateTables(updatedTables);
        resetForm();
      }
    } catch (error) {
      console.error('Error al eliminar la mesa:', error);
    }
  };

  return (
    <form className="table-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={nameError ? 'error' : ''}
      />
      {nameError && <p className="error-message">El nombre es obligatorio.</p>}
      <input
        type="number"
        placeholder="Capacidad"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
        className={capacityError ? 'error' : ''}
      />
      {capacityError && <p className="error-message">La capacidad es obligatoria.</p>}
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="free">Libre</option>
        <option value="scheduled">Programada</option>
        <option value="occupied">Ocupada</option>
      </select>
      <div className="button-bar">
        <button type="submit">{table ? 'Guardar' : 'Crear'}</button>
        {isEditing && (
          <>
            <button type="button" onClick={resetForm}>
              Clear
            </button>
            <button type="button" onClick={handleDeleteTable}>
              Eliminar
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default TableForm;