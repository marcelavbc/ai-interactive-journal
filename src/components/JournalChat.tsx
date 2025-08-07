'use client';

import React, { useState } from 'react';
import { Message } from '../types';
import MessageBubble from './MessageBubble';
import './JournalChat.css';

const JournalChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      sender: 'user',
      text: input,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setLoading(true);

    // Simulación de respuesta IA
    setTimeout(() => {
      const aiResponse: Message = {
        id: crypto.randomUUID(),
        sender: 'ai',
        text: '¿Puedes contarme un poco más sobre eso?',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="journal-chat-container">
      <div className="journal-chat">
        <div className="journal-messages">
          {messages.map(msg => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {loading && <div className="loading-message">Escribiendo...</div>}
        </div>

        <div className="journal-form">
          <textarea
            rows={2}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Escribe lo que pasó hoy..."
          />
          <button onClick={handleSend} disabled={loading}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default JournalChat;
