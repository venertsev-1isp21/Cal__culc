import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../api/user";

export const useProfile = (token) =>
  useQuery({
    queryKey: ["profile"],
    queryFn: () => getUserInfo(token),
    enabled: !!token
  });
