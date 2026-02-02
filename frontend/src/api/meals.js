import axios from "axios";

const API = "http://127.0.0.1:8000/api";

export const getMeals = (date, token) =>
  axios.get(`${API}/meals/?date=${date}`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => res.data);

export const addMeal = (data, token) =>
  axios.post(`${API}/meals/`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const deleteMeal = (id, token) =>
  axios.delete(`${API}/meals/${id}/`, {
    headers: { Authorization: `Bearer ${token}` }
  });
