// Importar datos simulados
import users from '../../data/users.json';
import tables from '../../data/tables.json';
import reservations from '../../data/reservations.json';

// Users
export const getUsers = async () => {
  // Asegurarnos de que cada usuario tenga un identificador único (email)
  return users.map(user => ({
    ...user,
    id: user.email // Usar el email como ID
  }));
};

export const getUser = async (id) => {
  // Buscar por email (que estamos usando como ID)
  return users.find(user => user.email === id);
};

export const postUser = async (userData) => {
  const newUser = {
    ...userData,
    id: userData.email // Usar el email como ID
  };
  users.push(newUser);
  await saveToJson('users', users);
  return newUser;
};

export const putUser = async (id, userData) => {
  const index = users.findIndex(user => user.email === id);
  if (index !== -1) {
    users[index] = { 
      ...users[index], 
      ...userData,
      email: id // Mantener el email original como ID
    };
    await saveToJson('users', users);
    return users[index];
  }
  throw new Error('Usuario no encontrado');
};

export const deleteUser = async (id) => {
  const index = users.findIndex(user => user.email === id);
  if (index !== -1) {
    users.splice(index, 1);
    await saveToJson('users', users);
    return true;
  }
  return false;
};

// Tables
export const getTables = async () => {
  return tables;
};

export const getTable = async (id) => {
  return tables.find(table => table.id === id);
};

export const postTable = async (tableData) => {
  const newTable = {
    ...tableData,
    id: Date.now().toString()
  };
  tables.push(newTable);
  await saveToJson('tables', tables);
  return newTable;
};

export const putTable = async (id, tableData) => {
  const index = tables.findIndex(table => table.id === id);
  if (index !== -1) {
    tables[index] = { ...tables[index], ...tableData };
    await saveToJson('tables', tables);
    return tables[index];
  }
  throw new Error('Mesa no encontrada');
};

export const deleteTable = async (id) => {
  const index = tables.findIndex(table => table.id === id);
  if (index !== -1) {
    tables.splice(index, 1);
    await saveToJson('tables', tables);
    return true;
  }
  return false;
};

// Reservations
export const getReservations = async () => {
  return reservations;
};

export const getReservation = async (id) => {
  return reservations.find(reservation => reservation.id === id);
};

export const postReservation = async (reservationData) => {
  const newReservation = {
    ...reservationData,
    id: Date.now().toString()
  };
  reservations.push(newReservation);
  await saveToJson('reservations', reservations);
  return newReservation;
};

export const putReservation = async (id, reservationData) => {
  const index = reservations.findIndex(reservation => reservation.id === id);
  if (index !== -1) {
    reservations[index] = { ...reservations[index], ...reservationData };
    await saveToJson('reservations', reservations);
    return reservations[index];
  }
  throw new Error('Reserva no encontrada');
};

export const deleteReservation = async (id) => {
  const index = reservations.findIndex(reservation => reservation.id === id);
  if (index !== -1) {
    reservations.splice(index, 1);
    await saveToJson('reservations', reservations);
    return true;
  }
  return false;
};

// Función auxiliar para guardar en JSON
const saveToJson = async (fileName, data) => {
  try {
    const response = await fetch(`/api/save/${fileName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Error al guardar los datos');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error saving to JSON:', error);
    throw error;
  }
};