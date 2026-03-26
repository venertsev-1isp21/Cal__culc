import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { registerApi } from '../api/authApi';

export const useRegister = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: registerApi,

    onSuccess: () => {
      window.showErrorPopup('Успешная регистрация!');
      navigate('/login');
    },

    onError: () => {
      window.showErrorPopup('Ошибка регистрации!');
    },
  });

  const handleRegister = (formData) => {
    mutation.mutate(formData);
  };

  return {
    handleRegister,
    isLoading: mutation.isPending,
  };
};
