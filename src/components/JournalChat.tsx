'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Message } from '../types';
import MessageBubble from './MessageBubble';
import './JournalChat.css';

const JournalChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = '0px';
    el.style.height = Math.min(el.scrollHeight, 220) + 'px';
  };

  useEffect(() => {
    autoResize();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      sender: 'user',
      text: input,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    requestAnimationFrame(() => {
      if (textareaRef.current) textareaRef.current.style.height = '0px';
    });

    setTimeout(() => {
      const aiMsg: Message = {
        id: crypto.randomUUID(),
        sender: 'ai',
        text: '¿Puedes contarme un poco más sobre eso?',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, aiMsg]);
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
          <div ref={messagesEndRef} />
        </div>

        <div className="journal-form">
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={e => {
              setInput(e.target.value);
              autoResize();
            }}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
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
