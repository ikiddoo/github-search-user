import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

// we want to access children (special prop) because the dashboard will be the child of the private route.
const PrivateRoute = ({ children }) => {
  // create isUser
  // const isUser = false; // set to false to prevent access dashboard

  // check if user is authenticated using Auth0
  const { isAuthenticated, user } = useAuth0();
  const isUser = isAuthenticated && user;

  if (!isUser) {
    return <Navigate to='/login' />
  }
  return children;
};
export default PrivateRoute;
