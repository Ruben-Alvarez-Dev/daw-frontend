import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserForm from './UserForm';

const UserList = ({ onEdit }) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://reservations.rubenalvarez.dev/public/index.php/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`https://reservations.rubenalvarez.dev/public/index.php/api/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  return (
    <div>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => onEdit(user)}>Editar</button>
            <button onClick={() => handleDelete(user.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <UserForm user={null} onSave={fetchUsers} />
    </div>
  );
};

export default UserList;