import axios from 'axios';

const API_BASE_URL = '/api'; // This will use the proxy set up in vite.config.ts

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    // If token exists, add it to the headers
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
  },
  // This line used for provide a rejected promise with error for Redux to handle
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
