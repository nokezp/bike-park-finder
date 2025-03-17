import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token in requests
api.interceptors.request.use(
  async (config) => {
  const token = await AsyncStorage.getItem('token');
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
  register: (userData: { username: string; email: string; password: string }) => 
    api.post('/auth/register', userData),
  
  login: (credentials: { email: string; password: string }) => 
    api.post('/auth/login', credentials),
  
  getProfile: () => api.get('/auth/profile'),
  
  updateProfile: (profileData: any) => api.put('/auth/profile', profileData),
};

// Bike Parks API
export const bikeParksAPI = {
  getAll: (params?: any) => api.get('/bikeparks', { params }),
  
  getById: (id: string) => api.get(`/bikeparks/${id}`),
  
  create: (bikeParkData: any) => api.post('/bikeparks', bikeParkData),
  
  update: (id: string, bikeParkData: any) => api.put(`/bikeparks/${id}`, bikeParkData),
  
  delete: (id: string) => api.delete(`/bikeparks/${id}`),
};

// Trails API
export const trailsAPI = {
  getByBikePark: (bikeParkId: string) => api.get(`/bikeparks/${bikeParkId}/trails`),
  
  getById: (id: string) => api.get(`/trails/${id}`),
  
  create: (bikeParkId: string, trailData: any) => 
    api.post(`/bikeparks/${bikeParkId}/trails`, trailData),
  
  update: (id: string, trailData: any) => api.put(`/trails/${id}`, trailData),
  
  delete: (id: string) => api.delete(`/trails/${id}`),
};

// Reviews API
export const reviewsAPI = {
  getByBikePark: (bikeParkId: string) => api.get(`/bikeparks/${bikeParkId}/reviews`),
  
  create: (bikeParkId: string, reviewData: any) => 
    api.post(`/bikeparks/${bikeParkId}/reviews`, reviewData),
  
  update: (reviewId: string, reviewData: any) => 
    api.put(`/reviews/${reviewId}`, reviewData),
  
  delete: (reviewId: string) => api.delete(`/reviews/${reviewId}`),
};

// Check-ins API
export const checkInsAPI = {
  getByBikePark: (bikeParkId: string) => api.get(`/bikeparks/${bikeParkId}/checkins`),
  
  getUserCheckIns: () => api.get('/checkins/user'),
  
  create: (bikeParkId: string, checkInData: any) => 
    api.post(`/bikeparks/${bikeParkId}/checkins`, checkInData),
  
  delete: (checkInId: string) => api.delete(`/checkins/${checkInId}`),
};

// Media API
export const mediaAPI = {
  getByBikePark: (bikeParkId: string, params?: any) => 
    api.get(`/bikeparks/${bikeParkId}/media`, { params }),
  
  upload: (bikeParkId: string, formData: FormData) => 
    api.post(`/bikeparks/${bikeParkId}/media`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  
  delete: (mediaId: string) => api.delete(`/media/${mediaId}`),
};

// Events API
export const eventsAPI = {
  getByBikePark: (bikeParkId: string, params?: any) => 
    api.get(`/bikeparks/${bikeParkId}/events`, { params }),
  
  getById: (id: string) => api.get(`/events/${id}`),
  
  create: (bikeParkId: string, eventData: any) => 
    api.post(`/bikeparks/${bikeParkId}/events`, eventData),
  
  update: (id: string, eventData: any) => api.put(`/events/${id}`, eventData),
  
  delete: (id: string) => api.delete(`/events/${id}`),
};

export default api; 