import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { fetchMeals, addMeal, removeMeal } from "../../../app/store/slices/mealsSlice";

export const useMeals = (formattedDate, token) => {
  const dispatch = useAppDispatch();
  const { mealsByDate, loading } = useAppSelector(state => state.meals);

  const rows = mealsByDate[formattedDate] || [];

  useEffect(() => {
    if (token) {
      dispatch(fetchMeals({ date: formattedDate, token }));
    }
  }, [formattedDate, token, dispatch]);

  const handleAddMeal = (foodId, amount) => {
    if (!foodId || !amount) return;

    dispatch(addMeal({
      food: foodId,
      amount: parseInt(amount),
      date: formattedDate,
      token
    }));
  };

  const handleDeleteMeal = (id) => {
    dispatch(removeMeal({ id, date: formattedDate, token }));
  };

  return {
    rows,
    loading,
    handleAddMeal,
    handleDeleteMeal
  };
};