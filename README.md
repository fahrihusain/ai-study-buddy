# AI Learning Assistant

Aplikasi web full-stack yang membantu pengguna belajar lebih efektif dengan memanfaatkan kecerdasan buatan. Pengguna dapat mengunggah dokumen PDF, lalu secara otomatis mendapatkan ringkasan, flashcard, kuis, dan fitur tanya-jawab berbasis konten dokumen tersebut.

---

## Fitur Utama

- Autentikasi pengguna (registrasi, login, manajemen profil, ganti password)
- Unggah dan manajemen dokumen PDF
- Ekstraksi teks otomatis dari PDF dan pemecahan teks menjadi chunk
- Generasi ringkasan dokumen menggunakan Google Gemini AI
- Generasi flashcard otomatis dari konten dokumen
- Generasi kuis pilihan ganda otomatis dari konten dokumen
- Tanya-jawab interaktif (chat) berbasis konteks dokumen
- Penjelasan konsep dari dokumen menggunakan AI
- Riwayat percakapan per dokumen
- Dashboard progres belajar (statistik dokumen, flashcard, kuis, aktivitas terkini)
- Sistem review dan bintang pada flashcard

---

## Teknologi yang Digunakan

### Backend

| Teknologi                          | Keterangan                     |
| ---------------------------------- | ------------------------------ |
| Node.js + Express 5                | Framework server               |
| MongoDB + Mongoose                 | Database dan ODM               |
| Google Gemini AI (`@google/genai`) | Generasi konten AI             |
| JSON Web Token (JWT)               | Autentikasi                    |
| bcryptjs                           | Enkripsi password              |
| Multer                             | Upload file                    |
| pdf-parse                          | Ekstraksi teks dari PDF        |
| express-validator                  | Validasi input                 |
| dotenv                             | Manajemen environment variable |
| nodemon                            | Hot reload saat development    |

### Frontend

| Teknologi                   | Keterangan                  |
| --------------------------- | --------------------------- |
| React 19 + Vite 8           | Framework UI dan build tool |
| React Router DOM 7          | Routing                     |
| Tailwind CSS 4              | Styling                     |
| Axios                       | HTTP client                 |
| react-markdown + remark-gfm | Render konten Markdown      |
| react-syntax-highlighter    | Highlight kode dalam chat   |
| react-hot-toast             | Notifikasi                  |
| lucide-react                | Ikon                        |
| moment.js                   | Format tanggal dan waktu    |

---

## Struktur Folder

```
.
├── backend/
│   ├── config/
│   │   ├── db.js               # Koneksi MongoDB
│   │   └── multer.js           # Konfigurasi upload file
│   ├── controllers/
│   │   ├── aiCrontroller.js    # Logika AI (flashcard, kuis, chat, ringkasan)
│   │   ├── authCrontroller.js  # Autentikasi dan manajemen profil
│   │   ├── documentCrontroler.js # Upload dan manajemen dokumen
│   │   ├── flashcardCrontroller.js # Manajemen flashcard
│   │   ├── quizController.js   # Manajemen kuis
│   │   └── progressCrontroller.js  # Statistik dan progres belajar
│   ├── middleware/
│   │   ├── auth.js             # Middleware autentikasi JWT
│   │   └── errorHandler.js     # Global error handler
│   ├── models/
│   │   ├── ChatHistory.js      # Model riwayat percakapan
│   │   ├── Document.js         # Model dokumen
│   │   ├── Flashcard.js        # Model flashcard
│   │   ├── Quiz.js             # Model kuis
│   │   └── User.js             # Model pengguna
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── documentRoutes.js
│   │   ├── flashcardRoutes.js
│   │   ├── aiRoutes.js
│   │   ├── quizRoutes.js
│   │   └── progressRoutes.js
│   ├── utils/
│   │   ├── geminiService.js    # Integrasi Google Gemini AI
│   │   ├── pdfParser.js        # Ekstraksi teks PDF
│   │   └── textChunker.js      # Pemecahan teks menjadi chunk
│   ├── uploads/
│   │   └── documents/          # Penyimpanan file PDF yang diunggah
│   ├── .env                    # Environment variable (tidak di-commit)
│   ├── package.json
│   └── server.js               # Entry point server
│
└── frontend/
    └── ai-learnig-asistent/
        ├── public/
        ├── src/
        │   ├── assets/
        │   ├── components/
        │   │   ├── ai/         # Komponen aksi AI
        │   │   ├── auth/       # ProtectedRoute
        │   │   ├── chat/       # Antarmuka chat
        │   │   ├── common/     # Komponen reusable (Button, Modal, Spinner, dll.)
        │   │   ├── context/    # AuthContext
        │   │   ├── documents/  # DocumentCard
        │   │   ├── flashcards/ # Flashcard, FlashcardManager, FlashcardSetCard
        │   │   ├── layout/     # Komponen layout
        │   │   └── quizzes/    # QuizCard, QuizManager
        │   ├── pages/
        │   │   ├── Auth/       # LoginPage, RegisterPage
        │   │   ├── Dashbord/   # Dashboard
        │   │   ├── Documents/  # DocumentListPage, DocumentDetailPage
        │   │   ├── Flashcards/ # FlashcardListPage, FlashcardPage
        │   │   ├── Profile/    # ProfilePage
        │   │   ├── Quizzes/    # QuizTakePage, QuizResultPage
        │   │   └── NotFoundPage.jsx
        │   ├── services/       # Fungsi pemanggilan API
        │   ├── App.jsx
        │   ├── main.jsx
        │   └── index.css
        ├── index.html
        └── package.json
```

---

## Instalasi dan Menjalankan Proyek

### Prasyarat

- Node.js v18 atau lebih baru
- MongoDB (lokal atau MongoDB Atlas)
- Google Gemini API Key

### 1. Clone Repository

```bash
git clone <url-repository>
cd <nama-folder>
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Buat file `.env` di dalam folder `backend/` dengan isi berikut:

```env
PORT=8000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/ai-learning-assistant
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
GEMINI_API_KEY=your_google_gemini_api_key
```

Jalankan server backend:

```bash
# Mode development (dengan hot reload)
npm run dev

# Mode production
npm start
```

Server akan berjalan di `http://localhost:8000`.

### 3. Setup Frontend

Buka terminal baru, lalu:

```bash
cd frontend/ai-learnig-asistent
npm install
npm run dev
```

Aplikasi frontend akan berjalan di `http://localhost:5173`.

---

## API Endpoints

| Method | Endpoint                           | Keterangan                      |
| ------ | ---------------------------------- | ------------------------------- |
| POST   | `/api/auth/register`               | Registrasi pengguna baru        |
| POST   | `/api/auth/login`                  | Login pengguna                  |
| GET    | `/api/auth/profile`                | Ambil profil pengguna           |
| PUT    | `/api/auth/profile`                | Update profil pengguna          |
| POST   | `/api/auth/change-password`        | Ganti password                  |
| GET    | `/api/documents`                   | Ambil semua dokumen pengguna    |
| POST   | `/api/documents/upload`            | Upload dokumen PDF              |
| GET    | `/api/documents/:id`               | Ambil detail dokumen            |
| DELETE | `/api/documents/:id`               | Hapus dokumen                   |
| POST   | `/api/ai/generate-flashcards`      | Generate flashcard dari dokumen |
| POST   | `/api/ai/generate-quiz`            | Generate kuis dari dokumen      |
| POST   | `/api/ai/generate-summary`         | Generate ringkasan dokumen      |
| POST   | `/api/ai/chat`                     | Tanya-jawab berbasis dokumen    |
| POST   | `/api/ai/explain-concept`          | Penjelasan konsep dari dokumen  |
| GET    | `/api/ai/chat-history/:documentId` | Ambil riwayat chat              |
| GET    | `/api/flashcards`                  | Ambil semua set flashcard       |
| GET    | `/api/flashcards/:documentId`      | Ambil flashcard per dokumen     |
| POST   | `/api/flashcards/:cardId/review`   | Tandai flashcard sudah direview |
| PUT    | `/api/flashcards/:cardId/star`     | Toggle bintang pada flashcard   |
| DELETE | `/api/flashcards/:id`              | Hapus set flashcard             |
| GET    | `/api/quizzes/:documentId`         | Ambil kuis per dokumen          |
| GET    | `/api/quizzes/quiz/:id`            | Ambil detail kuis               |
| POST   | `/api/quizzes/:id/submit`          | Submit jawaban kuis             |
| GET    | `/api/quizzes/:id/results`         | Ambil hasil kuis                |
| DELETE | `/api/quizzes/:id`                 | Hapus kuis                      |
| GET    | `/api/progress/dashboard`          | Ambil statistik progres belajar |

Sekian dan terimakasih 5 juni 2026
