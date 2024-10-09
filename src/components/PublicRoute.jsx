import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  if (isAuthenticated) {
    // Redirect authenticated users away from login/register pages
    return <Navigate to="/shopping-lists" />;
  }

  return children;
};

export default PublicRoute;
