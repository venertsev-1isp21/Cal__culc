import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { fetchMealsApi, addMealApi, deleteMealApi } from '../../api/mealsApi';

export const useMeals = (date, token) => {
  const queryClient = useQueryClient();

  // Получение списка еды
  const { data: rows = [], isLoading: loading } = useQuery({
    queryKey: ['meals', date],
    queryFn: () => fetchMealsApi(token, date),
    enabled: !!token,
  });

  // Добавление еды
  const addMealMutation = useMutation({
    mutationFn: ({ food, amount }) => addMealApi(token, food.id, amount),
    onSuccess: (_, variables) => {
      queryClient.setQueryData(['meals', date], (old = []) => [
        ...old,
        {
          id: Date.now(), // временный ID, сервер можно вернуть реальный
          food_name: variables.food.name,
          amount: variables.amount,
          calories: variables.food.calories,
          proteins: variables.food.proteins,
          fats: variables.food.fats,
          carbohydrates: variables.food.carbohydrates,
          photo: variables.food.photo,
        },
      ]);
    },
  });

  // Удаление еды
  const deleteMealMutation = useMutation({
    mutationFn: (mealId) => deleteMealApi(token, mealId),
    onSuccess: (_, mealId) => {
      queryClient.setQueryData(['meals', date], (old = []) =>
        old.filter((row) => row.id !== mealId)
      );
    },
  });

  const handleAddMeal = (food, amount) => {
    if (!food?.id || !amount) return;
    addMealMutation.mutate({ food, amount });
  };

  const handleDeleteMeal = (mealId) => {
    deleteMealMutation.mutate(mealId);
  };

  return { rows, loading, handleAddMeal, handleDeleteMeal };
};
