import { createFileRoute } from '@tanstack/react-router';
import { Navbar } from '@/components/layout/Navbar';
import { ChatContainer } from '@/components/chat/ChatContainer';
import { useChat } from '@/features/chat/useChat';

export const Route = createFileRoute('/(app)/')({
  component: App,
});

function App() {
  const { messages, inputValue, setInputValue, isLoading, handleSend } = useChat();

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
