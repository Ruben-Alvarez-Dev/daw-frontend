import axios from 'axios';

/* const API_BASE_URL = 'https://reservations.rubenalvarez.dev/public/index.php/api'; */
const API_BASE_URL = 'http://localhost:8000/api';

// Funciones para usuarios
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    throw error;
  }
};

export const getUser = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    throw error;
  }
};

export const postUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, userData);
    return response.data;
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    throw error;
  }
};

export const putUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    await axios.delete(`${API_BASE_URL}/users/${userId}`);
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    throw error;
  }
};

// Funciones para mesas
export const getTables = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tables`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las mesas:', error);
    throw error;
  }
};

export const getTable = async (tableId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tables/${tableId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener la mesa:', error);
    throw error;
  }
};

export const postTable = async (tableData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/tables`, tableData);
    return response.data;
  } catch (error) {
    console.error('Error al crear la mesa:', error);
    throw error;
  }
};

export const putTable = async (tableId, tableData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/tables/${tableId}`, tableData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar la mesa:', error);
    throw error;
  }
};

export const deleteTable = async (tableId) => {
  try {
    await axios.delete(`${API_BASE_URL}/tables/${tableId}`);
  } catch (error) {
    console.error('Error al eliminar la mesa:', error);
    throw error;
  }
};

// Funciones para reservas
export const getReservations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reservations`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las reservas:', error);
    throw error;
  }
};

export const postReservation = async (reservationData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/reservations`, reservationData);
    return response.data;
  } catch (error) {
    console.error('Error al crear la reserva:', error);
    throw error;
  }
};

export const putReservation = async (reservationId, reservationData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/reservations/${reservationId}`, reservationData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar la reserva:', error);
    throw error;
  }
};

export const deleteReservation = async (reservationId) => {
  try {
    await axios.delete(`${API_BASE_URL}/reservations/${reservationId}`);
  } catch (error) {
    console.error('Error al eliminar la reserva:', error);
    throw error;
  }
};