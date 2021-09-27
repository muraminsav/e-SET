import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import auth from '../secure/auth';
import { logoutUser } from '../api/Api';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import About from './About';
import Solo from './Solo';
import Multi from './Multi';
import Profile from './Profile';

// useEffect

export default function Navibar(props) {
  const user = props.value;
  // const logout = auth.logout(() => {
  //   logoutUser('token');
  // });
  console.log(user);
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
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/profile" value={user}>
                Profile Settings
              </Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link
                onClick={() => {
                  auth.logout(() => {
                    logoutUser('token');
                  });
                }}
                href="/"
              >
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <Router>
        <Switch>
          <Route exact path="/about" render={(props) => <About {...props} />} />
          <Route exact path="/solo" render={(props) => <Solo {...props} />} />
          <Route exact path="/multi" render={(props) => <Multi {...props} />} />
          <Route
            exact
            path="/profile"
            render={(props) => <Profile {...props} />}
          />
        </Switch>
      </Router> */}
    </Container>
  );
}
