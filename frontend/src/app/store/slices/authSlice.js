import { createSlice } from '@reduxjs/toolkit';

import { loginThunk } from '../thunks/authThunks';

const initialState = {
  token: localStorage.getItem('access_token') || null,
  isAuthenticated: !!localStorage.getItem('access_token'),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    // 🔓 выход
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;

      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    },

    // ❗ сброс ошибки (важно для чек-листа)
    clearError: (state) => {
      state.error = null;
    },
  },

  // 🔥 async thunk обработка
  extraReducers: (builder) => {
    builder
      // ⏳ loading
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // ✅ успех
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.access;
        state.isAuthenticated = true;

        // сохраняем токены
        localStorage.setItem('access_token', action.payload.access);
        localStorage.setItem('refresh_token', action.payload.refresh);
      })

      // ❌ ошибка
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка авторизации';
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
