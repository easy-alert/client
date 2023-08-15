import axios from 'axios';

export const Api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://10.109.0.94:8080/api/client',
});
