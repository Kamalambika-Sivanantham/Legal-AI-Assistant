from dotenv import load_dotenv
import os

from google import genai
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.legal_routes import router as legal_router

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=api_key)

app = FastAPI(
    title="Legal AI Assistant API",
    description="Multi-Agent Legal AI powered by Google Gemini",
    version="1.0.0"
)

def generate_response(prompt):
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )
        return response.text
    except Exception as e:
        return f"Gemini Error: {str(e)}"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(legal_router)

@app.get("/")
async def root():
    return {
        "status": "ok",
        "message": "Legal AI Assistant Backend Running",
        "version": "1.0.0"
    }

class ChatRequest(BaseModel):
    prompt: str

@app.post("/chat")
async def chat(req: ChatRequest):
    return {
        "response": generate_response(req.prompt)
    }