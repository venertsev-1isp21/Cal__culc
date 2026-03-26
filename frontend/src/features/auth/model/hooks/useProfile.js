import { useQuery } from '@tanstack/react-query';

import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { logout } from '../../../../app/store/slices/authSlice';
import { fetchUserInfoApi } from '../../api/profileApi';

export const useProfile = () => {
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/login';
  };

  const query = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => fetchUserInfoApi(token),
    enabled: !!token,
    retry: 1,

    onError: (err) => {
      if (err.response?.status === 401) {
        handleLogout();
      }
    },
  });

  return {
    ...query,
    handleLogout,
  };
};
