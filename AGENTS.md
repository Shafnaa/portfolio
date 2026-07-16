# Project Overview

This project is my Digital Twin.

The application is a single-page AI chat experience.

There are no traditional portfolio pages, hero sections, or navigation.

Visitors interact directly with an AI representation of me to learn about my background, projects, research, and experience.

The conversation is the interface.

---

# Tech Stack

Frontend

- React 19
- Vite
- TypeScript
- TanStack Router
- TanStack Query
- TailwindCSS
- shadcn/ui
- Motion (Framer Motion)
- React Hook Form
- Zod

Backend

- Custom Agentic Backend
- OpenAI-compatible API
- Endpoint:

```
POST /api/v1/chat/completions
```

Do NOT use the OpenAI SDK.

Always communicate through fetch.

---

# Design Philosophy

The design should be

- minimal
- modern
- elegant
- premium
- calm
- developer-oriented

Avoid:

- unnecessary decorations
- skeuomorphism
- heavy gradients
- excessive animations

Prefer whitespace.

Typography is more important than decorations.

Animations should feel intentional.

---

# Code Quality

Always prefer

- composition
- reusable components
- small files
- descriptive names
- strict typing

Never use:

- any
- eslint disable comments
- unnecessary type assertions

Always infer types whenever possible.

---

# Folder Structure

```
src/
    components/
        ui/
        layout/
        chat/
    features/
        chat/
    hooks/
    lib/
    routes/
    services/
    stores/
    types/
    utils/
```

---

# Routing

Use TanStack Router.

Keep routes thin.

Move business logic into features.

Do not place API logic inside route files.

---

# State Management

Prefer

- local React state
- TanStack Query

Only introduce a global state library if absolutely necessary.

---

# API Layer

Create reusable API clients.

Example:

```
services/chat.ts
```

Never call fetch directly inside components.

Components should only call service functions.

---

# Chat API

The backend follows the OpenAI Chat Completions format.

Example request:

```json
{
  "model": "digital-twin",
  "messages": [
    {
      "role": "user",
      "content": "Tell me about your projects."
    }
  ],
  "stream": true
}
```

Support:

- streaming
- non-streaming

Design the API abstraction so additional endpoints can be added later.

---

# Streaming

Streaming is a first-class feature.

Implement proper streaming using:

- ReadableStream
- TextDecoder

Do not rely on polling.

---

# Components

Components should be presentational.

Business logic belongs inside hooks or feature modules.

Avoid giant components.

Prefer composition.

---

# Styling

Use TailwindCSS.

Prefer utility classes.

Extract repeated patterns into reusable components.

Use CSS variables for design tokens.

---

# Accessibility

Every interactive element must:

- have keyboard support
- have focus states
- have accessible labels

---

# Forms

Use

- React Hook Form
- Zod

Validation belongs in schemas.

---

# Naming

Components

```
ChatWindow.tsx
```

Hooks

```
useChat.ts
useStreaming.ts
```

Utilities

```
formatDate.ts
cn.ts
```

---

# Imports

Prefer absolute imports using:

```
@/
```

instead of long relative paths.

---

# User Experience

When the application loads:

- The chat is immediately visible.
- The conversation already contains one assistant message.
- The message briefly introduces who I am and invites the visitor to ask questions.
- The input box is immediately focused so the visitor can start typing.

Example initial message:

"Hi! I'm Saujana's AI Digital Twin.

I can tell you about Saujana's background, projects, technical skills, research, work experience, and interests. Feel free to ask me anything."

Do not implement a hero section.

Do not implement onboarding screens.

Do not require the user to press a "Start Chat" button.

The first thing users should see is an active conversation.

---

# Conversation

The application behaves like a modern AI chat application.

Requirements:

- Initial assistant message
- User messages
- Streaming assistant responses
- Markdown rendering
- Code syntax highlighting
- Auto-scroll during generation
- Stop generation
- Regenerate last response
- Copy assistant messages
- Mobile-friendly layout

The message list should remain the primary focus of the interface.

Avoid unnecessary UI elements.

---

# Initial Assistant Message

The first assistant message is part of the frontend user experience.

It should be rendered immediately when the page loads without making an API request.

This initial message should not be included in the conversation history sent to the backend unless explicitly requested.

The backend conversation begins only after the user sends their first message.
