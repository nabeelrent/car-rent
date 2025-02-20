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
    return <Navigate to="/boat/boatlist" replace />;
  }

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Login />} />
        {/* <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/forgotpassword" element={<ForgotPassword />} />
        <Route exact path="/test" element={<Test />} /> */}

        
        
      </Routes>
    </div>
  );
}

export default PublicRoutes;
