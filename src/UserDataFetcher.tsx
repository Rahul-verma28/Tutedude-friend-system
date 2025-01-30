import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppStore } from "./store";
import { apiClient } from "./utils/api-client";
import { GET_USER_INFO } from "./utils/constants";
import { User } from "./types";
import { toast } from "sonner";

interface UserDataFetcherProps {
  children: React.ReactNode;
}

const UserDataFetcher: React.FC<UserDataFetcherProps> = ({ children }) => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await apiClient.get<User>(GET_USER_INFO, {
          withCredentials: true,
        });
        if (response.status === 200 && response.data._id) {
          setUserInfo(response.data);
        } else {
          setUserInfo(undefined);
          toast.error("User is not authenticated");
          navigate("/login");
        }
    } catch (error) {
        console.log({ error });
        setError(true);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    if (!userInfo) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, [userInfo, setUserInfo, navigate]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center font-bold text-white">
        Loading....
      </div>
    );
  }

  if (error) {
    setError(false);
    return <Navigate to="/not-found" />;
  }

  return <>{children}</>;
};

export default UserDataFetcher;