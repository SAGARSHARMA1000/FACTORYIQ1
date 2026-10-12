# FactoryIQ 🧠

**AI-Powered Industrial Knowledge Intelligence**

Built for ET AI Hackathon 2026 — Problem Statement #8 (AI for Industrial Knowledge
Intelligence: Unified Asset & Operations Brain).

FactoryIQ unifies a factory's scattered documents — PDFs, P&IDs, maintenance
records, safety procedures, work orders — into a single AI-searchable layer.
Any worker can ask a plain-English question and get an answer with source
citations, instead of digging through 7-12 disconnected systems.

---

## ✨ Features

- **Universal document ingestion** — PDF, scanned images (OCR), Excel, DOCX
- **RAG-powered Q&A** — ask questions in plain English, get cited answers
- **Knowledge gap detection** — flags stale maintenance records, missing
  safety coverage, and failed document processing
- **Dashboard** — document status, chunk counts, query history at a glance
- **Mobile-friendly UI** — built for shop-floor use, not just desks

---

## 🏗️ Architecture

```
Upload → Text Extraction (pdf-parse / Tesseract OCR) → Chunking
       → Embeddings (OpenAI) → Vector Store (MongoDB) → Ready to query

Question → Embed → Vector Search (top-5 chunks) → Claude (RAG prompt)
         → Answer + Source Citations
```

See `/server/services/` for the full pipeline implementation.

---

## 📁 Project Structure

```
factoryiq/
├── client/              React frontend (Vite + Tailwind)
│   └── src/
│       ├── api/         Axios API client
│       ├── components/  Reusable UI components
│       └── pages/       Chat, Documents, Dashboard pages
│
└── server/               Node/Express backend
    ├── config/          DB connection
    ├── controllers/     Route handlers
    ├── middleware/      Multer upload config
    ├── models/          Mongoose schemas (Document, Chunk, QueryLog)
    ├── routes/          Express routers
    └── services/        Extraction, chunking, embeddings, RAG, gap detection
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A free [MongoDB Atlas](https://cloud.mongodb.com) cluster
- An [Anthropic API key](https://console.anthropic.com) (for Q&A generation)
- An [OpenAI API key](https://platform.openai.com) (for embeddings)

### 1. Backend Setup

```bash
cd server
npm install
cp .env.example .env
# Edit .env and fill in MONGODB_URI, ANTHROPIC_API_KEY, OPENAI_API_KEY
npm run dev
```

Server runs on `http://localhost:5000`.

### 2. Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on `http://localhost:5173` and proxies `/api` requests to the
backend automatically (see `vite.config.js`).

### 3. Try it out

1. Open `http://localhost:5173`
2. Go to **Documents** → upload a PDF, image, or spreadsheet
3. Wait a few seconds for it to show **✅ Processed**
4. Go to **Ask FactoryIQ** → ask a question about it
5. Check the **Dashboard** for stats and detected knowledge gaps

---

## 🗄️ Vector Search Setup (Important)

By default this project uses **brute-force cosine similarity** in Node,
which works fine for a hackathon demo (a few hundred chunks). For anything
beyond that, switch to **MongoDB Atlas Vector Search**:

1. In Atlas, go to your cluster → **Search** → **Create Search Index**
2. Choose **JSON Editor**, select the `chunks` collection, and use:

```json
{
  "fields": [
    {
      "type": "vector",
      "path": "embedding",
      "numDimensions": 1536,
      "similarity": "cosine"
    }
  ]
}
```

3. Name the index `vector_index`
4. In `server/.env`, add `USE_ATLAS_VECTOR_SEARCH=true`

---

## 🔑 Environment Variables

See `server/.env.example` for the full list. At minimum you need:

| Variable | Purpose |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `ANTHROPIC_API_KEY` | Claude API key — generates answers |
| `OPENAI_API_KEY` | OpenAI API key — generates embeddings |

---

## 🧰 Tech Stack

**Frontend:** React, Vite, Tailwind CSS, React Router, Axios, react-markdown,
react-dropzone, lucide-react

**Backend:** Node.js, Express, Mongoose, Multer, pdf-parse, Tesseract.js,
xlsx, mammoth

**AI:** Claude API (Anthropic), OpenAI Embeddings API, RAG pipeline

**Database:** MongoDB Atlas (+ Atlas Vector Search)

---

## 🔮 Future Scope

- Regional language support (Hindi, Tamil, Telugu, Kannada)
- On-premise LLM deployment for classified data
- Video/audio ingestion (toolbox talks, training recordings)
- Live IoT sensor integration
- Multi-plant enterprise mode with role-based access
- Autonomous maintenance agent (auto-schedules work orders)

---

## 📄 License

MIT — built for ET AI Hackathon 2026.
