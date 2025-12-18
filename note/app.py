import io
import os
import re
import heapq
import streamlit as st
from collections import Counter

try:
    from pypdf import PdfReader
except Exception:
    PdfReader = None

import io
import os
import re
import heapq
import streamlit as st
from collections import Counter

try:
    from pypdf import PdfReader
except Exception:
    PdfReader = None

try:
    from fpdf import FPDF
except Exception:
    FPDF = None

try:
    import openai
except Exception:
    openai = None


def extract_text_from_pdf(uploaded_file) -> str:
    if PdfReader is None:
        return ""
    try:
        reader = PdfReader(uploaded_file)
        texts = []
        for p in reader.pages:
            t = p.extract_text()
            if t:
                texts.append(t)
        return "\n\n".join(texts)
    except Exception:
        return ""


def local_summarize(text: str, max_sentences: int = 5) -> str:
    if not text or not text.strip():
        return ""
    sentences = re.split(r'(?<=[.!?])\s+', text.strip())
    if len(sentences) <= max_sentences:
        return "\n\n".join(sentences)

    words = re.findall(r"\w+", text.lower())
    stopwords = {
        'the', 'and', 'is', 'in', 'to', 'a', 'of', 'for', 'on', 'that', 'with', 'as', 'are', 'it', 'this', 'by',
        'we', 'you', 'be', 'have', 'or', 'not', 'at', 'from', 'an', 'was', 'but'
    }
    words = [w for w in words if w not in stopwords]
    freq = Counter(words)

    scored = []
    for i, s in enumerate(sentences):
        s_words = re.findall(r"\w+", s.lower())
        score = sum(freq.get(w, 0) for w in s_words)
        scored.append((score, i, s))

    topk = heapq.nlargest(max_sentences, scored, key=lambda x: x[0])
    topk_sorted = sorted(topk, key=lambda x: x[1])
    return "\n\n".join(s for (_, _, s) in topk_sorted)


def local_bullets(text: str, max_items: int = 6) -> list:
    summary = local_summarize(text, max_items)
    bullets = [s.strip() for s in re.split(r'(?<=[.!?])\s+', summary) if s.strip()]
    return bullets


def create_pdf_bytes(title: str, extracted: str, bullets: list, summary: str) -> bytes:
    if FPDF is None:
        raise RuntimeError('FPDF not installed')
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    pdf.set_font('Arial', 'B', 18)
    pdf.cell(0, 10, title, ln=True)
    pdf.ln(4)

    pdf.set_font('Arial', '', 11)
    pdf.multi_cell(0, 7, 'Extracted Text:')
    pdf.set_font('Arial', '', 10)
    pdf.multi_cell(0, 6, extracted[:4000] or '(no extracted text)')
    pdf.ln(4)

    pdf.set_font('Arial', 'B', 12)
    pdf.cell(0, 6, 'AI Notes:', ln=True)
    pdf.set_font('Arial', '', 10)
    for b in bullets:
        pdf.multi_cell(0, 6, f'• {b}')
    pdf.ln(3)

    pdf.set_font('Arial', 'B', 12)
    pdf.cell(0, 6, 'Summary:', ln=True)
    pdf.set_font('Arial', '', 10)
    pdf.multi_cell(0, 6, summary or '(no summary)')

    s = pdf.output(dest='S').encode('latin-1')
    return s


def main():
    st.set_page_config(page_title='NoteSnap AI', layout='centered')
    st.title('NoteSnap AI')

    st.markdown("""
    A simple, clean note generator — upload or paste raw notes, then generate cleaned notes and a short summary.
    """)

    # Upload card
    uploaded = st.file_uploader('Upload notes (drag & drop or browse)', type=['txt', 'md', 'pdf'], accept_multiple_files=False)
    extracted_text = ''
    if uploaded is not None:
        fname = uploaded.name.lower()
        if fname.endswith('.pdf'):
            extracted_text = extract_text_from_pdf(uploaded)
        else:
            try:
                extracted_text = uploaded.getvalue().decode('utf-8')
            except Exception:
                extracted_text = uploaded.getvalue().decode('latin-1', errors='ignore')

    # Also allow pasting
    extracted_text = st.text_area('Extracted Text', value=extracted_text, height=220)

    st.sidebar.header('Settings')
    api_key = st.sidebar.text_input('OpenAI API key (optional)', type='password')
    style = st.sidebar.selectbox('Style', ['Concise', 'Detailed', 'Bullet points', 'Action items'])
    length = st.sidebar.selectbox('Length', ['short', 'medium', 'long'])
    max_items = st.sidebar.slider('Fallback: max bullet items', 1, 12, 6)

    # Footer text
    st.markdown('<div style="text-align:center; color: #888; margin-top:18px">Made with ❤️ — NoteSnap AI</div>', unsafe_allow_html=True)


if __name__ == '__main__':
    main()
