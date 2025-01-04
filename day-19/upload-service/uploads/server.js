const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware untuk log request
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Konfigurasi Multer
const uploadFolder = "./uploads";

if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Tipe file tidak didukung. Hanya file gambar yang diizinkan."));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Maksimum ukuran file: 5MB
});

// Endpoint untuk mengunggah file
app.post("/upload", upload.single("file"), (req, res) => {
  res.json({
    message: "File berhasil diunggah",
    file: req.file,
  });
});

// Endpoint untuk melihat daftar file yang diunggah
app.get("/files", (req, res) => {
  fs.readdir(uploadFolder, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Gagal membaca folder unggahan" });
    }
    res.json({
      files,
    });
  });
});

// Endpoint untuk mengunduh file berdasarkan nama
app.get("/files/:name", (req, res) => {
  const filePath = path.join(uploadFolder, req.params.name);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File tidak ditemukan" });
  }
  res.download(filePath);
});

// Error handler untuk file upload
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  } else if (err) {
    return res.status(500).json({ error: err.message });
  }
  next();
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
