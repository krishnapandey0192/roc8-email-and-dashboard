import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (email, password) =>
  api.post('/auth/login', { email, password });

export const register = (email, password) =>
  api.post('/auth/register', { email, password });

export const getFeatureData = (filters) =>
  api.get('/analytics/features', { params: filters });

export const getTimelineData = (feature, filters) =>
  api.get(`/analytics/timeline/${feature}`, { params: filters });

export default api;