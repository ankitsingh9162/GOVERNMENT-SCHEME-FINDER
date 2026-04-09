import axios from 'axios';

// Use environment variable if available, otherwise fallback to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const BASE_URL = API_URL.replace('/api', '');

console.log('🔗 API URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  googleAuth: () => {
    // Redirect to backend Google Auth route
    window.location.href = `${API_URL}/auth/google`;
  },
};

export const schemeAPI = {
  getAllSchemes: (params) => api.get('/schemes', { params }),
  getSchemeById: (id) => api.get(`/schemes/${id}`),
  getEligibleSchemes: () => api.get('/schemes/user/eligible'),
  compareSchemes: (schemeId1, schemeId2) => 
    api.post('/schemes/compare', { schemeId1, schemeId2 }),
};

export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data) => api.put('/user/profile', data),
  saveScheme: (schemeId) => api.post(`/user/save-scheme/${schemeId}`),
  unsaveScheme: (schemeId) => api.delete(`/user/save-scheme/${schemeId}`),
};

export default api;