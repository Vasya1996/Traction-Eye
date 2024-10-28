import { LocalStorageKeys } from '@/constants/localStorage';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://tractionyey2.tw1.ru',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

export const newApiClient = axios.create({
  baseURL: 'https://tractioneye.ru/',
  headers: {
    'Content-Type': 'application/json',
  },
});

newApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

export const tonCenterApi = axios.create({
  baseURL: 'https://toncenter.com/api/v3/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const userServiceClient = axios.create({
  baseURL: 'https://tractioneye.ru/referral/',
  headers: {
    'Content-Type': 'application/json',
  },
});

userServiceClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LocalStorageKeys.userServiceToken);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

export const settleTonClient = axios.create({
  baseURL: 'https://tractioneye.ru/settleton_api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;