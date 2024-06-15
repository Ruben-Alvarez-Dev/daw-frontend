import './css/UserForm.css';
import React, { useState, useEffect } from 'react';
import { postUser, putUser, getUser } from '../helpers/api';

const UserForm = ({ user, onSave, fetchUsers, fetchUserList }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [originalUser, setOriginalUser] = useState(null);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    if (user) {
      setIsEditing(true);
      fetchOriginalUser(user.id);
    } else {
      setName('');
      setEmail('');
      setPassword('');
      setIsEditing(false);
      setOriginalUser(null);
      setPasswordError(false);
    }
  }, [user]);

  const fetchOriginalUser = async (userId) => {
    try {
      const data = await getUser(userId);
      setOriginalUser(data);
      setName(data.name);
      setEmail(data.email);
      setPassword('');
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        name: name !== originalUser?.name ? name : undefined,
        email: email !== originalUser?.email ? email : undefined,
        password: user ? (password ? password : undefined) : password,
      };
      if (user) {
        await putUser(user.id, updatedUser);
      } else {
        if (!password) {
          setPasswordError(true);
          return;
        }
        await postUser({ name, email, password });
      }
      onSave();
      fetchUsers();
      fetchUserList();
      resetForm();
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setIsEditing(false);
    setOriginalUser(null);
    setPasswordError(false);
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={passwordError ? 'error' : ''}
      />
      {passwordError && <p className="error-message">La contraseña es obligatoria al crear un nuevo usuario.</p>}
      <div className='button-bar'>
        <button type="submit">{user ? 'Guardar' : 'Crear'}</button>
        {isEditing && <button type="button" onClick={resetForm}>Clear</button>}
      </div>
      
    </form>
  );
};

export default UserForm;