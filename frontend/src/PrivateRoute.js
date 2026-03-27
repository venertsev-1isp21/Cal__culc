import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from './app/store/hooks';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;