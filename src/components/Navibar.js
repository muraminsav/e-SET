import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

export default function Navibar() {
  return (
    <Container>
      <Navbar expand="lg">
        <Container gb="dark">
          <Navbar.Brand> React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav "
            className="float-xs-right"
          />
          <Navbar.Collapse id="basic-navbar-nav ">
            <Nav className="me-auto">
              <Nav.Link href="/me">Home</Nav.Link>
              <Nav.Link href="/profile">Profile Settings</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/login">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
}
