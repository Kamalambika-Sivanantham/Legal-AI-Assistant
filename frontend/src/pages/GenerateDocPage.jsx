import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Download, Copy, Check, ChevronDown, Loader, ArrowLeft } from 'lucide-react'
import { generateDocument, getDocumentTypes } from '../utils/api'
import MarkdownRenderer from '../components/MarkdownRenderer'

const DEFAULT_TYPES = [
  'Consumer Complaint', 'Police Complaint', 'Rental Agreement',
  'Legal Notice', 'RTI Application', 'Affidavit', 'Employment Agreement',
]

export default function GenerateDocPage() {
  const [docTypes, setDocTypes] = useState(DEFAULT_TYPES)
  const [form, setForm] = useState({
    type: DEFAULT_TYPES[0],
    name: '', address: '', contact: '', description: '', additional_details: '',
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    getDocumentTypes().then(types => setDocTypes(types)).catch(() => {})
  }, [])

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleGenerate = async () => {
    if (!form.name || !form.description) {
      setError('Please fill in your name and description of the issue.')
      return
    }
    setError('')
    setLoading(true)
    setResult(null)
    try {
      const data = await generateDocument(form)
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const copyDoc = () => {
    if (!result?.document) return
    navigator.clipboard.writeText(result.document)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadDoc = () => {
    if (!result?.document) return
    const blob = new Blob([result.document], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${form.type.replace(/\s+/g, '_')}_${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
          <FileText size={20} className="text-purple-400" />
        </div>
        <div>
          <h1 className="font-bold text-xl text-white">Generate Legal Document</h1>
          <p className="text-gray-500 text-sm">Create professional legal documents using AI</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="glass rounded-2xl border border-white/10 p-6 md:p-8">
              {/* Document type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Document Type</label>
                <div className="relative">
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="input-field appearance-none pr-10 cursor-pointer"
                  >
                    {docTypes.map(t => <option key={t} value={t} className="bg-gray-900">{t}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* Personal details */}
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full legal name"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Contact Number</label>
                  <input
                    name="contact"
                    value={form.contact}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="input-field"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">Address *</label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Your complete address"
                  className="input-field"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description of Issue / Matter *
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe the situation, parties involved, dates, amounts, and key facts..."
                  className="input-field resize-none"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Additional Details <span className="text-gray-600">(optional)</span>
                </label>
                <textarea
                  name="additional_details"
                  value={form.additional_details}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Any other relevant information, relief sought, witnesses, etc."
                  className="input-field resize-none"
                />
              </div>

              {error && (
                <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <><Loader size={18} className="animate-spin" /> Generating Document...</>
                ) : (
                  <><FileText size={18} /> Generate {form.type}</>
                )}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Result header */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setResult(null)}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-200 transition-colors"
              >
                <ArrowLeft size={16} /> Back to Form
              </button>
              <div className="flex gap-2">
                <button
                  onClick={copyDoc}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm glass-hover border border-white/10"
                >
                  {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={downloadDoc}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm btn-primary"
                >
                  <Download size={14} /> Download
                </button>
              </div>
            </div>

            {/* Document preview */}
            <div className="glass rounded-2xl border border-white/10 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
                <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                <span className="text-purple-300 text-sm font-semibold">Generated {result.document_type}</span>
              </div>
              <div className="prose max-w-none">
                <MarkdownRenderer content={result.document} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
