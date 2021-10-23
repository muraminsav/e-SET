import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { logoutUser } from '../api/Api';

export default function Navibar(props) {
  const user = props.value;
  console.log(user);
  return (
    <Container>
      <Navbar expand="lg">
        <Container gb="dark">
          <Navbar.Brand>e-SET</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav "
            className="float-xxs-right"
          />
          <Navbar.Collapse id="basic-navbar-nav ">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/profile" value={user}>
                Profile Settings
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  logoutUser('token');
                }}
                href="/login"
              >
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
}
