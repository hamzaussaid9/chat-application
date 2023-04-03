import axios from 'axios';

export const authInstance = axios.create({
    baseURL: 'http://localhost:1500',
    headers: {
        'Content-Type': 'application/json'
    }
})

export const actionInstance = axios.create({
    baseURL: 'http://localhost:1500',
    headers: {
        'Content-Type': 'application/json'
    }
})

actionInstance.interceptors.request.use(
    config => {
      config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
