import React, { useState } from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import auth from '../secure/auth';
import { loginUser, registerUser } from '../api/Api';
export default function SignForm(props) {
  const userDef = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };
  const [userReg, setUserReg] = useState(userDef);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);
  const login = { email, password };
  const register = { firstName, lastName, email, password };

  const submit = async (e, display) => {
    e.preventDefault();

    if (password !== passwordConfirm && display === 'block')
      return setError('non matching password');

    if (display === 'block') {
      const response = registerUser(register);
      const content = await response.json();
      if (content.error) return setError(content.error);
      setRedirect(true);
    } else {
      auth.login(async () => {
        const response = await loginUser(login);
        const content = await response.json();
        if (content.error) {
          auth.logout(() => console.log(content));
          return setError(content.error);
        }
        setRedirect(true);
      });
    }
  };

  console.log(auth.isAuthenticated());
  console.log(userReg);

  if (redirect) {
    if (props.display === 'block') {
      return <Redirect to="/login" />;
    } else {
      return <Redirect to="/me" />;
    }
  }
  return (
    <div
      className="d-flex align-items-center justify-content-center flex-column "
      style={{ minHeight: '90vh' }}
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
