import './css/UserForm.css';
import React, { useState, useEffect } from 'react';
import { postUser, putUser, getUser } from '../helpers/api';

const UserForm = ({ user, onSave, fetchUsers, fetchUserList }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [isEditing, setIsEditing] = useState(false);
  const [originalUser, setOriginalUser] = useState(null);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    if (user) {
      setIsEditing(true);
      setOriginalUser(user);
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
      setPassword('');
    } else {
      setName('');
      setEmail('');
      setPassword('');
      setRole('customer');
      setIsEditing(false);
      setOriginalUser(null);
      setPasswordError(false);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        name,
        email,
        role,
        ...(password && { password })
      };

      if (isEditing) {
        await putUser(originalUser.email, userData);
      } else {
        if (!password) {
          setPasswordError(true);
          return;
        }
        await postUser(userData);
      }

      // Limpiar el formulario
      setName('');
      setEmail('');
      setPassword('');
      setRole('customer');
      setIsEditing(false);
      setOriginalUser(null);
      setPasswordError(false);

      // Actualizar la lista de usuarios
      if (fetchUserList) {
        fetchUserList();
      }
      if (fetchUsers) {
        fetchUsers();
      }
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <div className="form-group">
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isEditing} // No permitir cambiar el email en modo edición
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">
          Contraseña{isEditing ? ' (dejar en blanco para mantener la actual)' : ''}:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError(false);
          }}
          required={!isEditing}
        />
        {passwordError && (
          <span className="error">La contraseña es obligatoria para nuevos usuarios</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="role">Rol:</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="customer">Cliente</option>
          <option value="supervisor">Supervisor</option>
          <option value="admin">Administrador</option>
        </select>
      </div>

      <button type="submit">
        {isEditing ? 'Actualizar Usuario' : 'Crear Usuario'}
      </button>
    </form>
  );
};

export default UserForm;