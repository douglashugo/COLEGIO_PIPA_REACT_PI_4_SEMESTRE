import React from 'react';
import { useAuth } from "../contexts/AuthContext";
import { Navigate, Route } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateRoute; 