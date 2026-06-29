# ⚖️ Legal AI Assistant

> A production-ready multi-agent AI platform that helps ordinary citizens understand legal procedures in plain English — powered by Google Gemini.

![Legal AI Assistant](https://img.shields.io/badge/AI-Google%20Gemini-blue?style=flat-square)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-green?style=flat-square)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?style=flat-square)

---

## 🎯 Overview

Legal AI Assistant is a hackathon-ready prototype demonstrating a **Multi-Agent AI Architecture** for legal guidance. It uses three specialized AI agents — all powered by Google Gemini — to route, answer, and generate legal documents for users.

---

## ✨ Features

- 🤖 **Multi-Agent System** — Coordinator, Law Search, and Document Generator agents
- ⚖️ **Legal Q&A** — Ask any legal question; get laws, rights, procedures, and next steps
- 📄 **Document Generation** — Create 7+ types of legal documents (complaints, RTI, affidavits, etc.)
- 💬 **Chat Interface** — Conversational UI with history, copy, and clear functions
- 🔍 **Law Search** — Browse by legal category or search freely
- 🌑 **Dark Mode** — Glassmorphism design with blue/purple gradients
- 📱 **Responsive** — Works on mobile, tablet, and desktop

---

## 🏗️ Architecture

```
User Request
     │
     ▼
Coordinator Agent  ──── routes based on intent
     │
     ├──── Law Search Agent    ──── Explains laws, rights, procedures
     │
     └──── Document Agent      ──── Generates legal documents
     │
     ▼
  Response (via Gemini API)
```

---

## 🛠️ Technology Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 18, Vite, Tailwind CSS, Framer Motion |
| Backend   | Python, FastAPI, Uvicorn            |
| AI        | Google Gemini 1.5 Flash             |
| Icons     | Lucide React                        |
| Routing   | React Router v6                     |

---

## 📁 Project Structure

```
Legal-AI-Assistant/
├── frontend/
│   ├── src/
│   │   ├── components/     # Navbar, Sidebar, MarkdownRenderer, etc.
│   │   ├── pages/          # HomePage, AskAIPage, GenerateDocPage, etc.
│   │   └── utils/          # API client (axios)
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── agents/
│   │   ├── coordinator.py  # Routes queries to correct agent
│   │   ├── law_agent.py    # Handles legal Q&A
│   │   └── document_agent.py # Generates legal documents
│   ├── routes/
│   │   └── legal_routes.py # FastAPI route handlers
│   ├── prompts/
│   │   └── templates.py    # Gemini prompt templates
│   ├── utils/
│   │   └── gemini_client.py # Gemini API wrapper
│   ├── main.py
│   ├── requirements.txt
│   └── .env.example
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- Google Gemini API Key ([Get one free](https://aistudio.google.com/))

### Backend Setup

```bash
cd Legal-AI-Assistant/backend

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY

# Run the server
uvicorn main:app --reload --port 8000
```

Backend will be available at: `http://localhost:8000`

### Frontend Setup

```bash
cd Legal-AI-Assistant/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be available at: `http://localhost:5173`

---

## 🔑 Environment Variables

Create `backend/.env` from `.env.example`:

```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```

---

## 📡 API Endpoints

| Method | Endpoint           | Description                     |
|--------|--------------------|---------------------------------|
| GET    | `/`                | Health check                    |
| POST   | `/ask`             | Ask a legal question (routed)   |
| POST   | `/generate-document` | Generate a legal document     |
| GET    | `/document-types`  | List supported document types   |

### POST `/ask` Example

```json
// Request
{ "question": "My employer didn't pay salary." }

// Response
{
  "agent": "Law Agent",
  "routing": "law_agent",
  "answer": "## Applicable Laws\n..."
}
```

### POST `/generate-document` Example

```json
// Request
{
  "type": "Consumer Complaint",
  "name": "John Doe",
  "address": "123 Main St, City",
  "contact": "+91 9999999999",
  "description": "Received defective laptop from XYZ store.",
  "additional_details": "Purchase date: Jan 1, 2024"
}
```

---

## 📄 Supported Document Types

- Consumer Complaint
- Police Complaint
- Rental Agreement
- Legal Notice
- RTI Application
- Affidavit
- Employment Agreement

---

## 🔮 Future Scope

- [ ] Google ADK integration for advanced agent orchestration
- [ ] PDF export with proper formatting
- [ ] User authentication and document history
- [ ] Multi-language support (Hindi, Tamil, etc.)
- [ ] Lawyer directory integration
- [ ] Voice input support
- [ ] WhatsApp bot interface

---

## ⚠️ Disclaimer

This application provides **general legal information for educational purposes only**. It is **not** a substitute for professional legal advice. Always consult a qualified lawyer for matters specific to your situation.

---

## 📸 Screenshots

> _Run the app locally and take screenshots for your hackathon presentation!_

---

## 📜 License

MIT License — Free to use, modify, and distribute.

---

Built with ❤️ using Google Gemini AI
