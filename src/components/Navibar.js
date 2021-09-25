import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import auth from '../secure/auth';

export default function Navibar() {
  auth.logout(async () => {
    await fetch('http://localhost:3001/logout', {
      method: 'POST',
      header: { 'Content-Type': 'application/json' },
      credential: 'include',
    });
  });

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
              <Nav.Link onClick={auth.logout} href="/login">
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
}
