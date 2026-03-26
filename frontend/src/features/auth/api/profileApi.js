import axios from 'axios';

const API = 'http://127.0.0.1:8000/api';

export const fetchUserInfoApi = async (token) => {
  const res = await axios.get(`${API}/user_info/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
