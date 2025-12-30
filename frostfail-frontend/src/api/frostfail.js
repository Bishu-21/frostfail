import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export const createMock = (data) =>
  axios.post(`${API_BASE}/mock/create`, data);

export const fetchLogs = () =>
  axios.get(`${API_BASE}/logs`);
