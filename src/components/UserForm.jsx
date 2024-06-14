import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ({ user, onSave }) => {
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
        await axios.put(`https://reservations.rubenalvarez.dev/public/index.php/api/users/${user.id}`, {
          name,
          email,
          password
        });
      } else {
        await axios.post('https://reservations.rubenalvarez.dev/public/index.php/api/users', {
          name,
          email,
          password
        });
      }
      onSave();
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
    }
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