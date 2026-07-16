import { useState, useCallback } from 'react';
import type { Message } from '@/components/chat/ChatMessage';
import { sendMessage } from '@/services/chat';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial',
      role: 'assistant',
      content:
        "Hi! I'm Saujana's AI Digital Twin.\n\nI can tell you about Saujana's background, projects, technical skills, research, work experience, and interests. Feel free to ask me anything.",
      createdAt: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = useCallback(async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const history = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const content = await sendMessage(history);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content,
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again.',
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading, messages]);

  return {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    handleSend,
  };
}
