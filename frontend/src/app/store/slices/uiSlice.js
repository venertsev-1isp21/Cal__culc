import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchQuery: "",
  selectedDate: new Date().toISOString(),
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    resetUI: (state) => {
      state.searchQuery = "";
    }
  }
});

export const { setSearchQuery, setDate, resetUI } = uiSlice.actions;
export default uiSlice.reducer;