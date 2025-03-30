import React from 'react';
import styled from 'styled-components';

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isCurrentUser ? 'flex-end' : 'flex-start')};
  margin-bottom: 12px;
  max-width: 100%;
`;

const MessageBubble = styled.div`
  padding: 10px 15px;
  border-radius: 18px;
  max-width: 70%;
  word-wrap: break-word;
  background-color: ${(props) => (props.isCurrentUser ? '#3498db' : '#f1f0f0')};
  color: ${(props) => (props.isCurrentUser ? 'white' : '#333')};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    max-width: 85%;
  }
`;

const MessageInfo = styled.div`
  display: flex;
  font-size: 12px;
  margin-top: 4px;
  color: #7f8c8d;
`;

const Username = styled.span`
  font-weight: bold;
  margin-right: 8px;
`;

const Time = styled.span`
  font-style: italic;
`;

const Message = ({ text, username, time, isCurrentUser }) => {
  // Format time
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <MessageContainer isCurrentUser={isCurrentUser}>
      <MessageBubble isCurrentUser={isCurrentUser}>
        {text}
      </MessageBubble>
      <MessageInfo>
        <Username>{isCurrentUser ? 'You' : username}</Username>
        <Time>{formatTime(time)}</Time>
      </MessageInfo>
    </MessageContainer>
  );
};

export default Message; 