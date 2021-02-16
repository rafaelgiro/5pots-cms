import axios from "axios";

export const baseURL = process.env.API_URI || process.env.NEXT_PUBLIC_API_URI;

const api = axios.create({ baseURL });

export default api;
