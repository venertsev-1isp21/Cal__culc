import axios from "axios";

const API = "http://127.0.0.1:8000/api";

export const getUserInfo = (token) =>
  axios.get(`${API}/user_info/`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => res.data);
