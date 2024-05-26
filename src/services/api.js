import axios from 'axios';

const baseURL = 'http://localhost:8000/api';

export const getReservations = async () => {
  const response = await axios.get(baseURL + '/reservations');
  return response.data;
};

export const createReservation = async (data) => {
  const response = await axios.post(baseURL + '/reservations', data);
  return response.data;
};

export const getUsers = async () => {
  const response = await axios.get(baseURL + '/users');
  return response.data;
};

export const getTables = async () => {
  const response = await axios.get(baseURL + '/tables');
  return response.data;
};

export const createUser = async (data) => {
  const response = await axios.post(baseURL + '/users', data);
  return response.data;
};
