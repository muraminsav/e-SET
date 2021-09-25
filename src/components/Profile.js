import React from 'react';
import { Container, Card, Button, Form } from 'react-bootstrap';
import Navibar from './Navibar';
import SignForm from './SignForm';

export default function Profile(props) {
  return (
    <div>
      <Navibar />
      <div>
        <h3>Profile</h3>
      </div>
    </div>
  );
}
