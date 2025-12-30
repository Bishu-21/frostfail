import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

export const createMock = (data) =>
  axios.post(`${API_BASE}/mock/create`, data);

export const fetchLogs = () =>
  axios.get(`${API_BASE}/logs`);
