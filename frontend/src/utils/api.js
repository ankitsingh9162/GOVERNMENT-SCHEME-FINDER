import axios from 'axios';

// HARDCODED BACKEND URL
const API_URL = 'https://govt-scheme-finder-backend.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// JWT token interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  googleAuth: () => {
    window.location.href = `${API_URL}/auth/google`;
  },
};

// Scheme API
export const schemeAPI = {
  getAllSchemes: (params) => api.get('/schemes', { params }),
  getSchemeById: (id) => api.get(`/schemes/${id}`),
  getEligibleSchemes: () => api.get('/schemes/user/eligible'),
  compareSchemes: (schemeId1, schemeId2) => 
    api.post('/schemes/compare', { schemeId1, schemeId2 }),
};

// User API
export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data) => api.put('/user/profile', data),
  saveScheme: (schemeId) => api.post(`/user/save-scheme/${schemeId}`),
  unsaveScheme: (schemeId) => api.delete(`/user/save-scheme/${schemeId}`),
};

export default api;