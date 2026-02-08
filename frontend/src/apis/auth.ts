import api from './base';

const API_URL = '/auth'; // Adjust this to your backend URL

export const login = async ({ name, password }: { name: string; password: string }) => {
  const response = await api.post(`${API_URL}/login`, { name, password });
  return response.data;
};

export const signup = async ({ name, email, password, token }: { name: string; email: string; password: string, token: string }) => {
  const response = await api.post(`${API_URL}/register`, { name, email, password, token });
  return response.data;
};