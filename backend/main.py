# Load .env FIRST — before any other local imports that might read env vars
from dotenv import load_dotenv
import os
import google.generativeai as genai
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.legal_routes import router as legal_router

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise Exception("Gemini API key missing")

genai.configure(api_key=api_key)
app = FastAPI(
    title="Legal AI Assistant API",
    description="Multi-Agent Legal AI powered by Google Gemini",
    version="1.0.0"
)

def generate_response(prompt):
    try:
        model = genai.GenerativeModel("gemini-2.5-flash")
        response = model.generate_content(prompt)
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
