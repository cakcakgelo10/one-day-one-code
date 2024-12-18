// Sistem Manajemen Inventaris Barang
let inventory = JSON.parse(localStorage.getItem("inventory")) || []; // Ambil data dari localStorage

function mainMenu() {
    let shouldContinue = true;

    while (shouldContinue) {
        const choice = prompt(`
=== SISTEM MANAJEMEN INVENTARIS BARANG ===
Pilih opsi:
1. Tambah barang baru
2. Lihat daftar inventaris
3. Perbarui informasi barang
4. Cari barang berdasarkan nama
5. Hitung total nilai stok
6. Hapus barang
7. Ringkasan barang per kategori
8. Statistik stok barang
9. Penyesuaian harga barang
10. Keluar
        `);

        switch (choice) {
            case "1":
                addItem();
                break;
            case "2":
                displayInventory();
                break;
            case "3":
                updateItem();
                break;
            case "4":
                searchItem();
                break;
            case "5":
                calculateTotalValue();
                break;
            case "6":
                deleteItem();
                break;
            case "7":
                summaryByCategory();
                break;
            case "8":
                stockStatistics();
                break;
            case "9":
                adjustPrices();
                break;
            case "10":
                saveToLocalStorage();
                alert("Data telah disimpan. Terima kasih!");
                shouldContinue = false;
                break;
            default:
                alert("Opsi tidak valid. Silakan coba lagi.");
        }
    }
}

function addItem() {
    const name = prompt("Masukkan nama barang:");
    const stock = parseInt(prompt("Masukkan jumlah stok (unit):"));
    const category = prompt("Masukkan kategori barang:");
    const price = parseFloat(prompt("Masukkan harga per unit (Rp):"));

    if (!name || isNaN(stock) || stock <= 0 || !category || isNaN(price) || price <= 0) {
        alert("Input tidak valid. Silakan coba lagi.");
        return;
    }

    inventory.push({ name, stock, category, price });
    saveToLocalStorage();
    alert("✅ Barang berhasil ditambahkan!");
}

function displayInventory() {
    if (inventory.length === 0) {
        console.log("\n📋 Inventaris kosong.");
        return;
    }

    console.log("\n📋 Daftar Inventaris:");
    inventory.forEach((item, index) => {
        console.log(
            `${index + 1}. ${item.name} - ${item.stock} unit (Kategori: ${item.category}) - Rp${item.price.toLocaleString("id-ID", { minimumFractionDigits: 2 })}`
        );
    });
}

function updateItem() {
    displayInventory();
    const index = parseInt(prompt("Masukkan nomor barang yang ingin diperbarui:")) - 1;

    if (index < 0 || index >= inventory.length || isNaN(index)) {
        alert("Nomor tidak valid.");
        return;
    }

    const name = prompt("Masukkan nama baru:", inventory[index].name) || inventory[index].name;
    const stock = parseInt(prompt("Masukkan stok baru:", inventory[index].stock)) || inventory[index].stock;
    const category = prompt("Masukkan kategori baru:", inventory[index].category) || inventory[index].category;
    const price = parseFloat(prompt("Masukkan harga baru:", inventory[index].price)) || inventory[index].price;

    if (isNaN(stock) || stock <= 0 || isNaN(price) || price <= 0) {
        alert("Input tidak valid.");
        return;
    }

    inventory[index] = { name, stock, category, price };
    saveToLocalStorage();
    alert("✅ Informasi barang berhasil diperbarui!");
}

function searchItem() {
    const query = prompt("Masukkan nama barang yang ingin dicari:").toLowerCase();
    const result = inventory.filter(item => item.name.toLowerCase().includes(query));

    if (result.length === 0) {
        console.log(`\n🔍 Tidak ada barang dengan nama "${query}".`);
        return;
    }

    console.log("\n🔍 Hasil Pencarian:");
    result.forEach((item, index) => {
        console.log(
            `${index + 1}. ${item.name} - ${item.stock} unit (Kategori: ${item.category}) - Rp${item.price.toLocaleString("id-ID", { minimumFractionDigits: 2 })}`
        );
    });
}

function calculateTotalValue() {
    const total = inventory.reduce((sum, item) => sum + item.stock * item.price, 0);
    console.log(`\n💰 Total nilai stok: Rp${total.toLocaleString("id-ID", { minimumFractionDigits: 2 })}`);
}

function deleteItem() {
    displayInventory();
    const index = parseInt(prompt("Masukkan nomor barang yang ingin dihapus:")) - 1;

    if (index < 0 || index >= inventory.length || isNaN(index)) {
        alert("Nomor tidak valid.");
        return;
    }

    const deleted = inventory.splice(index, 1);
    saveToLocalStorage();
    alert(`🗑️ Barang "${deleted[0].name}" berhasil dihapus!`);
}

function summaryByCategory() {
    const summary = {};

    inventory.forEach(item => {
        if (!summary[item.category]) {
            summary[item.category] = 0;
        }
        summary[item.category] += 1;
    });

    console.log("\n📊 Ringkasan Barang per Kategori:");
    for (const category in summary) {
        console.log(`${category}: ${summary[category]} barang`);
    }
}

function stockStatistics() {
    if (inventory.length === 0) {
        console.log("\n📋 Tidak ada barang untuk dianalisis.");
        return;
    }

    const maxStockItem = inventory.filter(item => item.stock === Math.max(...inventory.map(i => i.stock)));
    const minStockItem = inventory.filter(item => item.stock === Math.min(...inventory.map(i => i.stock)));

    console.log("\n📈 Barang dengan stok tertinggi:");
    maxStockItem.forEach(item => console.log(`- ${item.name} (${item.stock} unit)`));

    console.log("\n📉 Barang dengan stok terendah:");
    minStockItem.forEach(item => console.log(`- ${item.name} (${item.stock} unit)`));
}

function adjustPrices() {
    const percentage = parseFloat(prompt("Masukkan persentase penyesuaian harga (contoh: 10 untuk kenaikan 10%):"));

    if (isNaN(percentage) || percentage === 0) {
        alert("Input tidak valid.");
        return;
    }

    inventory.forEach(item => {
        item.price += item.price * (percentage / 100);
    });

    saveToLocalStorage();
    alert(`✅ Harga barang berhasil disesuaikan sebesar ${percentage}%.`);
}

function saveToLocalStorage() {
    localStorage.setItem("inventory", JSON.stringify(inventory));
}

// Menjalankan aplikasi
mainMenu();
