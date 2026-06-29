from utils.gemini_client import generate_response
from prompts.templates import LAW_AGENT_SYSTEM, LAW_AGENT_PROMPT


class LawAgent:
    def handle(self, question: str) -> str:
        prompt = LAW_AGENT_PROMPT.format(question=question)
        return generate_response(prompt, system_instruction=LAW_AGENT_SYSTEM)
