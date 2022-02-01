import React, { useEffect, useState } from "react";
import { Navbar, Container, Dropdown } from "react-bootstrap";

import user_icon from "../assets/images/man.png";
import { logout } from "../api/logout_api";
import tryCatch from "./TryCatch";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { checkToken, getUserFromToken } from "../api/token_api";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href="/"
    ref={ref}
    className="text-decoration-none"
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    {/* &#x25bc; */}
  </a>
));

export default function NavBar() {
  const { token, setToken } = useAuth();
  const [userId, setUserId] = useState("");
  const [userType, setUserType] = useState(0);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const [logoutData, logoutError] = await tryCatch(logout(token));

    if (!logoutError) {
      window.alert("Logged out successfully");
      setToken(null);
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const userTypes = {
    0: "error",
    1: "staff",
    2: "student",
    3: "admin",
    4: "superadmin",
  };

  const profileClickHandler = () => {
    navigate(`/home/${userTypes[userType]}/profile/${userId}`);
  };

  const getUserId = async () => {
    const [userData, userError] = await tryCatch(getUserFromToken(token));
    if (!userError) {
      const { userTypeId, userUUID } = userData.data;
      setUserType(userTypeId);
      setUserId(userUUID);
    } else {
      console.log("User not setted Navbar");
    }
  };

  useEffect(() => {
    getUserId();
  }, []);

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">School Management</Navbar.Brand>
          <Dropdown style={{ alignSelf: "flex-end!important" }}>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
              <img src={user_icon} alt="user_icon"></img>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={profileClickHandler}>
                Profile
              </Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>
    </div>
  );
}
