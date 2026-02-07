import api from './base';

const API_URL = '/auth'; // Adjust this to your backend URL

export const login = async ({ email, password }: { email: string; password: string }) => {
  const response = await api.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const signup = async ({ name, email, password }: { name: string; email: string; password: string }) => {
  const response = await api.post(`${API_URL}/register`, { name, email, password, isAdmin: false });
  return response.data;
};