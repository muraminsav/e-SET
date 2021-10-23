import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';

const socketUrl = 'http://localhost:3001';

const useChat = (roomId, user) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(socketUrl, {
      query: { roomId },
    });
    socketRef.current.on('newMessage', (message) => {
      const incomingMessage = {
        ...message,
        myMessages: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const sendMessage = (content, user) => {
    socketRef.current.emit('newMessage', {
      body: content,
      senderId: socketRef.current.id,
      name: user,
    });
  };

  return { messages, sendMessage };
};

export default useChat;
