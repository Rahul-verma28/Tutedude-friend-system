import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = Cookies.get("jwt"); // Check for token in cookies

  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
