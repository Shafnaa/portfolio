const BASE_URL = 'http://localhost:8080';

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
  const res = await fetch(`${BASE_URL}/api/v1/chat/completions`, {
    method: 'POST',
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
