// Sistem Manajemen Pengguna dengan Autentikasi Dasar

const crypto = require("crypto");
const fs = require("fs");
const readlineSync = require("readline-sync");

let users = loadUsers();

// Fungsi untuk membaca data dari file JSON
function loadUsers() {
    if (fs.existsSync("users.json")) {
        const data = fs.readFileSync("users.json", "utf8");
        return JSON.parse(data);
    }
    return [];
}

// Fungsi untuk menyimpan data ke file JSON
function saveUsers() {
    fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
}

// Fungsi hashing kata sandi
function hashPassword(password) {
    return crypto.createHash("sha256").update(password).digest("hex");
}

// Menu utama
function mainMenu() {
    while (true) {
        const choice = readlineSync.question(`\n=== SISTEM MANAJEMEN PENGGUNA ===\nPilih opsi:\n1. Registrasi\n2. Login\n3. Lihat Daftar Pengguna (Admin)\n4. Hapus Akun\n5. Keluar\nPilihan Anda: `);

        switch (choice) {
            case "1":
                register();
                break;
            case "2":
                login();
                break;
            case "3":
                viewUsers();
                break;
            case "4":
                deleteAccount();
                break;
            case "5":
                console.log("Terima kasih sudah menggunakan sistem ini.");
                return;
            default:
                console.log("Opsi tidak valid. Silakan coba lagi.");
        }
    }
}

// Registrasi pengguna baru
function register() {
    const username = readlineSync.question("Masukkan nama pengguna: ").trim();
    const email = readlineSync.question("Masukkan email: ").trim();
    const password = readlineSync.question("Masukkan kata sandi (min 8 karakter): ", { hideEchoBack: true });

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        console.log("Format email tidak valid!");
        return;
    }

    if (password.length < 8) {
        console.log("Kata sandi terlalu pendek! Minimal 8 karakter.");
        return;
    }

    if (users.some(user => user.email === email)) {
        console.log("Email sudah digunakan! Silakan gunakan email lain.");
        return;
    }

    const hashedPassword = hashPassword(password);
    users.push({ username, email, password: hashedPassword });
    saveUsers();
    console.log("✅ Registrasi berhasil!");
}

// Login pengguna
function login() {
    const email = readlineSync.question("Masukkan email: ").trim();
    const password = readlineSync.question("Masukkan kata sandi: ", { hideEchoBack: true });
    const hashedPassword = hashPassword(password);

    const user = users.find(u => u.email === email && u.password === hashedPassword);

    if (user) {
        console.log(`Selamat datang, ${user.username}!`);
        manageProfile(user);
    } else {
        console.log("Email atau kata sandi salah.");
    }
}

// Mengelola profil pengguna
function manageProfile(user) {
    while (true) {
        const choice = readlineSync.question(`\n=== PENGELOLAAN PROFIL ===\nPilih opsi:\n1. Lihat Profil\n2. Perbarui Profil\n3. Kembali ke Menu Sebelumnya\nPilihan Anda: `);

        switch (choice) {
            case "1":
                console.log(`\n=== Profil Anda ===\nNama Pengguna: ${user.username}\nEmail: ${user.email}\n`);
                break;
            case "2":
                const newUsername = readlineSync.question("Masukkan nama pengguna baru: ").trim();
                user.username = newUsername || user.username;
                saveUsers();
                console.log("✅ Profil berhasil diperbarui!");
                break;
            case "3":
                return;
            default:
                console.log("Opsi tidak valid. Silakan coba lagi.");
        }
    }
}

// Melihat daftar pengguna (admin)
function viewUsers() {
    if (users.length === 0) {
        console.log("📋 Tidak ada pengguna terdaftar.");
        return;
    }

    console.log("\n=== Daftar Pengguna ===");
    console.table(users.map(user => ({ username: user.username, email: user.email })));
}

// Menghapus akun
function deleteAccount() {
    const email = readlineSync.question("Masukkan email akun yang ingin dihapus: ").trim();

    const index = users.findIndex(user => user.email === email);
    if (index === -1) {
        console.log("📋 Pengguna dengan email ini tidak ditemukan.");
        return;
    }

    const confirmation = readlineSync.question("Apakah Anda yakin ingin menghapus akun ini? (ya/tidak): ").toLowerCase();
    if (confirmation === "ya") {
        users.splice(index, 1);
        saveUsers();
        console.log("✅ Akun berhasil dihapus.");
    } else {
        console.log("❌ Penghapusan akun dibatalkan.");
    }
}

// Menjalankan aplikasi
mainMenu();