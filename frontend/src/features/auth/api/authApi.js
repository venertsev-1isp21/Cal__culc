import axios from 'axios';

const API = 'http://127.0.0.1:8000/api';

export const loginApi = async ({ username, password }) => {
  try {
    const res = await axios.post(`${API}/auth/login/`, { username, password });
    return res.data; // ожидаем токены и данные пользователя
  } catch (err) {
    throw err.response?.data?.detail || 'Login failed';
  }
};
export const registerApi = async (data) => {
  const res = await axios.post(`${API}/register/`, data);
  return res.data;
};
