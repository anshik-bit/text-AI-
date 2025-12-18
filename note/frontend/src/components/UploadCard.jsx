import React from 'react'

export default function UploadCard({ onFileChange, onTextChange }) {
  function handleFile(e) {
    const f = e.target.files?.[0]
    onFileChange && onFileChange(f)
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <label className="block mb-6">
        <div className="text-sm font-medium text-gray-700 mb-2">Upload a file</div>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 hover:bg-blue-50 transition">
          <input
            type="file"
            onChange={handleFile}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer text-blue-600 font-medium hover:underline"
          >
            Click to browse
          </label>
          <div className="text-sm text-gray-500 mt-2">Supported formats: .txt, .pdf, .md</div>
        </div>
      </label>

      <div className="relative">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Or paste your notes
        </label>
        <textarea
          onChange={(e) => onTextChange && onTextChange(e.target.value)}
          placeholder="Paste raw notes here..."
          className="w-full min-h-[140px] p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
    </div>
  )
}import React from 'react'

export default function UploadCard({ onFileChange, onTextChange }) {
  function handleFile(e) {
    const f = e.target.files?.[0]
    onFileChange && onFileChange(f)
  }

  return (
    <div className="p-6 bg-white rounded shadow-sm">
      <label className="block mb-4">
        <div className="text-sm text-gray-600 mb-2">Upload file</div>
        <div className="border-2 border-dashed border-gray-200 rounded p-6 text-center">
          <input type="file" onChange={handleFile} className="block mx-auto" />
          <div className="text-sm text-gray-400 mt-2">Drag & drop or click to browse</div>
        </div>
      </label>

      <label className="block">
        <div className="text-sm text-gray-600 mb-2">Or paste notes</div>
        <textarea
          onChange={(e) => onTextChange && onTextChange(e.target.value)}
          placeholder="Paste raw notes here"
          className="w-full min-h-[140px] p-3 border rounded"
        />
      </label>
    </div>
  )
}
