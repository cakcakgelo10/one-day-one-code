const express = require("express");
const morgan = require("morgan");

const app = express();
const PORT = 3000;

// Middleware global untuk logging menggunakan morgan
app.use(morgan("dev"));

// Middleware untuk menambahkan header ke setiap response
app.use((req, res, next) => {
    res.setHeader("X-Powered-By", "Express Middleware");
    next();
});

// Middleware untuk memvalidasi parameter 'auth' di query
function validateAuth(req, res, next) {
    const { auth } = req.query;

    if (!auth || auth !== "secret-token") {
        return res.status(403).json({ error: "Akses ditolak. Token otentikasi tidak valid." });
    }
    next();
}

// Middleware untuk memproses data JSON
app.use(express.json());

// Route yang menggunakan middleware validateAuth
app.get("/secure-data", validateAuth, (req, res) => {
    res.json({ message: "Anda memiliki akses ke data aman." });
});

// Middleware khusus untuk menghitung waktu respons
app.use((req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - start;
        console.log(`[${req.method}] ${req.url} selesai dalam ${duration}ms`);
    });

    next();
});

// Route untuk menyambut pengguna
app.get("/", (req, res) => {
    res.send("Selamat datang di latihan middleware!");
});

// Route untuk menampilkan daftar item
app.get("/items", (req, res) => {
    res.json([
        { id: 1, name: "Item 1", price: 10000 },
        { id: 2, name: "Item 2", price: 20000 },
        { id: 3, name: "Item 3", price: 30000 },
    ]);
});

// Middleware penanganan error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Terjadi kesalahan pada server." });
});

// Middleware untuk rute yang tidak ditemukan
app.use((req, res) => {
    res.status(404).json({ error: "Rute tidak ditemukan." });
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
