import React, { useState, useEffect } from 'react';
import { postUser, putUser } from '../helpers/api';

const UserForm = ({ user, onSave, fetchUsers }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPassword('');
    } else {
      setName('');
      setEmail('');
      setPassword('');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        await putUser(user.id, { name, email, password });
      } else {
        await postUser({ name, email, password });
      }
      onSave();
      fetchUsers();
      resetForm();
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">{user ? 'Guardar' : 'Crear'}</button>
    </form>
  );
};

export default UserForm;