import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Result from './pages/Result'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <nav className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold">NoteSnap AI</Link>
          <div className="text-sm text-gray-500">React + Tailwind frontend</div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </main>

      <footer className="py-6">
        <div className="max-w-4xl mx-auto text-center text-gray-500">Made with ❤️ — NoteSnap AI</div>
      </footer>
    </div>
  )
}
