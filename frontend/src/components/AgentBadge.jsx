import React from 'react'
import { Scale, FileText, Bot } from 'lucide-react'

export default function AgentBadge({ agent }) {
  const isDocAgent = agent?.toLowerCase().includes('document')
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
        isDocAgent
          ? 'bg-purple-500/10 border-purple-500/30 text-purple-300'
          : 'bg-blue-500/10 border-blue-500/30 text-blue-300'
      }`}>
        {isDocAgent ? <FileText size={11} /> : <Scale size={11} />}
        {agent || 'AI Agent'}
      </div>
      <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-green-500/10 border border-green-500/20 text-green-400">
        <Bot size={11} />
        Gemini AI
      </div>
    </div>
  )
}
