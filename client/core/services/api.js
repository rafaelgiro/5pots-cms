import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_URI || process.env.NEXT_PUBLIC_API_URI,
});

export default api;
