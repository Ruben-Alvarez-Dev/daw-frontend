import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import UserForm from '../components/user/UserForm';
import Card from '../components/common/Card';
import './Users.css';

const Users = () => {
  const { setActiveUser, activeItems } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await api.getList('users');
      setUsers(data || []);
      setError(null);
    } catch (err) {
      console.error('Error loading users:', err);
      setError('Error al cargar los usuarios');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (user) => {
    setActiveUser(user);
  };

  const handleSave = async (formData) => {
    setError(null);
    
    try {
      const dataToSend = { ...formData };
      
      if (activeItems.user && !formData.password) {
        delete dataToSend.password;
        delete dataToSend.password_confirmation;
      }

      let result;
      if (activeItems.user) {
        result = await api.update('users', activeItems.user.id, dataToSend);
      } else {
        result = await api.create('users', dataToSend);
      }

      if (result) {
        await loadUsers();
        setActiveUser(null);
        setError(null);
      }
    } catch (err) {
      console.error('Error saving user:', err);
      setError(err.message || 'Error al guardar el usuario');
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      try {
        await api.delete('users', userId);
        await loadUsers();
        if (activeItems.user && activeItems.user.id === userId) {
          setActiveUser(null);
        }
      } catch (err) {
        console.error('Error deleting user:', err);
        setError('Error al eliminar el usuario');
      }
    }
  };

  const renderUserList = () => (
    <table>
      <tbody>
        {users.map(user => (
          <tr 
            key={user.id}
            className={activeItems.user?.id === user.id ? 'selected' : ''}
            onClick={() => handleSelect(user)}
          >
            <td>
              <span>Name:</span>
              {user.name}
            </td>
            <td>
              <span>Email:</span>
              {user.email}
            </td>
            <td>
              <span>Role:</span>
              {user.role}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  if (loading) {
    return <div className="users-page loading">Cargando usuarios...</div>;
  }

  return (
    <div className="users-page">
      <div className="users-container">
        <Card
          header={
            <div className="list-header">
              <h2>Users List</h2>
            </div>
          }
          body={
            <>
              {error && <div className="error-message">{error}</div>}
              {renderUserList()}
            </>
          }
          footer={
            <div>
              <button 
                onClick={() => {
                  setError(null);
                  setActiveUser(null);
                }} 
                className="btn-primary"
              >
                Add User
              </button>
              {activeItems.user && (
                <button 
                  className="btn-danger"
                  onClick={() => handleDelete(activeItems.user.id)}
                >
                  Delete User
                </button>
              )}
            </div>
          }
        />
        <UserForm 
          activeUser={activeItems.user}
          onSave={handleSave} 
          onClean={() => setActiveUser(null)}
          error={error}
        />
      </div>
    </div>
  );
};

export default Users;
