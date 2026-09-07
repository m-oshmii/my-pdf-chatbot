from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from services.gemini_service import ask_gemini
from services.pdf_service import extract_text
import shutil
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

pdf_text = ""


@app.get("/")
def root():
    return {"message": "Backend Running 🚀"}


@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    global pdf_text

    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Please upload a PDF file.")

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        pdf_text = extract_text(file_path)
    except Exception as exc:
        raise HTTPException(
            status_code=400,
            detail="Could not read this PDF. Try another file.",
        ) from exc

    if not pdf_text.strip():
        raise HTTPException(
            status_code=400,
            detail="Could not extract text from this PDF.",
        )

    return {
        "filename": file.filename,
        "message": "PDF uploaded successfully!",
    }


class Question(BaseModel):
    question: str


@app.post("/ask")
def ask(question: Question):
    if not pdf_text.strip():
        raise HTTPException(
            status_code=400,
            detail="Upload a PDF before asking a question.",
        )

    try:
        answer = ask_gemini(pdf_text, question.question)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc

    return {"answer": answer}
