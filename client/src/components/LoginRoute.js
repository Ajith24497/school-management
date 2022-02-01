import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { checkToken } from "../api/token_api";
import useAuth from "../hooks/useAuth";
import Loading from "../pages/Loading";
import tryCatch from "./TryCatch";

export default function LoginRoute() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const { token, setToken } = useAuth();
  const navigate = useNavigate();

  const checkLogin = async () => {
    if (token) {
      const [tokenData, tokenError] = await tryCatch(checkToken(token));
      if (!tokenError) {
        if (tokenData.data.message === "Token Expired") {
          localStorage.removeItem("token");
          setToken(null);
          navigate("/login");
        } else {
          setIsAuth(true);
        }
      } else {
        console.log(tokenError.response);
      }
    }
    setIsLoaded(true);
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <>
      {!isLoaded ? <Loading /> : !isAuth ? <Outlet /> : <Navigate to="/home" />}
    </>
  );
}
