import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const getReservations = async () => {
  const response = await api.get('/reservations');
  return response.data;
};

export const createReservation = async (data) => {
  const response = await api.post('/reservations', data);
  return response.data;
};

export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const createUser = async (data) => {
  const response = await api.post('/users', data);
  return response.data;
};