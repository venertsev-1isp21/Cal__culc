import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/login/', data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
