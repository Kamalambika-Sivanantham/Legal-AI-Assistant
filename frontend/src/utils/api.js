import axios from 'axios'

const api = axios.create({
  baseURL: 'https://legal-ai-assistant-mpyo.onrender.com',
  timeout: 60000,
  headers: { 'Content-Type': 'application/json' },
})


/**
 * Response interceptor — extract a human-readable error message from every
 * failed response so callers don't have to dig into error.response themselves.
 *
 * The backend returns:  { "success": false, "error": "..." }
 * FastAPI validation returns: { "detail": [...] }
 * FastAPI HTTPException returns: { "detail": "..." }
 *
 * We normalise all of these into a plain Error with a .message the UI can show.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = 'An unexpected error occurred. Please try again.'

    if (error.response) {
      const data = error.response.data
      const status = error.response.status

      if (data?.error) {
        // Our structured backend error: { success: false, error: "..." }
        message = data.error
      } else if (typeof data?.detail === 'string') {
        // FastAPI HTTPException
        message = data.detail
      } else if (Array.isArray(data?.detail)) {
        // FastAPI validation error
        message = data.detail.map(d => d.msg).join(', ')
      } else if (status === 429) {
        message = 'Gemini API quota exceeded. Please wait a moment and try again.'
      } else if (status === 401) {
        message = 'Invalid or missing Gemini API key. Please check your .env file.'
      } else if (status === 503) {
        message = 'Gemini model unavailable. Please check the model name in your config.'
      } else if (status === 500) {
        message = 'Internal server error. Check the backend console for details.'
      } else if (status === 0 || !error.response) {
        message = 'Cannot reach the backend. Is it running on port 8000?'
      }
    } else if (error.request) {
      // Request was made but no response received
      message = 'Cannot reach the backend. Is it running on port 8000?'
    }

    // Attach the clean message so callers can just use err.message
    error.message = message
    return Promise.reject(error)
  }
)

export const askQuestion = async (question) => {
  const res = await api.post('/chat', {
    prompt: question
  });

  return res.data;
};

export const generateDocument = async (payload) => {
  const res = await api.post('/generate-document', payload)
  return res.data
}

export const getDocumentTypes = async () => {
  const res = await api.get('/document-types')
  return res.data.types
}

export default api
