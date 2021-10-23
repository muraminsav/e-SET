import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';

export default function Message(props) {
  const { name, body, myMessages } = props.value;
  return (
    <Card>
      <div>from: {myMessages ? 'Me' : name}</div>
      <div>message: {body}</div>
    </Card>
  );
}
