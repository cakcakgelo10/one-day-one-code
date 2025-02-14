// Sistem Manajemen Perpustakaan Digital

let books = [
    { id: 1, title: "Aku Buku", author: "Reza", stock: 10 },
    { id: 2, title: "Buku Aku", author: "Akbar", stock: 20 },
    { id: 3, title: "Kubu Kua", author: "Fakhri", stock: 30 },
];

let borrowedBooks = [];

// Utility Functions
function isValidId(input) {
    const id = parseInt(input);
    return !isNaN(id) && id > 0;
}

function findBookById(id) {
    return books.find(book => book.id === id);
}

function mainMenu() {
    while (true) {
        const choice = prompt(`=== SISTEM PERPUSTAKAAN DIGITAL ===
Pilih opsi:
1. Tambah Buku Baru
2. Lihat Daftar Buku
3. Pinjam Buku
4. Kembalikan Buku
5. Lihat Buku yang Sedang Dipinjam
6. Keluar`);
        switch (choice) {
            case "1":
                addBook();
                break;
            case "2":
                viewBooks();
                break;
            case "3":
                borrowBook();
                break;
            case "4":
                returnBook();
                break;
            case "5":
                viewBorrowedBooks();
                break;
            case "6":
                alert("Terima kasih telah menggunakan sistem kami!");
                return;
            default:
                alert("Opsi tidak valid. Silakan coba lagi.");
        }
    }
}

function addBook() {
    const title = prompt("Masukan judul buku:").trim();
    const author = prompt("Masukan nama penulis:").trim();
    const stock = parseInt(prompt("Masukan jumlah stok buku:"));

    if (!title || !author || isNaN(stock) || stock <= 0) {
        alert("Input tidak valid! Silahkan coba lagi.");
        return;
    }

    const id = books.length ? Math.max(...books.map(b => b.id)) + 1 : 1;
    books.push({ id, title, author, stock });
    alert(`✅ Buku "${title}" berhasil ditambahkan dengan ID ${id}!`);
}

function viewBooks() {
    if (books.length === 0) {
        console.log("📋 Tidak ada buku dalam koleksi perpustakaan.");
        return;
    }

    console.log("\n=== Daftar Buku ===");
    console.table(books);
}

function borrowBook() {
    if (books.length === 0) {
        alert("📚 Tidak ada buku tersedia untuk dipinjam.");
        return;
    }

    console.log("\n=== Daftar Buku ===");
    console.table(books);

    const userId = parseInt(prompt("Masukan ID pengguna:"));
    const bookId = parseInt(prompt("Masukan ID buku yang ingin dipinjam:"));

    if (!isValidId(userId) || !isValidId(bookId)) {
        alert("Input ID tidak valid!");
        return;
    }

    const book = findBookById(bookId);

    if (!book) {
        alert("Buku tidak ditemukan!");
        return;
    }

    if (book.stock <= 0) {
        alert("Stok buku habis! Tidak bisa meminjam.");
        return;
    }

    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 7);

    borrowedBooks.push({
        userId,
        bookId,
        title: book.title,
        returnDate: returnDate.toISOString().split('T')[0],
    });

    book.stock -= 1;
    alert(`✅ Buku "${book.title}" berhasil dipinjam! Harap dikembalikan sebelum ${returnDate.toISOString().split('T')[0]}.`);
}

function returnBook() {
    if (borrowedBooks.length === 0) {
        alert("📋 Tidak ada buku yang sedang dipinjam.");
        return;
    }

    console.log("\n=== Buku yang Sedang Dipinjam ===");
    console.table(borrowedBooks);

    const bookId = parseInt(prompt("Masukan ID buku yang ingin dikembalikan."));
    if (!isValidId(bookId)) {
        alert("ID buku tidak valid!");
        return;
    }

    const borrowedIndex = borrowedBooks.findIndex(bb => bb.bookId === bookId);

    if (borrowedIndex === -1) {
        alert("Buku tidak ditemukan dalam daftar pinjaman!");
        return;
    }

    const book = findBookById(bookId);
    book.stock += 1;
    borrowedBooks.splice(borrowedIndex, 1);

    alert(`✅ Buku "${book.title}" berhasil dikembalikan!`);
}

function viewBorrowedBooks() {
    if (borrowedBooks.length === 0) {
        alert("📋 Tidak ada buku yang sedang dipinjam.");
        return;
    }

    console.log("\n=== Buku yang Sedang Dipinjam ===");
    console.table(borrowedBooks);
}

// Menjalankan aplikasi
mainMenu();
