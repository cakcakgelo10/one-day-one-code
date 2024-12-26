// Sistem Manajemen Pengguna dengan Autentikasi Dasar

const crypto = require("crypto");
const readlineSync = require("readline-sync");

let users = [];

// Fungsi hashing kata sandi
function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Menu utama
function mainMenu() {
    while (true) {
        const choice = readlineSync.question(`
        === SISTEM MANAJEMEN PENGGUNA ===
            Pilih opsi:
            1. Registrasi
            2. Login
            3. Lihat Daftar Pengguna (Admin)
            4. Keluar
        `);

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

    if (password.length < 8) {
        console.log("Kata sandi terlalu pendek! Minimal 8 karakter.");
        return;
    }

    if (!isValidEmail(email)) {
        console.log("Email tidak valid! Silakan gunakan format email yang benar.");
        return;
    }

    if (users.some(user => user.email === email)) {
        console.log("Email sudah digunakan! Silakan gunakan email lain.");
        return;
    }

    const hashedPassword = hashPassword(password);
    users.push({ username, email, password: hashedPassword });
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
        const choice = readlineSync.question(`
        === PENGELOLAAN PROFIL ===
            Pilih opsi:
            1. Lihat Profil
            2. Perbarui Profil
            3. Kembali ke Menu Sebelumnya
        `);

        switch (choice) {
            case "1":
                console.log(`
                === Profil Anda ===
                    Nama Pengguna: ${user.username}
                    Email: ${user.email}
                `);
                break;
            case "2":
                const newUsername = readlineSync.question("Masukkan nama pengguna baru: ").trim();
                user.username = newUsername || user.username;
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

// Menjalankan aplikasi
mainMenu();