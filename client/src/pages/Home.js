import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <NavBar />
      <Container>
        <Row>
          <Col>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
