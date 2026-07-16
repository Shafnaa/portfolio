// Base URL for the chat API
const BACKEND_BASE_URL = import.meta.env.BACKEND_BASE_URL || 'https://api.saujanashafi.com';

interface ChatMessage {
  role: string;
  content: string;
}

interface ChatResponse {
  choices: {
    message: ChatMessage;
  }[];
}

export async function sendMessage(messages: { role: string; content: string }[]): Promise<string> {
  const res = await fetch(`${BACKEND_BASE_URL}/api/v1/chat/completions`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'digital-twin',
      messages,
      stream: false,
    }),
  });

  if (!res.ok) {
    throw new Error(`Chat API error: ${res.status}`);
  }

  const data: ChatResponse = await res.json();
  return data.choices[0].message.content;
}
