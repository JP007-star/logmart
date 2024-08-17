// src/components/PrivateRoute.js
import React from 'react';
import {  Navigate } from 'react-router-dom';

// PrivateRoute component to protect routes based on user roles and authentication
const PrivateRoute = ({ element: Component, roles, ...rest }) => {
  // Get session data from sessionStorage
  const sessionData = JSON.parse(sessionStorage.getItem('user'));
  const user = sessionData ? sessionData : null;

  // If no user data is present and the route requires authentication, redirect to login page
  if (!user && roles) {
    return <Navigate to="/admin" />;
  }

  // If the user's role is not allowed, redirect to home or a specific page
  if (user && roles && !roles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
