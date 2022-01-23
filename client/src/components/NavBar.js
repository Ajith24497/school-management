import React, { useContext } from "react";
import { Navbar, Container, Dropdown } from "react-bootstrap";

import user_icon from "../assets/images/man.png";
import { deleteCookie } from "../api/cookie_api";
import { AuthContext } from "../contexts/AuthContext";

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
  const { updateAuthInfo } = useContext(AuthContext);

  const handleLogout = () => {
    deleteCookie("token");
    updateAuthInfo(false, "", "", 0);
  };

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
              <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>
    </div>
  );
}
