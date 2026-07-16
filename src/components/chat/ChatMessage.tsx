import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export type MessageRole = 'user' | 'assistant';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: Date;
}

interface ChatMessageProps {
  message: Message;
  isLast?: boolean;
}

export const ChatMessage = React.memo(({ message, isLast }: ChatMessageProps) => {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex w-full gap-3 py-6',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback className={cn(
          'text-xs',
          isUser ? 'bg-muted' : 'bg-primary text-primary-foreground'
        )}>
          {isUser ? 'U' : 'AI'}
        </AvatarFallback>
      </Avatar>
      <div
        className={cn(
          'flex max-w-[80%] flex-col gap-2',
          isUser ? 'items-end' : 'items-start'
        )}
      >
        <div
          className={cn(
            'rounded-2xl px-4 py-2 text-sm',
            isUser 
              ? 'bg-primary text-primary-foreground rounded-tr-none' 
              : 'bg-muted text-foreground rounded-tl-none'
          )}
        >
          <div className="whitespace-pre-wrap break-words leading-relaxed">
            {message.content}
          </div>
        </div>
        <span className="text-[10px] text-muted-foreground px-1">
          {message.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
});

ChatMessage.displayName = 'ChatMessage';
