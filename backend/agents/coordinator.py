from utils.gemini_client import generate_response
from prompts.templates import COORDINATOR_SYSTEM
from agents.law_agent import LawAgent
from agents.document_agent import DocumentAgent


class CoordinatorAgent:
    def __init__(self):
        self.law_agent = LawAgent()
        self.document_agent = DocumentAgent()

    def route(self, question: str) -> dict:
        prompt = f"{COORDINATOR_SYSTEM}\n\nUser query: {question}\n\nRespond with only 'law_agent' or 'document_agent'."
        routing_decision = generate_response(prompt).strip().lower()

        if "document" in routing_decision:
            return {
                "agent": "Document Agent",
                "routing": "document_agent",
                "answer": self.document_agent.handle(question)
            }
        else:
            return {
                "agent": "Law Agent",
                "routing": "law_agent",
                "answer": self.law_agent.handle(question)
            }
