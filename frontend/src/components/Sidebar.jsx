import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, MessageSquare, FileText, Search, Info, Settings, X, Scale, ChevronRight } from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: MessageSquare, label: 'Ask AI', path: '/ask' },
  { icon: FileText, label: 'Generate Document', path: '/generate' },
  { icon: Search, label: 'Law Search', path: '/search' },
  { icon: Info, label: 'About', path: '/about' },
  { icon: Settings, label: 'Settings', path: '/settings' },
]

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky top-0 md:top-[73px] left-0 h-full md:h-[calc(100vh-73px)]
          w-64 z-50 md:z-auto
          glass border-r border-white/10
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Mobile header */}
        <div className="flex items-center justify-between p-4 md:hidden border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Scale size={16} className="text-white" />
            </div>
            <span className="font-bold gradient-text">Legal AI</span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10">
            <X size={18} className="text-gray-400" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider px-4 mb-3">Navigation</p>
          {navItems.map(({ icon: Icon, label, path }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                `sidebar-item group ${isActive ? 'active' : ''}`
              }
            >
              <Icon size={18} />
              <span className="flex-1 text-sm font-medium">{label}</span>
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </NavLink>
          ))}
        </nav>

        {/* Footer card */}
        <div className="p-4 border-t border-white/10">
          <div className="p-3 rounded-xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-white/10">
            <p className="text-xs text-gray-400 mb-1">Powered by</p>
            <p className="text-sm font-semibold text-gray-200">Google Gemini AI</p>
            <p className="text-xs text-blue-400 mt-1">Multi-Agent Architecture</p>
          </div>
        </div>
      </aside>
    </>
  )
}
