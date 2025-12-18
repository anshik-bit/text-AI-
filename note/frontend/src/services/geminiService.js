import api from './api'

const GeminiService = {
  // processNotes expects a FormData with either 'file' or 'text'
  // This will call a backend endpoint which should forward the file/text to Gemini Vision API
  processNotes(formData) {
    // example endpoint: /api/gemini/process
    return api.post('/api/gemini/process', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
}

export default GeminiService
