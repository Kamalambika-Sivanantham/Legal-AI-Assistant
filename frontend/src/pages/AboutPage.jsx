import React from 'react'
import { Scale, Bot, FileText, Zap, Shield, Github } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/30">
          <Scale size={28} className="text-white" />
        </div>
        <h1 className="text-3xl font-extrabold gradient-text mb-3">Legal AI Assistant</h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          An open-source multi-agent AI platform helping ordinary citizens navigate the legal system with confidence — no jargon, no confusion.
        </p>
      </div>

      <div className="space-y-6">
        {[
          {
            icon: Bot,
            title: 'Coordinator Agent',
            desc: 'Receives every query and intelligently routes it to the most appropriate specialist agent.',
            color: 'text-amber-400',
            bg: 'bg-amber-500/10',
            border: 'border-amber-500/20',
          },
          {
            icon: Scale,
            title: 'Law Search Agent',
            desc: 'Explains applicable laws, user rights, legal procedures, required documents, and next steps in plain English.',
            color: 'text-blue-400',
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/20',
          },
          {
            icon: FileText,
            title: 'Document Generator Agent',
            desc: 'Creates professional legal documents including consumer complaints, RTI applications, affidavits, and more.',
            color: 'text-purple-400',
            bg: 'bg-purple-500/10',
            border: 'border-purple-500/20',
          },
        ].map((item, i) => (
          <div key={i} className={`glass rounded-2xl border ${item.border} p-6 flex gap-4`}>
            <div className={`w-12 h-12 rounded-xl ${item.bg} border ${item.border} flex items-center justify-center flex-shrink-0`}>
              <item.icon size={22} className={item.color} />
            </div>
            <div>
              <h3 className="font-bold text-white mb-1">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}

        <div className="glass rounded-2xl border border-white/10 p-6">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <Zap size={18} className="text-yellow-400" /> Technology Stack
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {['React + Vite', 'Tailwind CSS', 'Framer Motion', 'FastAPI', 'Google Gemini AI', 'Python'].map(t => (
              <div key={t} className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-400 font-medium">
                {t}
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
          <div className="flex gap-3">
            <Shield size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-red-300 mb-1">Important Disclaimer</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Legal AI Assistant provides general legal information for educational purposes only. It is not a substitute for professional legal advice. Always consult a qualified lawyer for matters specific to your situation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
