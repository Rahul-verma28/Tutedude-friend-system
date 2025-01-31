import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { GET_USER_INFO } from "./constants";
import { apiClient } from "./api-client";

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await apiClient.get(GET_USER_INFO, {
          withCredentials: true,
        });
        setAuthenticated(true);
      } catch (error) {
        setAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (authenticated === null) return <div>Loading...</div>; // Show loader

  return authenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
