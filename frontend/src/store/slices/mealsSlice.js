import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
};

const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const { setLoading, setError, clearError } = mealsSlice.actions;
export default mealsSlice.reducer;