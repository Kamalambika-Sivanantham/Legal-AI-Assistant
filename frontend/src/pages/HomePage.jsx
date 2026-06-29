import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Scale, MessageSquare, FileText, Search, ArrowRight,
  Shield, Zap, Users, CheckCircle, ChevronRight, Sparkles
} from 'lucide-react'

const features = [
  {
    icon: Scale,
    title: 'Law Search Agent',
    description: 'Explain applicable laws, your rights, legal procedures, and next steps in plain English.',
    color: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  {
    icon: FileText,
    title: 'Document Generator Agent',
    description: 'Create consumer complaints, police complaints, RTI applications, legal notices, and more.',
    color: 'from-purple-500 to-pink-500',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
  },
  {
    icon: Zap,
    title: 'Coordinator Agent',
    description: 'Intelligently routes your query to the best agent for an accurate, relevant response.',
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
]

const steps = [
  { num: '01', title: 'Describe Your Situation', desc: 'Tell the AI about your legal problem in plain language.' },
  { num: '02', title: 'AI Routes Your Query', desc: 'The Coordinator Agent picks the right specialist agent.' },
  { num: '03', title: 'Get Detailed Guidance', desc: 'Receive laws, rights, procedures, and next steps.' },
  { num: '04', title: 'Generate Documents', desc: 'Create ready-to-use legal documents instantly.' },
]

const examples = [
  "My employer didn't pay my salary.",
  "Landlord won't return my security deposit.",
  "I received a defective product.",
  "Generate a consumer complaint letter.",
  "My neighbour encroached my land.",
  "Create an RTI application.",
]

export default function HomePage() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (q) => {
    const question = q || query
    if (!question.trim()) return
    navigate('/ask', { state: { question } })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 py-20 md:py-32 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-blue-600/10 to-purple-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-sm text-gray-400 mb-8">
              <Sparkles size={14} className="text-purple-400" />
              Powered by Google Gemini Multi-Agent AI
              <ChevronRight size={14} />
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
              Understand Laws.{' '}
              <span className="gradient-text">Generate Legal</span>{' '}
              Documents. Get AI Legal Guidance.
            </h1>

            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Legal AI Assistant makes complex legal procedures simple. Ask any legal question and get clear, actionable guidance — no jargon, no confusion.
            </p>

            {/* Search Box */}
            <div className="max-w-2xl mx-auto mb-6">
              <div className="glass p-2 rounded-2xl border border-white/10 focus-within:border-blue-500/50 transition-all duration-300">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSearch()}
                    placeholder="Describe your legal situation or question..."
                    className="flex-1 bg-transparent px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none text-sm md:text-base"
                  />
                  <button
                    onClick={() => handleSearch()}
                    className="btn-primary flex items-center gap-2 whitespace-nowrap"
                  >
                    Ask AI <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => navigate('/ask')}
                className="btn-primary flex items-center gap-2"
              >
                <MessageSquare size={16} />
                Ask Legal Question
              </button>
              <button
                onClick={() => navigate('/generate')}
                className="btn-secondary flex items-center gap-2"
              >
                <FileText size={16} />
                Generate Legal Document
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick examples */}
      <section className="px-4 pb-16 max-w-5xl mx-auto">
        <p className="text-center text-xs text-gray-600 uppercase tracking-wider mb-4 font-semibold">Try an example</p>
        <div className="flex flex-wrap justify-center gap-2">
          {examples.map((ex, i) => (
            <button
              key={i}
              onClick={() => handleSearch(ex)}
              className="px-3 py-1.5 rounded-full text-xs glass-hover text-gray-400 hover:text-gray-200 border border-white/10 transition-all"
            >
              {ex}
            </button>
          ))}
        </div>
      </section>

      {/* Agent Cards */}
      <section className="px-4 pb-20 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Multi-Agent Architecture</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Three specialized AI agents work together to answer your legal questions and create documents.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.2 }}
              className={`glass-hover p-6 border ${f.border}`}
            >
              <div className={`w-12 h-12 rounded-xl ${f.bg} border ${f.border} flex items-center justify-center mb-4`}>
                <div className={`bg-gradient-to-br ${f.color} bg-clip-text`}>
                  <f.icon size={22} className={`text-white opacity-90`} />
                </div>
              </div>
              <h3 className="font-bold text-white mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 pb-20 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">How It Works</h2>
          <p className="text-gray-400">From question to guidance in seconds</p>
        </div>
        <div className="grid md:grid-cols-4 gap-6 relative">
          {steps.map((s, i) => (
            <div key={i} className="relative text-center">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-full h-px bg-gradient-to-r from-blue-500/30 to-transparent" />
              )}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold gradient-text">{s.num}</span>
              </div>
              <h3 className="font-semibold text-white text-sm mb-2">{s.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 pb-20 max-w-5xl mx-auto">
        <div className="glass rounded-2xl border border-white/10 p-8 md:p-12 text-center bg-gradient-to-r from-blue-600/5 to-purple-600/5">
          <div className="grid grid-cols-3 gap-8">
            {[
              { val: '7+', label: 'Document Types' },
              { val: '3', label: 'AI Agents' },
              { val: '∞', label: 'Legal Questions' },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-3xl md:text-4xl font-extrabold gradient-text">{s.val}</div>
                <div className="text-gray-500 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-4 py-8 text-center text-gray-600 text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Scale size={16} className="text-blue-500" />
          <span className="font-semibold text-gray-400">Legal AI Assistant</span>
        </div>
        <p>For educational purposes only. Not a substitute for professional legal advice.</p>
        <p className="mt-1">© 2024 Legal AI Assistant. Built with Google Gemini.</p>
      </footer>
    </div>
  )
}
