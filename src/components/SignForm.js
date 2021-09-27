import React, { useContext, useState } from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import DashboardComponent from './DashboardComponent';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import auth from '../secure/auth';
import { loginUser, registerUser } from '../api/Api';
import { UserContext } from '../context/userContext';

const regInitial = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const logInitial = {
  email: '',
  password: '',
};
let initialState = {};
let apiCall;
let path = '';

export default function SignForm(props) {
  const { userInfo, setUserInfo } = useContext(UserContext);

  if (props.display === 'block') {
    initialState = { ...regInitial };
    apiCall = registerUser;
    path = '/';
  } else {
    initialState = { ...logInitial };
    apiCall = loginUser;
    path = '/me';
  }

  const [state, setState] = useState(initialState);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (props.display === 'block' && state.password !== state.passwordConfirm)
      return setError('non matching password');
    const user = { ...state };
    console.log('apiCall login user', user);
    const res = await apiCall(user);
    console.log(res);
    setUserInfo(res);
    if (res.error) {
      setError(res.message);
      setState(initialState);
    } else {
      props.setIsAuthenticated(true);
      auth.login(() => props.history.push(path));
    }
  };

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
                value={state.firstName}
                name="firstName"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group id="last-name" style={{ display: props.display }}>
              <Form.Label className="mt-1">Last Name</Form.Label>
              <Form.Control
                type="text"
                required={props.display === 'block' ? true : false}
                name="lastName"
                value={state.lastName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label className="mt-1">Email</Form.Label>
              <Form.Control
                type="email"
                required
                name="email"
                value={state.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label className="mt-3">Password</Form.Label>
              <Form.Control
                type="password"
                required
                name="password"
                value={state.password}
                onChange={handleChange}
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
                name="passwordConfirm"
                value={state.passwordConfirm}
                onChange={handleChange}
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
      {/* <Router>
        <Switch>
          <Route
            exact
            path="/me"
            component={() => (
              <DashboardComponent
                setIsAuthenticated={setIsAuthenticated}
                isAuthenticated={isAuthenticated}
              />
            )}
          />
        </Switch>
      </Router> */}
    </div>
  );
}
