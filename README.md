# 🔐 MR HAJI AL PANEL

Dashboard Panel Authentication dengan Node.js, Express, MongoDB, dan JWT

## ✨ Fitur

✅ **Registrasi & Login** - User bisa membuat akun baru dan login
✅ **Password Hashing** - Keamanan password dengan bcryptjs
✅ **JWT Authentication** - Token-based authentication
✅ **MongoDB** - Database NoSQL untuk menyimpan data user
✅ **Error Handling** - Response error yang jelas
✅ **Responsive UI** - Interface yang mobile-friendly
✅ **Session Management** - Token disimpan di localStorage

## 📋 Prerequisites

- Node.js (v14 atau lebih tinggi)
- MongoDB (berjalan di localhost:27017)
- npm atau yarn

## 🚀 Setup & Installation

### 1. Clone Repository
```bash
git clone https://github.com/mrhajial/mrhajial-panel.git
cd mrhajial-panel
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Konfigurasi .env
File `.env` sudah tersedia dengan konfigurasi:
```
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/mrhajial
JWT_SECRET=mrhaji_super_secret
```

Ubah `JWT_SECRET` ke secret key yang lebih aman jika diperlukan.

### 4. Jalankan MongoDB
Pastikan MongoDB berjalan di port 27017:
```bash
# Windows
mongod

# macOS/Linux
mongod --dbpath /path/to/data
```

### 5. Jalankan Server
```bash
# Mode production
npm start

# Mode development (dengan auto-reload)
npm run dev
```

Server akan berjalan di: **http://localhost:3000**

## 📚 API Endpoints

### 1. Register
**POST** `/register`

**Request Body:**
```json
{
  "username": "haji",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "✅ User berhasil dibuat!"
}
```

### 2. Login
**POST** `/login`

**Request Body:**
```json
{
  "username": "haji",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "✅ Login sukses!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "haji"
}
```

### 3. Dashboard (Protected Route)
**GET** `/dashboard`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "🔥 Selamat datang di MR HAJI AL PANEL, haji!",
  "user": {
    "id": "...",
    "username": "haji"
  }
}
```

## 🎯 Testing dengan cURL

### Register
```bash
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"username":"haji","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"haji","password":"password123"}'
```

### Access Dashboard
```bash
curl -X GET http://localhost:3000/dashboard \
  -H "Authorization: Bearer <TOKEN_DARI_LOGIN>"
```

## 📁 Struktur File

```
mrhajial-panel/
├── models/
│   └── User.js           # Mongoose User Schema
├── public/
│   └── index.html        # Frontend UI
├── server.js             # Express Server
├── package.json          # Dependencies
├── .env                  # Environment Variables
├── .gitignore            # Git Ignore
└── README.md             # Dokumentasi
```

## 🔐 Security Notes

⚠️ **Development Mode:**
- JWT_SECRET di `.env` adalah placeholder untuk development
- Untuk production, gunakan secret key yang lebih kuat dan random

⚠️ **Password Hashing:**
- Semua password di-hash dengan bcryptjs sebelum disimpan ke database

⚠️ **Token:**
- Token JWT berlaku selama 7 hari
- Setiap login akan generate token baru

## 🚀 Deploy ke Netlify

### Catatan:
Netlify hanya bisa host static files (HTML, CSS, JS).
Untuk deploy backend Express + MongoDB, gunakan:
- **Heroku** (vercel, Render, Railway, dll)
- **VPS** (DigitalOcean, AWS, Google Cloud, dll)

### Deploy Frontend ke Netlify:
1. Push ke GitHub
2. Connect repository ke Netlify
3. Set build command: `npm install`
4. Set publish directory: `public`

## 🤝 Kontribusi

Fork repository ini dan buat Pull Request untuk kontribusi!

## 📄 License

MIT License - Bebas digunakan untuk project apapun

## 👨‍💻 Author

**MR HAJI AL**

---

💡 Jika ada pertanyaan atau bug, buat issue di repository ini!
