Frontend (React + Vite)

Run the frontend dev server from the `frontend` folder.

Install dependencies:

```powershell
cd frontend
npm install
npm run dev
```

Notes:
- The frontend expects a backend endpoint at `/api/gemini/process` that accepts multipart/form-data with either `file` or `text` and returns JSON: `{ extracted: 'text', bullets: ['...'], summary: '...' }`.
- For local dev you can configure a Vite proxy in `vite.config.js` to forward `/api` to your backend.
