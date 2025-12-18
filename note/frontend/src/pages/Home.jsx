import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UploadCard from '../components/UploadCard'
import geminiService from '../services/geminiService'

export default function Home() {
  const [file, setFile] = useState(null)
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleGenerate() {
    if (!file && !text) return alert('Upload a file or paste text')
    setLoading(true)
    try {
      const form = new FormData()
      if (file) form.append('file', file)
      form.append('text', text)

      const res = await geminiService.processNotes(form)
      const payload = res.data || res
      navigate('/result', { state: payload })
    } catch (err) {
      console.error(err)
      alert('Failed to generate notes. See console for details.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4 text-center">NoteSnap AI</h1>
        <p className="text-gray-600 text-center mb-6">
          Upload a file or paste your notes below to generate concise notes and a summary.
        </p>

        <UploadCard onFileChange={setFile} onTextChange={setText} />

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleGenerate}
            className={`bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-blue-600 hover:to-blue-800 transition-all duration-150 ${
              loading ? 'opacity-60 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? (
              <span>
                <svg className="inline w-5 h-5 mr-2 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Generating…
              </span>
            ) : (
              'Generate Notes'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
