import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import HomePage from './pages/HomePage'
import AskAIPage from './pages/AskAIPage'
import GenerateDocPage from './pages/GenerateDocPage'
import LawSearchPage from './pages/LawSearchPage'
import AboutPage from './pages/AboutPage'
import SettingsPage from './pages/SettingsPage'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex flex-1">
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="flex-1 min-h-screen">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/ask" element={<AskAIPage />} />
              <Route path="/generate" element={<GenerateDocPage />} />
              <Route path="/search" element={<LawSearchPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}
