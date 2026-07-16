import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Navbar } from '@/components/layout/Navbar';
import { ChatContainer } from '@/components/chat/ChatContainer';
import { Message } from '@/components/chat/ChatMessage';

export const Route = createFileRoute('/(app)/')({
  component: App,
});

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial',
      role: 'assistant',
      content: "Hi! I'm Saujana's AI Digital Twin.\n\nI can tell you about Saujana's background, projects, technical skills, research, work experience, and interests. Feel free to ask me anything.",
      createdAt: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate backend delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'This is a mock response. The backend integration will be added next.',
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <Navbar />
      <main className="flex-1 pt-16">
        <ChatContainer
          messages={messages}
          isLoading={isLoading}
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSend={handleSend}
        />
      </main>
    </div>
  );
}
