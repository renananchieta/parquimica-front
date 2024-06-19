import axios from "axios";
const url = import.meta.env.production.VITE_API_URL;

const api = axios.create({
  baseURL: url,
  withXSRFToken: true,
  withCredentials: true,
});

api.defaults.timeout = 50000;

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('Authorization');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default api;
