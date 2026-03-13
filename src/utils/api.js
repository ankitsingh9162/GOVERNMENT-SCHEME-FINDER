import axios from 'axios';

// const API_URL = 'http://localhost:5000/api';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  googleLogin: (googleData) => api.post('/auth/google-login', googleData),
};

export const schemeAPI = {
  getAllSchemes: () => api.get('/schemes'),
  getSchemeById: (id) => api.get(`/schemes/${id}`), // Add this
  getEligibleSchemes: () => api.get('/schemes/user/eligible'),
};

export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data) => api.put('/user/profile', data),
  saveScheme: (schemeId) => api.post(`/user/save-scheme/${schemeId}`),
  unsaveScheme: (schemeId) => api.delete(`/user/save-scheme/${schemeId}`),
  getSavedSchemes: () => api.get('/user/saved-schemes'),
};

export default api;