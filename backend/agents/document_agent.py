from utils.gemini_client import generate_response
from prompts.templates import DOCUMENT_AGENT_SYSTEM, DOCUMENT_AGENT_PROMPT


class DocumentAgent:
    SUPPORTED_DOCUMENTS = [
        "Consumer Complaint",
        "Police Complaint",
        "Rental Agreement",
        "Legal Notice",
        "RTI Application",
        "Affidavit",
        "Employment Agreement",
    ]

    def handle(self, question: str) -> str:
        """Handle a freeform generation request."""
        prompt = f"{DOCUMENT_AGENT_SYSTEM}\n\nUser Request: {question}\n\nGenerate an appropriate legal document based on this request. Infer the document type and required structure."
        return generate_response(prompt)

    def generate(
        self,
        doc_type: str,
        name: str,
        address: str,
        contact: str,
        description: str,
        additional_details: str = "",
    ) -> str:
        prompt = DOCUMENT_AGENT_PROMPT.format(
            doc_type=doc_type,
            name=name,
            address=address,
            contact=contact,
            description=description,
            additional_details=additional_details or "N/A",
        )
        return generate_response(prompt, system_instruction=DOCUMENT_AGENT_SYSTEM)
