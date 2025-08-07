import React from 'react';
import { Message } from '@/types';
import './MessageBubble.css';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`message-bubble ${isUser ? 'user' : 'ai'}`}>
      <p>{message.text}</p>
    </div>
  );
};

export default MessageBubble;
