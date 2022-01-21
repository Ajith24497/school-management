import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function HomeRoute() {
  const { state } = useContext(AuthContext);
  const { isAuth } = state;

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}