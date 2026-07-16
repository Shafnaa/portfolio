import os
from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from portfolio.agent import build_graph


graph = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global graph
    load_dotenv(os.path.join(os.path.dirname(__file__), "..", "..", ".env.local"))
    graph = build_graph()
    yield


app = FastAPI(title="Portfolio API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ALLOW_ORIGIN", "http://localhost:5173").split(";"),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    model: str = "digital-twin"
    messages: list[ChatMessage]
    stream: bool = False


class Choice(BaseModel):
    index: int = 0
    message: ChatMessage
    finish_reason: str = "stop"


class ChatResponse(BaseModel):
    id: str = "chatcmpl-default"
    object: str = "chat.completions"
    model: str = "digital-twin"
    choices: list[Choice]


@app.post("/api/v1/chat/completions")
async def chat(request: ChatRequest):
    question = request.messages[-1].content
    state = graph.invoke({"question": question})
    return ChatResponse(
        choices=[
            Choice(
                message=ChatMessage(role="assistant", content=state["final_answer"])
            )
        ]
    )


@app.get("/health")
async def health():
    return {"status": "ok"}
