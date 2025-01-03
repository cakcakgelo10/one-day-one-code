// TO DO List UPGRADE

// Fitur Baru yang Ditambahkan:
// 1. Fitur Edit Pengeluaran
// Pengguna dapat mengedit data pengeluaran yang sudah ada berdasarkan nomor urutnya.

// 2. Fitur Simpan Riwayat ke Local Storage (jika dijalankan di browser)
// Data pengeluaran akan tetap tersimpan meskipun halaman di-refresh.

// 3. Ringkasan Pengeluaran Berdasarkan Kategori
// Tampilkan total pengeluaran untuk setiap kategori dalam bentuk ringkasan.

// 4. Cari Pengeluaran Berdasarkan Nama Item
// Pengguna dapat mencari pengeluaran dengan nama item untuk mempermudah pencarian.

let expenses = JSON.parse(localStorage.getItem("expenses")) || []; // Ambil dari local storage

function mainMenu() {
    let shouldContinue = true;

    while (shouldContinue) {
        const choice = prompt(`
            === SISTEM PENCATATAN PENGELUARAN ===
            Pilih opsi:
            1. Tambah pengeluaran baru
            2. Lihat daftar pengeluaran
            3. Edit pengeluaran
            4. Hitung total pengeluaran
            5. Ringkasan pengeluaran per kategori
            6. Cari pengeluaran berdasarkan nama item
            7. Hapus pengeluaran
            8. Keluar
        `)?.trim();

        if (choice === null) { // Handle tombol Cancel
            alert("Keluar dari aplikasi. Data telah disimpan.");
            saveLocalStorage();
            break;
        }

        switch (choice) {
            case "1":
                addExpense();
                break;
            case "2":
                displayExpenses();
                break;
            case "3":
                editExpense();
                break;
            case "4":
                calculateTotal();
                break;
            case "5":
                displaySummaryByCategory();
                break;
            case "6":
                searchByName();
                break;
            case "7":
                deleteExpense();
                break;
            case "8":
                saveLocalStorage();
                alert("Data telah disimpan. Terima kasih!");
                shouldContinue = false;
                break;
            default:
                alert("Opsi tidak valid. Silahkan coba lagi.");
        }
    }
}

function addExpense() {
    const name = prompt("Masukan nama item:")?.trim();
    const amount = parseFloat(prompt("Masukan jumlah pengeluaran (Rp.):"));
    const category = prompt("Masukan kategori (contoh: makanan, hiburan, transportasi):")?.trim();

    if (!name || isNaN(amount) || amount <= 0 || !category) {
        alert("Input tidak valid. Jumlah harus angka positif dan nama/kategori tidak boleh kosong!");
        return;
    }

    expenses.push({ name, amount, category });
    saveLocalStorage();
    alert("✅ Pengeluaran berhasil ditambahkan!");
}

function displayExpenses() {
    if (expenses.length === 0) {
        console.log("\n📋 Tidak ada pengeluaran yang tercatat.");
        return;
    }

    console.log("\n📋 Daftar Pengeluaran:");
    console.log("=".repeat(40));
    expenses.forEach((expense, index) => {
        console.log(`${index + 1}. ${expense.name} - Rp.${expense.amount.toFixed(2)} (${expense.category})`);
    });
    console.log("=".repeat(40));
}

function editExpense() {
    displayExpenses();
    const index = parseInt(prompt("Masukan nomor pengeluaran yang ingin diedit:")) - 1;

    if (isNaN(index) || index < 0 || index >= expenses.length) {
        alert("Nomor tidak valid.");
        return;
    }

    const name = prompt("Masukan nama item baru:", expenses[index].name)?.trim();
    const amount = parseFloat(prompt("Masukan jumlah pengeluaran baru (Rp.):", expenses[index].amount));
    const category = prompt("Masukan kategori baru:", expenses[index].category)?.trim();

    if (!name || isNaN(amount) || amount <= 0 || !category) {
        alert("Input tidak valid!");
        return;
    }

    expenses[index] = { name, amount, category };
    saveLocalStorage();
    alert("✅ Pengeluaran berhasil diperbarui!");
}

function calculateTotal() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    console.log(`\n💰 Total pengeluaran: Rp.${total.toFixed(2)}`);
}

function displaySummaryByCategory() {
    const summary = {};

    expenses.forEach(expense => {
        if (!summary[expense.category]) {
            summary[expense.category] = 0;
        }
        summary[expense.category] += expense.amount;
    });

    console.log("\n📊 Ringkasan Pengeluaran per Kategori:");
    console.log("=".repeat(40));
    for (const category in summary) {
        console.log(`${category}: Rp.${summary[category].toFixed(2)}`);
    }
    console.log("=".repeat(40));
}

function searchByName() {
    const searchQuery = prompt("Masukan nama item yang dicari:")?.toLowerCase().trim();

    if (!searchQuery) {
        alert("Input tidak valid!");
        return;
    }

    const result = expenses.filter(expense => expense.name.toLowerCase().includes(searchQuery));

    if (result.length === 0) {
        console.log(`\n🔍 Tidak ada pengeluaran dengan nama "${searchQuery}".`);
        return;
    }

    console.log("\n🔍 Hasil Pencarian:");
    console.log("=".repeat(40));
    result.forEach((expense, index) => {
        console.log(`${index + 1}. ${expense.name} - Rp.${expense.amount.toFixed(2)} (${expense.category})`);
    });
    console.log("=".repeat(40));
}

function deleteExpense() {
    displayExpenses();
    const index = parseInt(prompt("Masukkan nomor pengeluaran yang ingin dihapus:")) - 1;

    if (isNaN(index) || index < 0 || index >= expenses.length) {
        alert("Nomor tidak valid.");
        return;
    }

    const deleted = expenses.splice(index, 1);
    saveLocalStorage();
    alert(`🗑️ Pengeluaran "${deleted[0].name}" berhasil dihapus!`);
}

function saveLocalStorage() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

mainMenu();
