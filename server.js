require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");

const app = express();
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Database Connected"))
  .catch(err => console.log("❌ DB Error:", err));

// REGISTER
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validasi input
    if (!username || !password) {
      return res.status(400).json({ error: "Username dan password harus diisi" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password minimal 6 karakter" });
    }

    // Cek username sudah ada
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ error: "Username sudah digunakan" });
    }

    // Hash password
    const hash = await bcrypt.hash(password, 10);

    // Simpan user
    const user = new User({ username, password: hash });
    await user.save();

    res.status(201).json({ message: "✅ User berhasil dibuat!" });
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username dan password harus diisi" });
    }

    // Cari user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "❌ User tidak ditemukan" });
    }

    // Validasi password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "❌ Password salah" });
    }

    // Generate token
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    res.json({ message: "✅ Login sukses!", token, username: user.username });
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
});

// PROTECTED ROUTE - DASHBOARD
app.get("/dashboard", (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "❌ Akses ditolak - Token tidak ditemukan" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ 
      message: `🔥 Selamat datang di MR HAJI AL PANEL, ${decoded.username}!",
      user: decoded
    });
  } catch (error) {
    res.status(403).json({ error: "❌ Token invalid atau expired" });
  }
});

// Health check
app.get("/", (req, res) => {
  res.json({ message: "✅ MR HAJI AL Panel API is running" });
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${process.env.PORT}`);
});
