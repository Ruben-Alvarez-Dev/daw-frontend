import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../helpers/api';

const UserList = ({ onEdit, mode }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      fetchUsers();
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  return (
    <div>
      {mode === 'create' && (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.name} - {user.email}
              <button onClick={() => onEdit(user)}>Editar</button>
              <button onClick={() => handleDelete(user.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;