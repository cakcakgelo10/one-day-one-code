// Import module 
const express = require("express");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Secret key untuk JWT
const SECRET_KEY = "supersecretkey";

// Middleware untuk mem-parsing JSON
app.use(bodyParser.json());

// Middleware Logging ke File
function logRequest(req, res, next) {
    const log = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;
    fs.appendFileSync("request.log", log);
    console.log(log.trim());
    next();
}
app.use(logRequest);

// Middleware Otentikasi
function authenticate(req, res, next) {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ error: "Token tidak ditemukan." });
    }
    try {
        const user = jwt.verify(token, SECRET_KEY);
        req.user = user;
        next();
    } catch (err) {
        res.status(403).json({ error: "Token tidak valid." });
    }
}

// Middleware Otorisasi
function authorize(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ error: "Akses ditolak. Anda tidak memiliki izin." });
        }
        next();
    };
}

// Middleware Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Terjadi kesalahan pada server." });
});

// Route untuk Registrasi
app.post("/register", (req, res) => {
    const { username, password, role } = req.body;
    const token = jwt.sign({ username, role }, SECRET_KEY, { expiresIn: "1h" });
    res.status(201).json({ token });
});

// Route untuk Data Aman dengan Middleware Otentikasi & Otorisasi
app.get("/secure-data", authenticate, authorize("admin"), (req, res) => {
    res.json({ message: "Anda memiliki akses ke data rahasia sebagai admin." });
});

// Route dengan Chaining Middleware
app.get("/multi-middleware", logRequest, authenticate, (req, res) => {
    res.json({ message: "Route ini melewati banyak middleware." });
});

// Route Default
app.get("/", (req, res) => {
    res.json({ message: "Server berjalan dengan middleware yang terpasang." });
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});

// Cara pake fitur
// POST / register
// body:
// {
//     "username": "admin",
//     "password": "password123",
//     "role": "admin"
//   }
// Response: Token JWT.

// GET /secure-data
// Tambahkan header Authorization dengan token dari /register.

// GET /multi-middleware
// Sama seperti /secure-data, gunakan token.