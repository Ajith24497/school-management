import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { checkToken } from "../api/token_api";

import NavBar from "../components/NavBar";
import tryCatch from "../components/TryCatch";
import useAuth from "../hooks/useAuth";
import Loading from "./Loading";

export default function Home() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { token, setToken } = useAuth();
  const navigate = useNavigate();

  const checkLogin = async () => {
    if (token) {
      const [tokenData, tokenError] = await tryCatch(checkToken(token));
      if (!tokenError) {
        if (tokenData.data.message === "Token Expired") {
          localStorage.removeItem("token");
          navigate("/login");
          setToken(null);
        } else {
          setIsAuth(true);
        }
      }
    }
    setIsLoaded(true);
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return !isLoaded ? (
    <Loading />
  ) : (
    <>
      <NavBar />
      <Container>
        <Row>
          <Col>{isAuth ? <Outlet /> : <Navigate to="/login" />}</Col>
        </Row>
      </Container>
    </>
  );
}
