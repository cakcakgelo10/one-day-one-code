// Sistem Manajemen Gudang Barang dengan Fitur Lanjutan

let inventory = [
    { id: 1, name: "Beras", category: "Makanan", stock: 10, pricePerUnit: 100000 },
    { id: 2, name: "Kayu", category: "Material", stock: 20, pricePerUnit: 200000 },
    { id: 3, name: "Ember", category: "Peralatan", stock: 30, pricePerUnit: 300000 },
];

let stockTransactions = [];

// Menu utama
function mainMenu() {
    while (true) {
        const choice = prompt(`
            === SISTEM MANAJEMEN GUDANG ===
            Pilih opsi:
            1. Tambah Barang Baru
            2. Lihat Daftar Barang
            3. Kelola Stok Barang
            4. Lihat Riwayat Transaksi Stok
            5. Lihat Barang Berdasarkan Kategori
            6. Laporan Pendapatan
            7. Keluar
        `);

        switch (choice) {
            case "1":
                addNewItem();
                break;
            case "2":
                viewItems();
                break;
            case "3":
                manageStock();
                break;
            case "4":
                viewStockTransactions();
                break;
            case "5":
                filterItemsByCategory();
                break;
            case "6":
                generateRevenueReport();
                break;
            case "7":
                alert("Terima kasih telah menggunakan sistem kami!");
                return;
            default:
                alert("Opsi tidak valid. Silakan coba lagi.");
        }
    }
}

// Tambah barang baru
function addNewItem() {
    const name = prompt("Masukkan nama barang:").trim();
    const category = prompt("Masukkan kategori barang:").trim();
    const stock = parseInt(prompt("Masukkan jumlah stok awal:"));
    const pricePerUnit = parseInt(prompt("Masukkan harga per unit:"));

    if (!name || !category || isNaN(stock) || stock <= 0 || isNaN(pricePerUnit) || pricePerUnit <= 0) {
        alert("Input tidak valid! Silakan coba lagi.");
        return;
    }

    const id = inventory.length ? Math.max(...inventory.map(item => item.id)) + 1 : 1;
    inventory.push({ id, name, category, stock, pricePerUnit });
    alert("✅ Barang berhasil ditambahkan!");
}

// Lihat daftar barang
function viewItems() {
    if (inventory.length === 0) {
        console.log("📋 Tidak ada barang di gudang.");
        return;
    }

    console.log("\n=== Daftar Barang ===");
    console.table(inventory);
}

// Kelola stok barang
function manageStock() {
    const itemId = parseInt(prompt("Masukkan ID barang:"));
    const item = inventory.find(i => i.id === itemId);

    if (!item) {
        alert("Barang tidak ditemukan!");
        return;
    }

    const action = prompt("Apakah Anda ingin menambah (+) atau mengurangi (-) stok?");
    const quantity = parseInt(prompt("Masukkan jumlah:"));

    if (isNaN(quantity) || quantity <= 0) {
        alert("Jumlah tidak valid!");
        return;
    }

    if (action === "+") {
        item.stock += quantity;
        stockTransactions.push({ itemId, type: "Tambah", quantity, date: new Date().toISOString() });
        alert("✅ Stok berhasil ditambah!");
    } else if (action === "-") {
        if (item.stock < quantity) {
            alert("Stok tidak mencukupi!");
            return;
        }
        item.stock -= quantity;
        stockTransactions.push({
            itemId,
            type: "Kurangi",
            quantity,
            date: new Date().toISOString(),
            revenue: item.pricePerUnit * quantity,
        });
        alert("✅ Stok berhasil dikurangi!");
    } else {
        alert("Aksi tidak valid!");
    }
}

// Lihat riwayat transaksi stok
function viewStockTransactions() {
    if (stockTransactions.length === 0) {
        console.log("📋 Tidak ada transaksi stok.");
        return;
    }

    console.log("\n=== Riwayat Transaksi Stok ===");
    console.table(stockTransactions);
}

// Filter barang berdasarkan kategori
function filterItemsByCategory() {
    const category = prompt("Masukkan kategori yang ingin dilihat:");
    const filteredItems = inventory.filter(item => item.category.toLowerCase() === category.toLowerCase());

    if (filteredItems.length === 0) {
        console.log(`📋 Tidak ada barang dalam kategori "${category}".`);
        return;
    }

    console.log(`\n=== Daftar Barang dalam Kategori "${category}" ===`);
    console.table(filteredItems);
}

// Laporan pendapatan
function generateRevenueReport() {
    const revenue = stockTransactions
        .filter(t => t.type === "Kurangi" && t.revenue)
        .reduce((sum, t) => sum + t.revenue, 0);

    console.log("\n=== Laporan Pendapatan ===");
    console.log(`Total Pendapatan: Rp${revenue.toLocaleString()}`);
}

// Menjalankan aplikasi
mainMenu();
