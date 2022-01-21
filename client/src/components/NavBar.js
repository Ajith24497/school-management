import React from "react";
import { Navbar, Container } from "react-bootstrap";

export default function NavBar() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">School Management</Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
}
