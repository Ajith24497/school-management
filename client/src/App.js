import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { AuthContext } from "./contexts/AuthContext";
import { getCookies } from "./api/cookie_api";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Loading from "./pages/Loading";
import Admin from "./components/Admin";
import SuperAdmin from "./components/SuperAdmin";
import Student from "./components/Student";
import Staff from "./components/Staff";
import { userTypes } from "./components/UserTypes";
import SuperAdminList from "./components/SuperAdminList";
import School from "./components/School";

function App() {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const {
    state: { isAuth, userType },
    updateAuthInfo,
  } = useContext(AuthContext);

  useEffect(() => {
    console.log("App");
    if (!isMounted) {
      getCookies()
        .then((res) => {
          if (res.data.token) {
            const { id, user_type_id, token } = res.data;
            updateAuthInfo(true, token, id, user_type_id, "app");
          }
          setIsLoaded(true);
        })
        .catch((err) => console.log(err));
      setIsMounted(true);
    }
  }, [isMounted, updateAuthInfo, isAuth]);

  return (
    <>
      {!isLoaded ? (
        <Loading />
      ) : (
        <Routes>
          {isAuth ? (
            <Route path="/home" element={<Home />}>
              <Route path="admin" element={<Admin />}></Route>
              <Route path="superadmin" element={<SuperAdmin />}>
                <Route index element={<SuperAdminList />} />
                <Route path="school" element={<School />} />
              </Route>
              <Route path="student" element={<Student />}></Route>
              <Route path="staff" element={<Staff />}></Route>
            </Route>
          ) : (
            <Route path="/login" element={<Login />} />
          )}
          <Route
            path="*"
            element={
              <Navigate
                to={!isAuth ? "/login" : `/home/${userTypes[userType]}`}
              />
            }
          />
          {/* <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} /> */}
        </Routes>
      )}
    </>
  );
}

export default App;
