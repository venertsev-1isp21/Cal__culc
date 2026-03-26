import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { loginThunk } from '../../../../app/store/thunks/authThunks';
import { clearError } from '../../../../app/store/slices/authSlice';

export const useLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  // LOGIN
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginThunk({ username, password }));
  };

  // REDIRECT
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/main');
    }
  }, [isAuthenticated, navigate]);

  // ERROR
  useEffect(() => {
    if (error) {
      window.showErrorPopup(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  return {
    username,
    setUsername,
    password,
    setPassword,
    loading,
    handleLogin,
  };
};
