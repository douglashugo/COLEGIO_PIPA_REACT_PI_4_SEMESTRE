import axios from 'axios';
import AuthService from './src/components/AuthService';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
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

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      AuthService.logout();
      window.location.href = '/';
    } else {
      return Promise.reject(error);
    }
  }
)

export default axiosInstance;