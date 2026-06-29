import React from 'react'

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="typing-dot w-2 h-2 rounded-full bg-blue-400"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  )
}

export default function LoadingSpinner({ text = 'Processing...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-white/10"></div>
        <div className="absolute inset-0 rounded-full border-2 border-t-blue-500 border-r-purple-500 animate-spin"></div>
      </div>
      <p className="text-gray-400 text-sm animate-pulse">{text}</p>
    </div>
  )
}
