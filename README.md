# 📄 AI PDF Chatbot

An AI-powered PDF chatbot that allows users to upload a PDF document and ask questions about its content using Google's Gemini AI.

The application provides a conversational interface where users can upload a PDF, ask questions, and receive AI-generated answers based on the uploaded document.

---

## 🚀 Live Demo

🌐 **Frontend:**  

[https://my-pdf-chatbot-frontend.onrender.com](https://my-pdf-chatbot-frontend.onrender.com)

🔗 **Backend API:**  

[https://my-pdf-chatbot.onrender.com](https://my-pdf-chatbot.onrender.com)

📚 **API Documentation:**  

[https://my-pdf-chatbot.onrender.com/docs](https://my-pdf-chatbot.onrender.com/docs)

---



## ✨ Features

- 📄 Upload PDF documents
- 🤖 Ask questions about the uploaded PDF
- 💬 Conversational chat interface
- 🧠 AI-powered answers using Google Gemini
- ⚡ FastAPI backend for PDF processing and API requests
- 🎨 Responsive React frontend
- 🌐 Deployed frontend and backend
- 🔐 Secure API key handling using environment variables
- ❌ Prevents users from asking questions before uploading a PDF

---



## 🛠️ Tech Stack



### Frontend

- React
- TypeScript
- Vite
- Axios
- Tailwind CSS



### Backend

- Python
- FastAPI
- Uvicorn
- PyPDF
- Python-dotenv
- Google Gemini API



### Deployment & Tools

- Render
- Git
- GitHub
- Cursor



### ---



## 📁 Project Structure

```text

my-pdf-chatbot/

│

├── backend/

│   ├── services/

│   │   └── gemini_[service.py](http://service.py)

│   ├── [main.py](http://main.py)

│   ├── requirements.txt

│   └── ...

│

├── frontend/

│   ├── src/

│   │   ├── api/

│   │   ├── components/

│   │   ├── types/

│   │   └── ...

│   ├── package.json

│   └── ...

│

├── .gitignore

└── [README.md](http://README.md)

```

---



## 🔄 How It Works

1. **Upload a PDF**
  The user uploads a PDF document through the web interface.
2. **Extract PDF Content**
  The FastAPI backend processes the uploaded PDF and extracts its text.
3. **Ask a Question**
  The user enters a question related to the uploaded document.
4. **Process with Gemini AI**
  The extracted PDF content and user's question are sent to Google's Gemini AI.
5. **Generate an Answer**
  Gemini generates an answer based on the provided PDF content.
6. **Display the Response**
  The answer is returned by the backend and displayed in the chatbot interface.



### Application Flow

```text

User

  │

  ▼

Upload PDF

  │

  ▼

React Frontend

  │

  ▼

FastAPI Backend

  │

  ▼

Extract PDF Text

  │

  ▼

User Question

  │

  ▼

Google Gemini AI

  │

  ▼

AI Generated Answer

  │

  ▼

React Chat Interface
```

---



## 💻 Local Setup



### 1. Clone the Repository

```bash

git clone [https://github.com/m-oshmii/my-pdf-chatbot.git](https://github.com/m-oshmii/my-pdf-chatbot.git)

cd my-pdf-chatbot
```



### 2. Backend Setup

Navigate to the backend directory:

```bash

cd backend
```



### 3. Configure the Gemini API Key

Create a `.env` file inside the `backend` folder:

```env

GEMINI_API_KEY=your_api_key_here 
```



### 4. Start the Backend

From the `backend` directory:

```bash

uvicorn main:app --reload
```



### 5. Frontend Setup

Open a **new terminal** and navigate to the frontend directory:

```bash

cd frontend

```

Install the frontend dependencies:

```bash

npm install

```

Start the frontend development server:

```bash

npm run dev

```

The frontend will normally be available at:

```text

[http://localhost:5173](http://localhost:5173)

```

---



## 📌 API Endpoints

| Method | Endpoint | Description |

|--------|----------|-------------|

| GET | `/` | Check backend status |

| POST | `/upload` | Upload and process a PDF |

| POST | `/ask` | Ask a question about the uploaded PDF |

Interactive API documentation is available through FastAPI Swagger UI:

[https://my-pdf-chatbot.onrender.com/docs](https://my-pdf-chatbot.onrender.com/docs)

---



## 🔐 Environment Variables

The backend requires the following environment variable:

| Variable | Description |

|----------|-------------|

| `GEMINI_API_KEY` | Google Gemini API key |

The API key should be stored in a `.env` file locally and configured as an environment variable on the deployment platform.

> ⚠️ Never commit your `.env` file or expose your API key publicly.

---



## 🎯 Example Usage

1. Open the application.
2. Upload a PDF document.
3. Wait until the document is marked as ready.
4. Enter a question related to the uploaded document.
5. Click **Send**.
6. The chatbot processes the question using Gemini AI and returns an answer based on the uploaded PDF.



### Example

```text

User:

What is this document about?

AI:

The document is a comprehensive guide covering the topics and information provided in the uploaded PDF.

```

---

## 🔮 Future Improvements

- ⚡ Improve response speed by sending only relevant sections of the PDF to Gemini
- 📚 Support multiple PDF documents
- 💾 Add persistent document storage
- 🔎 Implement semantic search and vector embeddings
- 🧠 Implement Retrieval-Augmented Generation (RAG)
- 💬 Add conversation history
- 👤 Add user authentication
- 📊 Improve processing and handling of large PDF documents

---



## 👨‍💻 Author

**m-oshmii**

GitHub:  

[https://github.com/m-oshmii](https://github.com/m-oshmii)

---



## 📄 License

This project was created for educational and project development purposes.