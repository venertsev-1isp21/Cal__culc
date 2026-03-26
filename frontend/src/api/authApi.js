import axios from "axios";

const API = "http://127.0.0.1:8000/api";

export const loginRequest = (data) =>
  axios.post(`${API}/login/`, data).then(res => res.data);

export const registerRequest = (data) =>
  axios.post(`${API}/register/`, data).then(res => res.data);

export const refreshTokenRequest = (refresh) =>
  axios.post(`${API}/api/token/refresh/`, { refresh }).then(res => res.data);
