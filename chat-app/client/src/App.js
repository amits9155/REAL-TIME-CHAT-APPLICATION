import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';
import ChatWindow from './components/ChatWindow';
import UserInput from './components/UserInput';
import Login from './components/Login';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px;
  
  @media (max-width: 768px) {
    padding: 10px;
    height: 100vh;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px;
`;

const socket = io('http://localhost:5000');

function App() {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [typingUser, setTypingUser] = useState(null);
  
  useEffect(() => {
    // Listen for chat history
    socket.on('chat history', (history) => {
      setMessages(history);
    });
    
    // Listen for incoming messages
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
    
    // Listen for user typing
    socket.on('user typing', (username) => {
      setTypingUser(username);
    });
    
    // Listen for user stop typing
    socket.on('user stop typing', () => {
      setTypingUser(null);
    });
    
    // Cleanup on component unmount
    return () => {
      socket.off('chat message');
      socket.off('chat history');
      socket.off('user typing');
      socket.off('user stop typing');
    };
  }, []);
  
  const sendMessage = (message) => {
    if (message.trim() && user) {
      const messageObj = {
        text: message,
        user: user.username,
        userId: user.id
      };
      socket.emit('chat message', messageObj);
    }
  };
  
  const handleTyping = (isTyping) => {
    if (user) {
      if (isTyping) {
        socket.emit('typing', user.username);
      } else {
        socket.emit('stop typing');
      }
    }
  };
  
  const loginUser = (username) => {
    if (username.trim()) {
      const userId = `user_${Date.now()}`;
      setUser({ username, id: userId });
    }
  };
  
  return (
    <AppContainer>
      <Title>Real-time Chat App</Title>
      
      {user ? (
        <>
          <ChatWindow 
            messages={messages} 
            currentUser={user} 
            typingUser={typingUser}
          />
          <UserInput 
            sendMessage={sendMessage} 
            onTyping={handleTyping}
          />
        </>
      ) : (
        <Login onLogin={loginUser} />
      )}
    </AppContainer>
  );
}

export default App; 