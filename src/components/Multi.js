import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import Navibar from './Navibar';

export default function Multi(props) {
  // if (!localStorage.uId) {
  //   props.history.push('/login');
  // }
  return (
    <Container>
      <Navibar />
      Multi
    </Container>
  );
}
