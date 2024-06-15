import React, { useEffect, useState } from 'react';
import { getTables, deleteTable } from '../helpers/api';

const TableList = ({ onEdit, mode }) => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const data = await getTables();
      setTables(data);
    } catch (error) {
      console.error('Error al obtener las mesas:', error);
    }
  };

  const handleDelete = async (tableId) => {
    try {
      await deleteTable(tableId);
      fetchTables();
    } catch (error) {
      console.error('Error al eliminar la mesa:', error);
    }
  };

  return (
    <div>
      {mode === 'create' && (
        <ul>
          {tables.map(table => (
            <li key={table.id}>
              {table.name} - Capacidad: {table.capacity}
              <button onClick={() => onEdit(table)}>Editar</button>
              <button onClick={() => handleDelete(table.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TableList;