import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise RuntimeError("GEMINI_API_KEY is missing from backend/.env")

genai.configure(api_key=api_key)

MODEL_NAME = "gemini-3.5-flash-lite"
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

    try:
        model = genai.GenerativeModel(MODEL_NAME)

        response = model.generate_content(
            prompt,
            request_options={"timeout": 30}
        )

        if response.text:
            return response.text

        raise RuntimeError("Gemini returned an empty response.")

    except Exception as exc:
        raise RuntimeError(
            f"Gemini could not generate an answer: {exc}"
        ) from exc