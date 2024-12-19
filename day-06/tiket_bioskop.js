// Sistem Pemesanan Tiket Bioskop

let movies = [
    { id: 1, name: "Film A", schedule: "14:00", price: 35000, seats: 30 },
    { id: 2, name: "Film B", schedule: "16:00", price: 40000, seats: 25 },
    { id: 3, name: "Film C", schedule: "18:00", price: 50000, seats: 20 },
];

let orders = JSON.parse(localStorage.getItem("orders")) || []; // Ambil riwayat pemesanan dari localStorage

function mainMenu() {
    let shouldContinue = true;

    while (shouldContinue) {
        const choice = prompt(`
=== SISTEM PEMESANAN TIKET BIOSKOP ===
Pilih opsi:
1. Tampilkan Daftar Film
2. Pesan Tiket
3. Lihat Riwayat Pemesanan
4. Keluar
        `);

        switch (choice) {
            case "1":
                displayMovies();
                break;
            case "2":
                placeOrder();
                break;
            case "3":
                showOrderHistory();
                break;
            case "4":
                alert("Terima kasih telah menggunakan sistem kami!");
                shouldContinue = false;
                break;
            default:
                alert("Opsi tidak valid. Silakan coba lagi.");
        }
    }
}

function displayMovies() {
    console.log("\n=== Daftar Film ===");
    movies.forEach(movie => {
        console.log(`${movie.id}. ${movie.name} - Jam: ${movie.schedule} - Harga: Rp${movie.price.toLocaleString("id-ID")} - Kursi Tersedia: ${movie.seats}`);
    });
}

function placeOrder() {
    displayMovies();
    const movieId = parseInt(prompt("Masukkan ID film yang ingin dipesan:"));

    const selectedMovie = movies.find(movie => movie.id === movieId);

    if (!selectedMovie) {
        alert("Film tidak ditemukan.");
        return;
    }

    const ticketCount = parseInt(prompt(`Masukkan jumlah tiket yang ingin dipesan (Max: ${selectedMovie.seats}):`));

    if (isNaN(ticketCount) || ticketCount <= 0 || ticketCount > selectedMovie.seats) {
        alert("Jumlah tiket tidak valid.");
        return;
    }

    const totalPrice = ticketCount * selectedMovie.price;

    const confirmOrder = confirm(`Anda memesan ${ticketCount} tiket untuk film "${selectedMovie.name}" dengan total harga Rp${totalPrice.toLocaleString("id-ID")}. Konfirmasi pesanan?`);

    if (confirmOrder) {
        selectedMovie.seats -= ticketCount;
        orders.push({
            movie: selectedMovie.name,
            schedule: selectedMovie.schedule,
            ticketCount,
            totalPrice,
        });
        saveOrdersToLocalStorage();
        alert("✅ Tiket berhasil dipesan!");
    } else {
        alert("Pesanan dibatalkan.");
    }
}

function showOrderHistory() {
    if (orders.length === 0) {
        console.log("\n📋 Belum ada riwayat pemesanan.");
        return;
    }

    console.log("\n=== Riwayat Pemesanan ===");
    orders.forEach((order, index) => {
        console.log(`${index + 1}. Film: ${order.movie} - Jam: ${order.schedule} - Jumlah Tiket: ${order.ticketCount} - Total: Rp${order.totalPrice.toLocaleString("id-ID")}`);
    });
}

function saveOrdersToLocalStorage() {
    localStorage.setItem("orders", JSON.stringify(orders));
}

// Menjalankan aplikasi
mainMenu();
