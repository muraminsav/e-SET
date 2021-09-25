import React from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function SignForm(props) {
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
            {' '}
            {props.display === 'block' ? 'Sign Up' : 'Log In'}
          </h2>
          {/* {error && <Alert variant="danger">{error}</Alert>} */}
          <Form>
            <Form.Group id="first-name" style={{ display: props.display }}>
              <Form.Label className="mt-1">First Name</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
            <Form.Group id="last-name" style={{ display: props.display }}>
              <Form.Label className="mt-1">Last Name</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label className="mt-1">Email</Form.Label>
              <Form.Control type="email" required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label className="mt-3">Password</Form.Label>
              <Form.Control type="password" required />
            </Form.Group>
            <Form.Group
              id="password-confirm"
              style={{ display: props.display }}
            >
              <Form.Label className="mt-2">Password Confirmation</Form.Label>
              <Form.Control type="password" required />
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button className="w-50 mt-5 mb-2 " type="submit" href="/me">
                {props.display === 'block' ? 'Sign Up' : 'Log In'}
              </Button>
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
