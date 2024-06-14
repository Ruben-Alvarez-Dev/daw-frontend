import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TableList = ({ onEdit }) => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const response = await axios.get('https://reservations.rubenalvarez.dev/public/index.php/api/tables');
      setTables(response.data);
    } catch (error) {
      console.error('Error al obtener las mesas:', error);
    }
  };

  const handleDelete = async (tableId) => {
    try {
      await axios.delete(`https://reservations.rubenalvarez.dev/public/index.php/api/tables/${tableId}`);
      fetchTables();
    } catch (error) {
      console.error('Error al eliminar la mesa:', error);
    }
  };

  return (
    <ul>
      {tables.map(table => (
        <li key={table.id}>
          {table.name} - Capacidad: {table.capacity}
          <button onClick={() => onEdit(table)}>Editar</button>
          <button onClick={() => handleDelete(table.id)}>Eliminar</button>
        </li>
      ))}
    </ul>
  );
};

export default TableList;