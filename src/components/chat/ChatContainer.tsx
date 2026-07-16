import React from 'react';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { Message } from './ChatMessage';

interface ChatContainerProps {
  messages: Message[];
  isLoading: boolean;
  inputValue: string;
  setInputValue: (value: string) => void;
  onSend: () => void;
  className?: string;
}

export const ChatContainer = React.memo(({
  messages,
  isLoading,
  inputValue,
  setInputValue,
  onSend,
  className,
}: ChatContainerProps) => {
  return (
    <div className={cn('flex h-full flex-col bg-background', className)}>
      <div className="flex-1 overflow-hidden">
        <MessageList messages={messages} isLoading={isLoading} />
      </div>
      <div className="max-w-3xl w-full mx-auto p-4 md:p-6">
        <ChatInput 
          value={inputValue} 
          onChange={setInputValue} 
          onSubmit={onSend} 
          isLoading={isLoading} 
        />
      </div>
    </div>
  );
});

import { cn } from '@/lib/utils';

ChatContainer.displayName = 'ChatContainer';
