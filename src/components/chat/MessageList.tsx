import React, { useEffect, useRef } from 'react';
import { ChatMessage, Message } from './ChatMessage';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
  className?: string;
}

export const MessageList = React.memo(({ 
  messages, 
  isLoading, 
  className 
}: MessageListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <ScrollArea 
      className={cn('h-full w-full', className)}
      viewportRef={scrollRef}
    >
      <div className="flex flex-col gap-1 px-4">
        {messages.map((message, index) => (
          <ChatMessage 
            key={message.id} 
            message={message} 
            isLast={index === messages.length - 1} 
          />
        ))}
        {isLoading && (
          <div className="flex py-6 gap-3">
            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
              AI
            </div>
            <div className="flex gap-1 items-center bg-muted px-4 py-2 rounded-2xl rounded-tl-none">
              <div className="h-1.5 w-1.5 rounded-full bg-foreground/50 animate-bounce [animation-delay:-0.3s]" />
              <div className="h-1.5 w-1.5 rounded-full bg-foreground/50 animate-bounce [animation-delay:-0.15s]" />
              <div className="h-1.5 w-1.5 rounded-full bg-foreground/50 animate-bounce" />
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
});

MessageList.displayName = 'MessageList';
