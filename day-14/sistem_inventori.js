// SISTEM INVENTORI BARANG DENGAN RESTFUL API (HARI KE-14)
const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());

const dataFile = "inventory.json";

// Middleware untuk log request
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Membaca data barang dari file JSON
function readInventory() {
    if (!fs.existsSync(dataFile)) {
        return [];
    }
    const data = fs.readFileSync(dataFile);
    return JSON.parse(data);
}

// Menyimpan data barang ke file JSON
function writeInventory(data) {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

// Mendapatkan semua barang
app.get("/items", (req, res) => {
    const inventory = readInventory();
    res.json(inventory);
});

// Menambah barang baru
app.post("/items", (req, res) => {
    const { nama, jumlah, kategori } = req.body;

    if (!nama || !jumlah || !kategori) {
        return res.status(400).json({ error: "Semua field harus diisi." });
    }

    const inventory = readInventory();
    const newItem = {
        id: Date.now().toString(),
        nama,
        jumlah: parseInt(jumlah),
        kategori,
    };
    inventory.push(newItem);
    writeInventory(inventory);
    res.status(201).json(newItem);
});

// Memperbarui barang berdasarkan ID
app.put("/items/:id", (req, res) => {
    const { id } = req.params;
    const { nama, jumlah, kategori } = req.body;

    const inventory = readInventory();
    const itemIndex = inventory.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
        return res.status(404).json({ error: "Barang tidak ditemukan." });
    }

    inventory[itemIndex] = {
          ...inventory[itemIndex],
        nama: nama || inventory[itemIndex].nama,
        jumlah: jumlah !== undefined ? parseInt(jumlah) : inventory[itemIndex].jumlah,
        kategori: kategori || inventory[itemIndex].kategori,
    };

    writeInventory(inventory);
    res.json(inventory[itemIndex]);
});

// Menghapus barang berdasarkan ID
app.delete("/items/:id", (req, res) => {
    const { id } = req.params;

    const inventory = readInventory();
    const newInventory = inventory.filter((item) => item.id !== id);

    if (inventory.length === newInventory.length) {
        return res.status(404).json({ error: "Barang tidak ditemukan." });
    }

    writeInventory(newInventory);
    res.json({ message: "Barang berhasil dihapus." });
});

// Mencari barang berdasarkan nama
app.get("/items/search", (req, res) => {
    const { nama } = req.query;
    const inventory = readInventory();
    const result = inventory.filter((item) => item.nama.toLowerCase().includes(nama.toLowerCase()));

    if (result.length === 0) {
        return res.status(404).json({ error: "Barang tidak ditemukan." });
    }

    res.json(result);
});

app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
