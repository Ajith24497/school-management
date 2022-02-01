import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

import useAuth from "./hooks/useAuth";

import Layout from "./components/Layout";
import AuthenticatedRoutes from "./components/AuthenticatedRoutes";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Loading from "./pages/Loading";
import Admin from "./components/Admin/Admin";
import SuperAdmin from "./components/Super Admin/SuperAdmin";
import Student from "./components/Student/Student";
import Staff from "./components/Staff/Staff";
import SuperAdminList from "./components/Super Admin/SuperAdminList";
import School from "./components/Super Admin/School/School";
import EditSchool from "./components/Super Admin/School/EditSchool";
import AddSchool from "./components/Super Admin/School/AddSchool";
import PageNotFound from "./pages/PageNotFound";
import NotAuthorized from "./pages/NotAuthorized";
import LoginRoute from "./components/LoginRoute";
import HomeRoute from "./components/HomeRoute";
import AdminComponent from "./components/Super Admin/Admin/AdminComponent";
import EditAdmin from "./components/Super Admin/Admin/EditAdmin";
import AddAdmin from "./components/Super Admin/Admin/AddAdmin";
import SuperAdminProfile from "./components/Super Admin/SuperAdminProfile";

axios.defaults.baseURL = "http://localhost:5000";

function App() {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { setToken } = useAuth();

  useEffect(() => {
    if (!isMounted) {
      const token = localStorage.getItem("token");
      if (token) {
        setToken(token);
      }
      setIsMounted(true);
    }
    setIsLoaded(true);
  }, []);

  return (
    <>
      {!isLoaded ? (
        <Loading />
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            {/*Public Routes */}
            <Route element={<LoginRoute />}>
              <Route index element={<Login />} />
              <Route index path="login" element={<Login />} />
            </Route>
            <Route path="unauthorized" element={<NotAuthorized />} />

            {/*Protected Routes */}
            <Route path="home" element={<Home />}>
              <Route index element={<HomeRoute />} />
              {/*Staff Routes */}
              <Route element={<AuthenticatedRoutes userRole={1} />}>
                <Route path="staff" element={<Staff />}></Route>
              </Route>
              {/*Student Routes */}
              <Route element={<AuthenticatedRoutes userRole={2} />}>
                <Route path="student" element={<Student />}></Route>
              </Route>
              {/*Admin Routes */}
              <Route element={<AuthenticatedRoutes userRole={3} />}>
                <Route path="admin" element={<Admin />}></Route>
              </Route>
              {/*Super Admin Routes */}
              <Route element={<AuthenticatedRoutes userRole={4} />}>
                <Route path="superadmin" element={<SuperAdmin />}>
                  <Route index element={<SuperAdminList />} />
                  <Route path="profile/:uuid" element={<SuperAdminProfile />} />
                  <Route path="school" element={<School />} />
                  <Route path="school/edit/:uuid" element={<EditSchool />} />
                  <Route path="school/add" element={<AddSchool />} />
                  <Route path="admin" element={<AdminComponent />} />
                  <Route path="admin/edit/:uuid" element={<EditAdmin />} />
                  <Route path="admin/add" element={<AddAdmin />} />
                </Route>
              </Route>
            </Route>
          </Route>

          {/*Page Not Found */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      )}
    </>
  );
}

export default App;
