import React from 'react';

import { Container, Card, Button } from 'react-bootstrap';
import Navibar from './Navibar';
import { useEffect, useState, useContext } from 'react';
import { getUser } from '../api/Api';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';
import About from './About';
import Solo from './Solo';
import Multi from './Multi';
import Profile from './Profile';
const initialState = {
  firstName: '',
  lastName: '',
  score: '',
  gameId: '',
};

export default function DashboardComponent(props) {
  const [userState, setUserState] = useState(initialState);
  const uId = localStorage.uId;

  useEffect(async () => {
    try {
      const user = await getUser(uId);
      setUserState({ ...user });
    } catch (error) {
      console.log(error, 'No user  found ');
      throw new Error(error);
    }
  }, []);

  if (!localStorage.uId) {
    props.history.push('/login');
  }
  console.log(userState);
  return (
    <>
      <Navibar value={userState} />

      <div className="d-flex align-items-center" style={{ height: '100%' }}>
        <Container>
          <h3>Greatings {userState.firstName}</h3>
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
      {/* <NavLink></NavLink>
      <NavLink></NavLink>
      <NavLink></NavLink>
      <NavLink></NavLink>
      <NavLink></NavLink> */}
    </>
  );
}
