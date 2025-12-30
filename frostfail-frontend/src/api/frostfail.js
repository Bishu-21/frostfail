import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:5000";

export const createMock = (payload) =>
  axios.post(`${API_BASE}/mock/create`, payload);

export const fetchLogs = () =>
  axios.get(`${API_BASE}/logs`);
