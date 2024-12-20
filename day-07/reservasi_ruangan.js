let rooms = [
    { id: 1, name: "Ruangan Rapat", capacity: 10 },
    { id: 2, name: "Ruangan Seminar", capacity: 50 },
    { id: 3, name: "Ruangan Pesta", capacity: 100 },
];

let reservations = JSON.parse(localStorage.getItem("reservations")) || [];

function mainMenu() {
    while (true) {
        const choice = prompt(`
        === SISTEM RESERVASI RUANGAN ===
        Pilih opsi:
        1. Tambah Pemesanan Baru
        2. Lihat Daftar Ruangan
        3. Lihat Jadwal Pemesanan
        4. Cek Ketersediaan Ruangan
        5. Keluar
        `);

        switch (choice) {
            case "1":
                addReservation();
                break;
            case "2":
                displayRooms();
                break;
            case "3":
                viewReservations();
                break;
            case "4":
                checkAvailability();
                break;
            case "5":
                alert("Terima kasih telah menggunakan sistem kami!");
                return;
            default:
                alert("Opsi tidak valid. Silakan coba lagi.");
        }
    }
}

function displayRooms() {
    console.log("\n=== Daftar Ruangan ===");
    rooms.forEach(room => {
        console.log(`${room.id}. ${room.name} - Kapasitas: ${room.capacity} orang`);
    });
}

function addReservation() {
    displayRooms();

    const roomId = parseInt(prompt("Masukkan ID ruangan yang ingin dipesan:"));
    const selectedRoom = rooms.find(room => room.id === roomId);

    if (!selectedRoom) {
        alert("Ruangan tidak ditemukan.");
        return;
    }

    const startTime = prompt("Masukkan waktu cek-in (format: YYYY-MM-DD HH:mm):");
    const endTime = prompt("Masukkan waktu cek-out (format: YYYY-MM-DD HH:mm):");
    const bookerName = prompt("Masukkan nama pemesan:");

    if (!validateInput(startTime, endTime, bookerName)) {
        alert("Input tidak valid! Periksa kembali data Anda.");
        return;
    }

    if (!isRoomAvailable(selectedRoom.id, startTime, endTime)) {
        alert("Ruangan tidak tersedia pada waktu tersebut.");
        return;
    }

    reservations.push({
        roomId: selectedRoom.id,
        roomName: selectedRoom.name,
        startTime,
        endTime,
        bookerName,
    });

    saveReservationsToLocalStorage();
    alert("✅ Pemesanan berhasil dilakukan!");
}

function viewReservations() {
    if (reservations.length === 0) {
        console.log("\n📋 Belum ada jadwal pemesanan.");
        return;
    }

    console.log("\n=== Jadwal Pemesanan ===");
    reservations.forEach((reservation, index) => {
        console.log(`${index + 1}. Ruangan: ${reservation.roomName}`);
        console.log(`   Pemesan: ${reservation.bookerName}`);
        console.log(`   Waktu: ${reservation.startTime} - ${reservation.endTime}`);
    });
}

function checkAvailability() {
    const roomId = parseInt(prompt("Masukkan ID ruangan yang ingin dicek:"));
    const selectedRoom = rooms.find(room => room.id === roomId);

    if (!selectedRoom) {
        alert("Ruangan tidak ditemukan.");
        return;
    }

    const startTime = prompt("Masukkan waktu mulai (format: YYYY-MM-DD HH:mm):");
    const endTime = prompt("Masukkan waktu selesai (format: YYYY-MM-DD HH:mm):");

    if (!validateInput(startTime, endTime)) {
        alert("Input tidak valid! Periksa kembali format waktu.");
        return;
    }

    if (isRoomAvailable(selectedRoom.id, startTime, endTime)) {
        alert("✅ Ruangan tersedia pada waktu tersebut.");
    } else {
        alert("❌ Ruangan tidak tersedia pada waktu tersebut.");
    }
}

function isRoomAvailable(roomId, startTime, endTime) {
    return !reservations.some(reservation => {
        return (
            reservation.roomId === roomId &&
            ((startTime >= reservation.startTime && startTime < reservation.endTime) ||
            (endTime > reservation.startTime && endTime <= reservation.endTime))
        );
    });
}

function validateInput(startTime, endTime, bookerName = null) {
    if (!startTime || !endTime) return false;
    if (bookerName !== null && bookerName.trim() === "") return false;

    const start = new Date(startTime);
    const end = new Date(endTime);

    return start instanceof Date && !isNaN(start) && end instanceof Date && !isNaN(end) && start < end;
}

function saveReservationsToLocalStorage() {
    localStorage.setItem("reservations", JSON.stringify(reservations));
}

mainMenu();
