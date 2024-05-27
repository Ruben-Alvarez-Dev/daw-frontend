import { useEffect, useState } from 'react';
import { getTables } from '../../services/api';

export const TableList = () => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const data = await getTables();
        setTables(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchTables();
  }, []);

  return (
    <div className="table-list card">
      {tables.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {tables.map((table) => (
            <li key={table.id} className="table-card">
              <p>Table number: {table.number}</p>
              <p>Capacity: {table.capacity} pax</p>
              
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
