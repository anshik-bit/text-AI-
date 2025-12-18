 # NoteSnap AI

A simple, clean Streamlit app called NoteSnap AI that converts raw meeting notes into shareable notes. It uses OpenAI if you provide an API key, and falls back to a lightweight local summarizer otherwise. The app supports uploading TXT/MD/PDF (PDF text extraction via pypdf) and exporting results to PDF.

## Setup (Windows PowerShell)

1. Create a virtual environment (recommended):

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

2. Install dependencies:

```powershell
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

3. (Optional) Set your OpenAI API key for better results (or paste it in the app sidebar):

```powershell
$env:OPENAI_API_KEY = "sk-..."
```

4. Run the app:

```powershell
streamlit run app.py
```

## UI Overview

- Home page title: `NoteSnap AI`.
- Upload card supports drag & drop (or browse) for `.txt`, `.md`, `.pdf` files.
- Paste or edit extracted text directly.
- Sidebar: OpenAI API key, style and length options, fallback bullet count.
- Button: `Generate Notes`.
- Result view: Extracted Text section, AI Notes (bullet points), Summary, and `Download PDF` button.

## Files

- `app.py` – main Streamlit app and summarizer
- `sample_notes.txt` – example notes to try
- `requirements.txt` – Python dependencies (includes pypdf and fpdf for PDF support)

## Next steps / improvements

- Add unit tests for the local summarizer (pytest).
- Improve PDF layout and long-text handling.
- Add export to Markdown or DOCX.