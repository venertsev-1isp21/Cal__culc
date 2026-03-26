import { createSelector } from '@reduxjs/toolkit';

export const selectMeals = state => state.meals.list;
export const selectSearchQuery = state => state.ui.searchQuery;

export const selectFilteredMeals = createSelector(
  [selectMeals, selectSearchQuery],
  (meals, query) => {
    return meals.filter(meal => meal.name.toLowerCase().includes(query.toLowerCase()));
  }
);