import os
from typing import Optional
from google import genai

_client = None

def _get_client():
    global _client

    if _client is not None:
        return _client

    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        raise ValueError("GEMINI_API_KEY not found")

    _client = genai.Client(api_key=api_key)
    return _client


def generate_response(prompt: str, system_instruction: Optional[str] = None) -> str:
    try:
        client = _get_client()

        full_prompt = (
            f"{system_instruction}\n\n{prompt}"
            if system_instruction
            else prompt
        )

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=full_prompt,
        )

        return response.text

    except Exception as e:
        err_str = str(e).lower()

        if "429" in err_str or "quota" in err_str:
            raise QuotaExceededError(
                "Gemini API quota exceeded. Please wait a moment and try again."
            )

        if "401" in err_str or "403" in err_str:
            raise AuthError(
                "Invalid Gemini API key."
            )

        if "404" in err_str or "not found" in err_str:
            raise ModelError(
                "Gemini model not found."
            )

        raise GeminiError(str(e))


class GeminiError(Exception):
    pass


class QuotaExceededError(GeminiError):
    pass


class AuthError(GeminiError):
    pass


class ModelError(GeminiError):
    pass