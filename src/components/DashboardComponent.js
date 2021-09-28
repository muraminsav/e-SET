import React from 'react';

import { Container, Card, Button } from 'react-bootstrap';
import Navibar from './Navibar';
import { useEffect, useState } from 'react';
import { getUser } from '../api/Api';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
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

  uId || userState.email || props.history.push('/login');

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
    </>
  );
}
