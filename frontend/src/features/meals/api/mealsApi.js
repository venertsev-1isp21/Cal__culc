import axios from 'axios';

const API = 'http://127.0.0.1:8000/api';

// 🔹 Универсальная функция для безопасного получения данных
const safeGetData = (res) => {
  if (!res || !res.data) return [];
  return res.data;
};

// =============================
// MEALS
// =============================
export const fetchMealsApi = async (token, date) => {
  try {
    const res = await axios.get(`${API}/meals/?date=${date}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return safeGetData(res);
  } catch (err) {
    console.error('fetchMealsApi error:', err);
    return []; // всегда возвращаем массив
  }
};

export const addMealApi = async (token, mealId, amount) => {
  try {
    const res = await axios.post(
      `${API}/meals/`,
      { food: mealId, amount },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return safeGetData(res);
  } catch (err) {
    console.error('addMealApi error:', err);
    return null;
  }
};

export const deleteMealApi = async (token, mealId) => {
  try {
    const res = await axios.delete(`${API}/meals/${mealId}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return safeGetData(res);
  } catch (err) {
    console.error('deleteMealApi error:', err);
    return null;
  }
};

// =============================
// FOODS
// =============================
export const fetchFoodsApi = async (token, query) => {
  if (!query) return [];
  try {
    const res = await axios.get(`${API}/foods/?q=${query}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return safeGetData(res);
  } catch (err) {
    console.error('fetchFoodsApi error:', err);
    return [];
  }
};

// =============================
// USER INFO
// =============================
export const fetchUserInfoApi = async (token) => {
  try {
    const res = await axios.get(`${API}/user_info/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data || {}; // всегда объект
  } catch (err) {
    console.error('fetchUserInfoApi error:', err);
    return {};
  }
};
