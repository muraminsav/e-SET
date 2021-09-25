import React, { useState } from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const url = 'http://localhost:3001/';

export default function SignForm(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');

  const submit = async (e, display) => {
    e.preventDefault();

    if (password === passwordConfirm) {
      setError('non matching password');
      console.log(error);
    } else {
      const endpoint = display === 'block' ? 'register' : 'login';
      const postBody =
        props.display === 'block'
          ? { firstName, lastName, email, password }
          : { email, password };

      const response = fetch(url + endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postBody),
      });

      e.target.value = '';
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center flex-column "
      style={{ minHeight: '50vh' }}
    >
      <Card>
        <Card.Body
          className="d-flex flex-column justify-content-around"
          style={{ minWidth: '45vh', minHeight: '60vh', padding: '7vh' }}
        >
          <h2 className="text-center mb-4">
            {props.display === 'block' ? 'Sign Up' : 'Log In'}
          </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={(e) => submit(e, props.display)}>
            <Form.Group id="first-name" style={{ display: props.display }}>
              <Form.Label className="mt-1">First Name</Form.Label>
              <Form.Control
                type="text"
                required={props.display === 'block' ? true : false}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group id="last-name" style={{ display: props.display }}>
              <Form.Label className="mt-1">Last Name</Form.Label>
              <Form.Control
                type="text"
                required={props.display === 'block' ? true : false}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label className="mt-1">Email</Form.Label>
              <Form.Control
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label className="mt-3">Password</Form.Label>
              <Form.Control
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              id="password-confirm"
              style={{ display: props.display }}
            >
              <Form.Label className="mt-2">Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                required={props.display === 'block' ? true : false}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-content-center">
              {props.display === 'block' ? (
                <Button className="w-50 mt-5 mb-2 " type="submit">
                  Sign Up
                </Button>
              ) : (
                <Button className="w-50 mt-5 mb-2 " type="submit">
                  Log In
                </Button>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>

      <div className="w-100 text-center ">
        {props.display === 'block' ? (
          <div>
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        ) : (
          <div>
            Need an account? <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </div>
    </div>
  );
}
