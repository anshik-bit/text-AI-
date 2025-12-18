import React from 'react'
import { useLocation, Link } from 'react-router-dom'

export default function Result() {
  const { state } = useLocation()
  const extracted = state?.extracted || state?.text || ''
  const bullets = state?.bullets || []
  const summary = state?.summary || ''

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Results</h1>

      <section className="mb-6">
        <h2 className="font-semibold">Extracted Text</h2>
        <div className="mt-2 p-3 bg-white rounded shadow-sm whitespace-pre-wrap">{extracted}</div>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold">AI Notes (bullet points)</h2>
        <ul className="list-disc ml-6 mt-2">
          {bullets.length ? bullets.map((b, i) => <li key={i}>{b}</li>) : <li>(none)</li>}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold">Summary</h2>
        <div className="mt-2 p-3 bg-white rounded shadow-sm">{summary}</div>
      </section>

      <div className="flex gap-3">
        <Link to="/" className="text-sm text-gray-600">← Back</Link>
      </div>
    </div>
  )
}
