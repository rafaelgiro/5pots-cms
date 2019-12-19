import axios from 'axios';

const api = axios.create({
  baseURL: 'http://nginx/api'
});

export default api;
