import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = "http://127.0.0.1:8000/api";

export const loginThunk = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API}/login/`, {
        username,
        password,
      });

      if (!res.data.success) {
        return rejectWithValue("Неверный логин или пароль");
      }

      return res.data;
    } catch (err) {
      return rejectWithValue("Ошибка соединения с сервером");
    }
  }
);