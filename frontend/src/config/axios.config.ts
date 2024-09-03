import axios from "axios";
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:8000/api",
});
