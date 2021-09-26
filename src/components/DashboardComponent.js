import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import Navibar from './Navibar';
import { useEffect, useState } from 'react';
import { getUser } from '../api/Api';
import Profile from './Profile';
import Multi from './Multi';
import Solo from './Solo';
import About from './About';
import ProtectedRoutes from '../secure/ProtectedRoutes';
import auth from '../secure/auth';

export default function DashboardComponent() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (auth.isAuthenticated) {
      setIsAuth(true);
    }
  }, []);

  return (
    <>
      {!isAuth ? (
        <Link to="/login" />
      ) : (
        <>
          <Navibar />
          <div className="d-flex align-items-center" style={{ height: '100%' }}>
            <Container>
              <Card
                style={{
                  height: '50vh',
                  minWidth: '25vh',
                  margin: '5vh 2vh 0 -1vh',
                  padding: '5px',
                }}
              >
                <Card.Body>Top Sore</Card.Body>
              </Card>
            </Container>

            <Container
              className="d-flex justify-content-around flex-column "
              style={{
                height: '50vh',
                margin: '5vh 2vh 0 -1vh',
                maxWidth: '30vh',
              }}
            >
              <Button variant="outline-secondary" href="/solo">
                Go Solo
              </Button>
              <Button variant="outline-secondary" href="/multi">
                Go Online
              </Button>
            </Container>
          </div>
          <Router>
            <Switch>
              <Route exact path="/about" component={() => <About />} />
              <Route exact path="/solo" component={() => <Solo />} />
              <ProtectedRoutes path="/multi" component={() => <Multi />} />
              <ProtectedRoutes path="/profile" component={() => <Profile />} />
            </Switch>
          </Router>
        </>
      )}
    </>
  );
}
