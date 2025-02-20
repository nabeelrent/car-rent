import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from '../../publicpages/Login';


function PublicRoutes() {
  // Fetch the authentication state from Redux
  const authState = useSelector((state) => state.Auth);

  // Check if a token exists
  const isAuthenticated = authState?.accessToken != null;

  // Redirect to a private route (e.g., dashboard) if the user is already authenticated
  if (isAuthenticated) {
    return <Navigate to="/cars/car-list/" replace />;
  }

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Login />} />
     

        
        
      </Routes>
    </div>
  );
}

export default PublicRoutes;
