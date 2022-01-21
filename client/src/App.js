import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { AuthContext } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  const { state } = useContext(AuthContext);
  const { isAuth } = state;
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="*"
          element={<Navigate to={isAuth ? "/home" : "/login"} />}
        />
      </Routes>
    </>
  );
}

export default App;
