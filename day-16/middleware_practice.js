// Import dependencies
const express = require("express");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");

const app = express();
const PORT = 3000;
const SECRET_KEY = "supersecretkey";
const logFile = "request.log";

app.use(express.json());
app.use(morgan("dev"));

// Simulasi data pengguna
const users = [
    { username: "user1", password: "password1" },
    { username: "user2", password: "password2" },
];

// Endpoint login untuk mendapatkan token
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Cari pengguna berdasarkan username dan password
    const user = users.find(
        (u) => u.username === username && u.password === password
    );

    if (!user) {
        return res.status(401).json({ error: "Username atau password salah" });
    }

    // Buat token JWT
    const token = jwt.sign({ username: user.username }, SECRET_KEY, {
        expiresIn: "1h", // Token berlaku selama 1 jam
    });

    res.json({ token });
});

// Middleware A: Validasi header 'X-Requested-By'
function validateHeader(req, res, next) {
    if (!req.headers["x-requested-by"]) {
        return res.status(400).json({ error: "Header 'X-Requested-By' diperlukan." });
    }
    next();
}

// Middleware B: Logging request ke file log
function logToFile(req, res, next) {
    const log = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;
    fs.appendFileSync(logFile, log);
    next();
}

// Middleware C: Autentikasi sederhana
function authenticate(req, res, next) {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Token diperlukan." });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ error: "Token tidak valid." });
    }
}

// Simulasi database tugas
let tasks = [];

// Rute A: Mendapatkan semua tugas
app.get("/tasks", logToFile, (req, res) => {
    res.json(tasks);
});

// Rute B: Menambahkan tugas baru
app.post("/tasks", validateHeader, authenticate, logToFile, (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: "Nama tugas diperlukan." });
    }

    const newTask = {
        id: Date.now().toString(),
        name,
    };
    tasks.push(newTask);
    res.status(201).json({ message: "Tugas berhasil ditambahkan.", task: newTask });
});

// Rute C: Menghapus tugas berdasarkan ID
app.delete("/tasks/:id", authenticate, logToFile, (req, res) => {
    const { id } = req.params;
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ error: "Tugas tidak ditemukan." });
    }

    tasks.splice(taskIndex, 1);
    res.json({ message: "Tugas berhasil dihapus." });
});

// Start server
app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));

// Cara menggunakan:
// 1. Tambahkan header 'X-Requested-By' untuk setiap request POST/DELETE.
// 2. Gunakan token JWT untuk rute yang membutuhkan autentikasi (POST/DELETE).
// 3. Semua permintaan akan dicatat dalam file 'request.log'.
// 4. Gunakan POST /tasks untuk menambahkan tugas.
// 5. Gunakan DELETE /tasks/:id untuk menghapus tugas.
