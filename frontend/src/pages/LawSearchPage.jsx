import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Scale, Loader } from 'lucide-react'
import { askQuestion } from '../utils/api'
import MarkdownRenderer from '../components/MarkdownRenderer'
import AgentBadge from '../components/AgentBadge'

const CATEGORIES = [
  { label: 'Employment', queries: ['Salary not paid', 'Wrongful termination', 'Workplace harassment'] },
  { label: 'Consumer', queries: ['Defective product', 'Online fraud', 'Service deficiency'] },
  { label: 'Property', queries: ['Land encroachment', 'Tenant-landlord dispute', 'Property dispute'] },
  { label: 'Family', queries: ['Domestic violence', 'Divorce rights', 'Child custody'] },
]

export default function LawSearchPage() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (q) => {
    const question = q || query.trim()
    if (!question) return
    setLoading(true)
    setResult(null)
    setError('')
    try {
      const data = await askQuestion(question)
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
          <Search size={20} className="text-green-400" />
        </div>
        <div>
          <h1 className="font-bold text-xl text-white">Law Search</h1>
          <p className="text-gray-500 text-sm">Search Indian laws and your legal rights</p>
        </div>
      </div>

      {/* Search bar */}
      <div className="glass rounded-2xl border border-white/10 p-2 mb-6 focus-within:border-blue-500/50 transition-all">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder="Search laws, rights, legal procedures..."
            className="flex-1 bg-transparent px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none"
          />
          <button
            onClick={() => handleSearch()}
            disabled={loading || !query.trim()}
            className="btn-primary px-5 py-3 disabled:opacity-40 flex items-center gap-2"
          >
            {loading ? <Loader size={16} className="animate-spin" /> : <Search size={16} />}
            Search
          </button>
        </div>
      </div>

      {/* Quick categories */}
      {!result && !loading && (
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {CATEGORIES.map((cat, i) => (
            <div key={i} className="glass rounded-xl border border-white/10 p-4">
              <h3 className="font-semibold text-gray-300 text-sm mb-3">{cat.label} Law</h3>
              <div className="space-y-2">
                {cat.queries.map((q, j) => (
                  <button
                    key={j}
                    onClick={() => { setQuery(q); handleSearch(q) }}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs text-gray-400 hover:text-gray-200 hover:bg-white/10 transition-all flex items-center gap-2"
                  >
                    <Scale size={11} className="text-blue-400 flex-shrink-0" />
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="glass rounded-2xl border border-white/10 p-12 text-center">
          <Loader size={32} className="animate-spin text-blue-400 mx-auto mb-4" />
          <p className="text-gray-400">Searching legal database...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl border border-white/10 p-6 md:p-8"
        >
          <AgentBadge agent={result.agent} />
          <MarkdownRenderer content={result.response} />
          <div className="mt-6 pt-4 border-t border-white/10 flex gap-3">
            <button
              onClick={() => { setResult(null); setQuery('') }}
              className="btn-secondary text-sm py-2 px-4"
            >
              New Search
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
