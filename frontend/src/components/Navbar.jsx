import React from 'react'
import { Link } from 'react-router-dom'
import { Scale, Menu, Sparkles } from 'lucide-react'

export default function Navbar({ onMenuClick }) {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/10 px-4 md:px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <Menu size={20} className="text-gray-300" />
          </button>
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Scale size={18} className="text-white" />
            </div>
            <span className="font-bold text-lg gradient-text hidden sm:block">Legal AI</span>
            <span className="font-bold text-lg text-gray-100 hidden sm:block">Assistant</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-1">
          <NavLink to="/ask">Ask AI</NavLink>
          <NavLink to="/generate">Generate Doc</NavLink>
          <NavLink to="/search">Law Search</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-green-400 text-xs font-medium hidden sm:block">AI Online</span>
          </div>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-white/10 flex items-center justify-center">
            <Sparkles size={14} className="text-purple-400" />
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-gray-100 hover:bg-white/10 transition-all duration-200 font-medium"
    >
      {children}
    </Link>
  )
}
