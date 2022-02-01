import { useEffect, useState } from "react";
import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import { checkToken } from "../api/token_api";
import useAuth from "../hooks/useAuth";
import tryCatch from "./TryCatch";

const AuthenticatedRoutes = ({ userRole }) => {
  const [role, setRole] = useState(0);
  const [isAuth, setIsAuth] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { token, setToken } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  async function getRole() {
    const [tokenData, tokenError] = await tryCatch(checkToken(token));
    if (!tokenError) {
      if (tokenData.data.message === "Token Expired") {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/login");
      } else {
        const { userTypeId } = tokenData.data;
        setRole(Number(userTypeId));
        setIsAuth(true);
        setIsMounted(true);
      }
    } else {
      console.log(tokenError.response);
    }
  }

  useEffect(() => {
    getRole();
  }, []);

  return !isMounted ? null : userRole === role ? (
    <Outlet />
  ) : isAuth ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default AuthenticatedRoutes;
