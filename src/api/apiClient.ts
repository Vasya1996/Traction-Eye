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

// export const devClient = axios.create({
//   baseURL: 'http://185.224.134.85:8470/',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// pnlClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     console.error('Request error:', error);
//     return Promise.reject(error);
//   }
// );


export default apiClient;