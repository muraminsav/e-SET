import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import Navibar from './Navibar';
import { useEffect, useState, useContext } from 'react';
import { getUser } from '../api/Api';
// import ProtectedRoutes from '../secure/ProtectedRoutes';
// import auth from '../secure/auth';
import { UserContext } from '../context/userContext';
const initialState = {
  firstName: '',
  lastName: '',
  score: '',
  gameId: '',
};

export default function DashboardComponent(props) {
  const { userInfo } = useContext(UserContext);
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const grabUser = async () => {
      const user = await getUser(userInfo.id);

      if (user) {
        console.log('dashbordUser', user);
        console.log('context user', userInfo.id);
        const { firstName, lastName } = user;
        setState((prevState) => {
          return {
            ...prevState,
            firstName,
            lastName,
          };
        });
      } else {
        console.log('No user  found ');
      }
    };
    grabUser();
  }, []);

  return (
    <>
      <Navibar />
      <div className="d-flex align-items-center" style={{ height: '100%' }}>
        <Container>
          <h3>Greatings {state.firstName}</h3>
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
    </>
  );
}
