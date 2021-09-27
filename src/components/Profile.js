import React, { useContext, useState } from 'react';
import Navibar from './Navibar';

import { Form, Button, Alert } from 'react-bootstrap';
import { UserContext } from '../context/userContext';
import { updateUser } from '../api/Api';

export default function Profile(props) {
  console.log(localStorage.uId);
  if (!localStorage.uId) {
    props.history.push('/login');
  }
  const { userInfo, setUserInfo } = useContext(UserContext);

  const { firstName, lastName, email } = userInfo;
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (userInfo.password !== userInfo.passwordConfirm)
      return setError('Non matching password');
    try {
      const user = { ...userInfo };
      const res = await updateUser(user, localStorage.uid);
      // setUserInfo(...res);
      console.log('respond', res);
      setError('');
    } catch (error) {
      // setError(error);
      console.log(error);
    }
  };
  console.log(userInfo);

  return (
    <div>
      <Navibar />
      <div>
        <div
          className="wrapper bg-white mt-sm-5 d-flex flex-column align-items-center  "
          style={{ maxWidth: '150vh' }}
        >
          <h5 className="m-3 pb-4 border-bottom">Account settings</h5>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={(e) => submit(e)}>
            <Form.Group id="first-name" style={{ display: props.display }}>
              <Form.Label className="mt-1">First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder={firstName}
                name="firstName"
                value={userInfo.firstName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group id="last-name" style={{ display: props.display }}>
              <Form.Label className="mt-1">Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder={lastName}
                name="lastName"
                value={userInfo.lastName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label className="mt-1">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder={email}
                name="email"
                value={userInfo.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label className="mt-3">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="New Password"
                name="password"
                value={userInfo.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label className="mt-2">Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                placeholder="*********"
                name="passwordConfirm"
                value={userInfo.passwordConfirm}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="py-3 pb-4 border-bottom d-flex justify-content-between">
              <Button type="submit" className="btn btn-primary mr-3">
                Save Changes
              </Button>
              <Button className="btn btn-info mr-3" href="/">
                Cancel Changes
              </Button>
            </div>
          </Form>
          <div className="d-sm-flex align-items-center justify-content-between pt-3">
            <div>
              <b>Delete account</b>
            </div>
            <div className="">
              <button className="btn btn-danger m-3">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
