import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = () => {
  const { loading, isAuthenticated} = useSelector((state) => state.user);

  if (loading) return null;

  return isAuthenticated
    ? <Outlet />
    : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
