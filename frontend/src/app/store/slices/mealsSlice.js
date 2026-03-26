import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://127.0.0.1:8000/api';

export const fetchMeals = createAsyncThunk(
  'meals/fetchMeals',
  async ({ date, token }) => {
    const res = await axios.get(`${API}/meals/?date=${date}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { date, meals: res.data };
  }
);

export const addMeal = createAsyncThunk(
  'meals/addMeal',
  async ({ date, food, amount, token }) => {
    const res = await axios.post(
      `${API}/meals/`,
      { food, amount, date },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return { date, meal: res.data };
  }
);

export const removeMeal = createAsyncThunk(
  'meals/removeMeal',
  async ({ date, id, token }) => {
    await axios.delete(`${API}/meals/${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { date, id };
  }
);

const mealsSlice = createSlice({
  name: 'meals',
  initialState: {
    mealsByDate: {},
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchMeals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMeals.fulfilled, (state, action) => {
        state.loading = false;
        state.mealsByDate[action.payload.date] = action.payload.meals;
      })
      .addCase(fetchMeals.rejected, (state) => {
        state.loading = false;
      })

      // ADD
      .addCase(addMeal.fulfilled, (state, action) => {
        const date = action.payload.date;
        if (!state.mealsByDate[date]) state.mealsByDate[date] = [];
        state.mealsByDate[date].push(action.payload.meal);
      })

      // REMOVE
      .addCase(removeMeal.fulfilled, (state, action) => {
        const date = action.payload.date;
        if (state.mealsByDate[date]) {
          state.mealsByDate[date] = state.mealsByDate[date].filter(
            (m) => m.id !== action.payload.id
          );
        }
      });
  },
});

export default mealsSlice.reducer;
