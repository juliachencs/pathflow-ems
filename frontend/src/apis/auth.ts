import api from './base';

const API_URL = '/auth'; // Adjust this to your backend URL

export const login = async ({ username, password }: { username: string; password: string }) => {
  const response = await api.post(`${API_URL}/login`, { username, password });
  return response.data;
};

export const signup = async ({ username, email, password, registerToken }: { username: string; email: string; password: string, registerToken: string }) => {
  const response = await api.post(`${API_URL}/register`, { username, email, password, registerToken });
  return response.data;
};