import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { checkToken } from "../api/token_api";
import useAuth from "../hooks/useAuth";
import Loading from "../pages/Loading";
import tryCatch from "./TryCatch";

export default function HomeRoute() {
  const { token, setToken } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);
  const [userType, setUserType] = useState(0);
  const navigate = useNavigate();

  const checkLogin = async () => {
    const [tokenData, tokenError] = await tryCatch(checkToken(token));
    if (!tokenError) {
      if (tokenData.data.message === "Token Expired") {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/login");
      } else {
        const { userTypeId } = tokenData.data;
        setUserType(userTypeId);
      }
    }
    setIsLoaded(true);
  };

  const userTypes = {
    0: null,
    1: "staff",
    2: "student",
    3: "admin",
    4: "superadmin",
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <>
      {!isLoaded ? (
        <Loading />
      ) : (
        <Navigate to={`/home/${userTypes[userType]}`} />
      )}
    </>
  );
}
