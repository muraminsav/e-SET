import React, { useContext, useState } from 'react';
import { Button, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useChat from '../api/ChatApi';
import { UserContext } from '../context/userContext';
import Navibar from './Navibar';
import './messages.css';
import Message from './Message';

export default function Messages(props) {
  const { roomId } = props.match.params;
  const { messages, sendMessage } = useChat(roomId);
  const [newMessage, setNewMessage] = useState('');
  const { userInfo } = useContext(UserContext);

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage) {
      sendMessage(newMessage, userInfo.firstName);
      setNewMessage('');
      console.log('uf fom messages', userInfo);
    }
  };

  return (
    <Container>
      <Navibar />
      <h1 className="room-name">Room: {roomId}</h1>
      <Card className="p-2" style={{ minHeight: '70vh' }}>
        <ul style={{ listStyleType: 'none' }}>
          {messages.map((message, i) => (
            <li
              key={i}
              className={`message-item ${
                message.myMessages ? 'my-message' : 'received-message'
              }`}
            >
              <Message value={message} />
            </li>
          ))}
        </ul>
      </Card>
      <div className="d-flex justify-content-between m-3">
        <input
          type="text"
          value={newMessage}
          onChange={handleNewMessageChange}
          placeholder="Write message..."
          style={{ height: '6vh', width: '47vh' }}
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
      <Link to="/" className="btn">
        Leave
      </Link>
    </Container>
  );
}
