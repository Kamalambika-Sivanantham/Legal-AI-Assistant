from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional
from functools import lru_cache

from agents.coordinator import CoordinatorAgent
from agents.document_agent import DocumentAgent
from utils.gemini_client import QuotaExceededError, AuthError, ModelError, GeminiError

router = APIRouter()


# ── Lazy agent singletons (created on first request, not at import time) ───────

@lru_cache(maxsize=1)
def _coordinator():
    return CoordinatorAgent()

@lru_cache(maxsize=1)
def _document_agent():
    return DocumentAgent()


# ── Request models ─────────────────────────────────────────────────────────────

class AskRequest(BaseModel):
    question: str


class DocumentRequest(BaseModel):
    type: str
    name: str
    address: str
    contact: Optional[str] = ""
    description: str
    additional_details: Optional[str] = ""


# ── Shared error handler ───────────────────────────────────────────────────────

def _handle_error(e: Exception):
    """
    Map Gemini exceptions to proper HTTP status codes and a consistent
    JSON body: { "success": false, "error": "<message>" }
    """
    if isinstance(e, QuotaExceededError):
        return JSONResponse(status_code=429,
            content={"success": False, "error": str(e)})
    if isinstance(e, AuthError):
        return JSONResponse(status_code=401,
            content={"success": False, "error": str(e)})
    if isinstance(e, ModelError):
        return JSONResponse(status_code=503,
            content={"success": False, "error": str(e)})
    if isinstance(e, GeminiError):
        return JSONResponse(status_code=502,
            content={"success": False, "error": str(e)})

    print(f"[ERROR] {type(e).__name__}: {e}")
    return JSONResponse(status_code=500,
        content={"success": False, "error": f"Internal server error: {str(e)}"})


# ── Routes ─────────────────────────────────────────────────────────────────────

@router.post("/ask")
async def ask_question(req: AskRequest):
    try:
        result = _coordinator().route(req.question)
        return result
    except Exception as e:
        return _handle_error(e)


@router.post("/generate-document")
async def generate_document(req: DocumentRequest):
    try:
        doc = _document_agent().generate(
            doc_type=req.type,
            name=req.name,
            address=req.address,
            contact=req.contact or "",
            description=req.description,
            additional_details=req.additional_details or "",
        )
        return {"agent": "Document Agent", "document_type": req.type, "document": doc}
    except Exception as e:
        return _handle_error(e)


@router.get("/document-types")
async def get_document_types():
    return {"types": DocumentAgent.SUPPORTED_DOCUMENTS}
