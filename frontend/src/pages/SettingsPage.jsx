import React, { useState } from 'react'
import { Settings, Server, CheckCircle, XCircle, Loader } from 'lucide-react'
import axios from 'axios'

export default function SettingsPage() {
  const [backendUrl, setBackendUrl] = useState('http://localhost:8000')
  const [status, setStatus] = useState(null)
  const [testing, setTesting] = useState(false)

  const testConnection = async () => {
    setTesting(true)
    setStatus(null)
    try {
      await axios.get(`${backendUrl}/`, { timeout: 5000 })
      setStatus('connected')
    } catch {
      setStatus('failed')
    } finally {
      setTesting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gray-500/10 border border-gray-500/20 flex items-center justify-center">
          <Settings size={20} className="text-gray-400" />
        </div>
        <div>
          <h1 className="font-bold text-xl text-white">Settings</h1>
          <p className="text-gray-500 text-sm">Configure your Legal AI Assistant</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="glass rounded-2xl border border-white/10 p-6">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
            <Server size={16} className="text-blue-400" /> Backend Configuration
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Backend API URL</label>
              <input
                type="text"
                value={backendUrl}
                onChange={e => setBackendUrl(e.target.value)}
                className="input-field"
                placeholder="http://localhost:8000"
              />
              <p className="text-xs text-gray-600 mt-1">Default: http://localhost:8000 (proxied via /api in dev)</p>
            </div>

            <button
              onClick={testConnection}
              disabled={testing}
              className="btn-secondary flex items-center gap-2 text-sm py-2.5 px-5"
            >
              {testing ? <Loader size={14} className="animate-spin" /> : <Server size={14} />}
              Test Connection
            </button>

            {status === 'connected' && (
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <CheckCircle size={16} />
                Backend connected successfully!
              </div>
            )}
            {status === 'failed' && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <XCircle size={16} />
                Could not connect. Is the backend running?
              </div>
            )}
          </div>
        </div>

        <div className="glass rounded-2xl border border-white/10 p-6">
          <h3 className="font-semibold text-white mb-4">Quick Setup Guide</h3>
          <div className="space-y-3 text-sm text-gray-400">
            {[
              'cd Legal-AI-Assistant/backend',
              'pip install -r requirements.txt',
              'cp .env.example .env  # Add your GEMINI_API_KEY',
              'uvicorn main:app --reload',
            ].map((cmd, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-blue-500 font-mono text-xs w-4">{i + 1}.</span>
                <code className="font-mono text-xs bg-white/5 px-3 py-1.5 rounded-lg text-gray-300 flex-1">{cmd}</code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
