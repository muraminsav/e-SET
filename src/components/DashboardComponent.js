import React from 'react';

import { Container, Card, Button, Form } from 'react-bootstrap';
import Navibar from './Navibar';
import { useEffect, useState } from 'react';
import { getUser } from '../api/Api';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
};

export default function DashboardComponent(props) {
  const [userState, setUserState] = useState(initialState);
  const uId = localStorage.uId;
  localStorage.uId || props.history.push('/login');
  useEffect(async () => {
    try {
      const user = await getUser(uId);
      setUserState({ ...user });
    } catch (error) {
      console.log(error, 'No user  found ');
      throw new Error(error);
    }
  }, []);
  const [roomName, setRoomName] = React.useState('');

  const handleRoomNameChange = (event) => {
    event.preventDefault();
    setRoomName(event.target.value);
  };
  const submit = () => {
    props.history.push(`/messages/${roomName}`);
  };

  return (
    <>
      <Navibar value={userState} />

      <div className="d-flex align-items-center" style={{ height: '100%' }}>
        <Container>
          <h3>Greetings {userState.firstName}</h3>
          <Card
            style={{
              height: '50vh',
              minWidth: '25vh',
              margin: '5vh 2vh 0 -1vh',
              padding: '5px',
            }}
          >
            <Card.Body>
              <Container
                className="d-flex justify-content-center align-items-center"
                style={{ height: '100%' }}
              >
                <Form onSubmit={submit}>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      required={true}
                      placeholder="Room"
                      value={roomName}
                      onChange={handleRoomNameChange}
                    />
                  </Form.Group>
                  <Button className="mt-3" type="submit">
                    Join room
                  </Button>
                </Form>
              </Container>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
}
