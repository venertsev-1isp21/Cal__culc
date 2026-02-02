import { useQuery } from "@tanstack/react-query";
import { getMeals } from "../api/meals";

export const useMeals = (date, token) =>
  useQuery({
    queryKey: ["meals", date],
    queryFn: () => getMeals(date, token),
    enabled: !!token
  });
