import os
import google.generativeai as genai
from typing import Optional


# Initialize once at module load, not on every call
_model = None

def _get_model():
    global _model

    if _model is not None:
        return _model

    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        raise ValueError("GEMINI_API_KEY not found")

    genai.configure(api_key=api_key)

    _model = genai.GenerativeModel("gemini-2.5-flash")

    return _model


def generate_response(prompt: str, system_instruction: Optional[str] = None) -> str:
    """
    Send a prompt to Gemini and return the text response.
    Raises structured exceptions so callers can return proper HTTP errors.
    """
    try:
        model = _get_model()
        full_prompt = f"{system_instruction}\n\n{prompt}" if system_instruction else prompt
        response = model.generate_content(full_prompt)
        return response.text

    except Exception as e:
        err_str = str(e).lower()

        # 429 quota / rate limit
        if "429" in err_str or "quota" in err_str or "resource_exhausted" in err_str:
            raise QuotaExceededError(
                "Gemini API quota exceeded. Please wait a moment and try again."
            )

        # Invalid API key
        if "api_key" in err_str or "invalid" in err_str or "401" in err_str or "403" in err_str:
            raise AuthError(
                "Invalid or missing Gemini API key. Please check your .env file."
            )

        # Model not found
        if "not found" in err_str or "404" in err_str:
            raise ModelError(
                "Gemini model not found. The model name may be incorrect or unavailable."
            )

        # Re-raise anything else as a generic backend error
        raise GeminiError(f"Gemini API error: {str(e)}")


# ── Custom exception types so routes can return the right HTTP status ──────────

class GeminiError(Exception):
    """Base class for Gemini errors."""

class QuotaExceededError(GeminiError):
    """HTTP 429 – quota / rate limit hit."""

class AuthError(GeminiError):
    """HTTP 401 – bad API key."""

class ModelError(GeminiError):
    """HTTP 503 – model unavailable."""
