import { createSelector } from '@reduxjs/toolkit';

// =============================
// BASE SELECTORS
// =============================
export const selectAuth = (state) => state.auth;
export const selectUI = (state) => state.ui;
export const selectMeals = (state) => state.meals;

// =============================
// MEMO SELECTORS (для лабы)
// =============================

// 1️⃣ Авторизован ли пользователь
export const selectIsAuthenticated = createSelector(
  selectAuth,
  (auth) => auth.isAuthenticated
);

// 2️⃣ Loading состояние (пример вычисления)
export const selectIsLoading = createSelector(
  selectMeals,
  (meals) => meals.loading
);