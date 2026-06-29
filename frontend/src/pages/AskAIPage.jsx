import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Trash2, Copy, Check, MessageSquare, User, Scale } from 'lucide-react'
import { askQuestion } from '../utils/api'
import { TypingIndicator } from '../components/LoadingSpinner'
import MarkdownRenderer from '../components/MarkdownRenderer'
import AgentBadge from '../components/AgentBadge'

const SUGGESTIONS = [
  "My employer hasn't paid my salary for 2 months.",
  "My landlord is not returning my security deposit.",
  "I received a defective product from an online store.",
  "My neighbour encroached on my land.",
  "How do I file a consumer complaint?",
  "What are my rights as an employee?",
]

export default function AskAIPage() {
  const location = useLocation()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [copiedId, setCopiedId] = useState(null)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (location.state?.question) {
      handleSend(location.state.question)
      window.history.replaceState({}, '')
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const handleSend = async (text) => {
    const question = text || input.trim()
    if (!question || loading) return
    setInput('')

    const userMsg = { id: Date.now(), role: 'user', content: question }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    try {
      const data = await askQuestion(question)
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: data.response,
        agent: "Gemini AI",
      }])
    } catch (err) {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: `⚠️ **${err.message}**`,
        agent: 'System',
        error: true,
      }])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const copyMessage = (id, content) => {
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const clearChat = () => setMessages([])

  return (
    <div className="flex flex-col h-[calc(100vh-73px)] max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="flex items-center justify-between py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <MessageSquare size={18} className="text-blue-400" />
          </div>
          <div>
            <h1 className="font-bold text-white text-sm">Ask Legal AI</h1>
            <p className="text-gray-500 text-xs">Multi-agent legal guidance</p>
          </div>
        </div>
        {messages.length > 0 && (
          <button
            onClick={clearChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-all border border-white/5"
          >
            <Trash2 size={13} />
            Clear Chat
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-6 space-y-6">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 flex items-center justify-center mx-auto mb-6">
              <Scale size={28} className="text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Ask Your Legal Question</h2>
            <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto">
              Describe your legal situation and our AI agents will explain your rights, applicable laws, and what to do next.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto text-left">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(s)}
                  className="glass-hover p-3 rounded-xl text-xs text-gray-400 hover:text-gray-200 text-left transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {messages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <Scale size={15} className="text-white" />
                  </div>
                )}

                <div className={`max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                  {msg.role === 'assistant' && <AgentBadge agent={msg.agent} />}
                  <div className={`rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-tr-sm'
                      : `glass border border-white/10 rounded-tl-sm ${msg.error ? 'border-red-500/20' : ''}`
                  }`}>
                    {msg.role === 'assistant'
                      ? <MarkdownRenderer content={msg.content} />
                      : <p className="text-sm leading-relaxed">{msg.content}</p>
                    }
                  </div>
                  {msg.role === 'assistant' && (
                    <button
                      onClick={() => copyMessage(msg.id, msg.content)}
                      className="mt-2 flex items-center gap-1 text-xs text-gray-600 hover:text-gray-400 transition-colors"
                    >
                      {copiedId === msg.id ? <Check size={11} className="text-green-400" /> : <Copy size={11} />}
                      {copiedId === msg.id ? 'Copied' : 'Copy'}
                    </button>
                  )}
                </div>

                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-gray-700 flex items-center justify-center flex-shrink-0 mt-1">
                    <User size={15} className="text-gray-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        )}

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3 items-start"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
              <Scale size={15} className="text-white" />
            </div>
            <div className="glass border border-white/10 rounded-2xl rounded-tl-sm">
              <TypingIndicator />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="py-4 border-t border-white/10">
        <div className="glass rounded-2xl border border-white/10 focus-within:border-blue-500/50 transition-all p-2">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder="Describe your legal situation..."
              disabled={loading}
              className="flex-1 bg-transparent px-4 py-2.5 text-gray-100 placeholder-gray-500 focus:outline-none text-sm disabled:opacity-50"
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className="btn-primary p-3 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
        <p className="text-center text-xs text-gray-700 mt-2">
          General legal information only — not professional legal advice.
        </p>
      </div>
    </div>
  )
}
