import { useEffect, useState } from 'react';
import { getUsers } from '../../services/api';

export const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="user-list">
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id} className="user-card">
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p>{user.phone}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
