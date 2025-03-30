import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Message from './Message';

const ChatContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    padding: 10px;
    margin-bottom: 10px;
  }
`;

const TypingIndicator = styled.div`
  font-style: italic;
  color: #7f8c8d;
  margin-top: 10px;
  padding: 5px;
`;

const EmptyState = styled.div`
  text-align: center;
  color: #7f8c8d;
  margin: auto 0;
  font-size: 18px;
`;

const ChatWindow = ({ messages, currentUser, typingUser }) => {
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <ChatContainer>
      {messages.length === 0 ? (
        <EmptyState>No messages yet. Start the conversation!</EmptyState>
      ) : (
        messages.map((message, index) => (
          <Message
            key={index}
            text={message.text}
            username={message.user}
            time={message.time}
            isCurrentUser={currentUser.id === message.userId}
          />
        ))
      )}
      
      {typingUser && (
        <TypingIndicator>
          {typingUser} is typing...
        </TypingIndicator>
      )}
      
      <div ref={messagesEndRef} />
    </ChatContainer>
  );
};

export default ChatWindow; 