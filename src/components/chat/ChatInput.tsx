import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowUp } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  placeholder?: string;
}

export const ChatInput = React.memo(({
  value,
  onChange,
  onSubmit,
  isLoading = false,
  placeholder = 'Ask me anything...',
}: ChatInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="relative flex w-full items-end gap-2 rounded-2xl bg-muted/50 p-2 focus-within:ring-1 focus-within:ring-ring transition-all">
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={cn(
          'flex-1 resize-none bg-transparent border-none focus-visible:ring-0 py-3 min-h-[44px] max-h-32',
          isLoading && 'opacity-50 cursor-not-allowed'
        )}
      />
      <Button
        size="icon"
        onClick={onSubmit}
        disabled={isLoading || !value.trim()}
        className="shrink-0 rounded-xl h-10 w-10"
      >
        <ArrowUp className="h-4 w-4" />
        <span className="sr-only">Send message</span>
      </Button>
    </div>
  );
});

ChatInput.displayName = 'ChatInput';
