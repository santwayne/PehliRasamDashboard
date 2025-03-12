import axios from 'axios';
import { authState } from '../state/auth';
import { setRecoil } from 'recoil-nexus';

const baseURL = import.meta.env.VITE_APP_BASE_URL;

const apiClient = axios.create({
  baseURL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      setRecoil(authState, {
        accessToken: '',
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        id: '',
        permissions: {},
      });

      localStorage.removeItem('token');
      window.location.href = '/admin/adminLogin';
    }

    return Promise.reject(error);
  }
);

export default apiClient;
