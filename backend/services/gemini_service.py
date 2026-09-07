import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise RuntimeError("GEMINI_API_KEY is missing from backend/.env")

genai.configure(api_key=api_key)

# gemini-2.0-flash is often at free-tier quota 0; prefer 2.5 models.
MODEL_CANDIDATES = [
    "gemini-2.5-flash-lite",
    "gemini-2.5-flash",
    "gemini-flash-latest",
]

MAX_PDF_CHARS = 80_000


def ask_gemini(pdf_text: str, question: str):
    content = pdf_text[:MAX_PDF_CHARS]
    prompt = f"""
You are a helpful PDF assistant.

Answer ONLY using the PDF content below.
If the answer is not in the PDF, say you cannot find it in the document.

PDF Content:
{content}

Question:
{question}
"""

    last_error = None

    for model_name in MODEL_CANDIDATES:
        try:
            model = genai.GenerativeModel(model_name)
            response = model.generate_content(prompt)
            if response.text:
                return response.text
        except Exception as exc:
            last_error = exc
            continue

    raise RuntimeError(
        "Gemini could not generate an answer. "
        "Your API key may be out of quota, or the model is unavailable. "
        f"Last error: {last_error}"
    )
