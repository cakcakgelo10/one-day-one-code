//  Sistem Manajemen Produk E-commerce

let products = [
    { id: 1, name: "Laptop", price: 15000000, stock: 10 },
    { id: 2, name: "Smartphone", price: 7000000, stock: 20 },
    { id: 3, name: "Tablet", price: 5000000, stock: 15 },
];

function mainMenu() {
    while (true) {
        const choice = prompt(`
        === SISTEM MANAJEMEN PRODUK E-COMMERCE ===
        Pilih opsi:
        1. Tambah Produk Baru
        2. Lihat Daftar Produk
        3. Edit Produk
        4. Hapus Produk
        5. Keluar
        `);

        switch (choice) {
            case "1":
                addProduct();
                break;
            case "2":
                viewProducts();
                break;
            case "3":
                editProduct();
                break;
            case "4":
                deleteProduct();
                break;
            case "5":
                alert("Terima kasih telah menggunakan sistem kami!");
                return;
            default:
                alert("Opsi tidak valid. Silakan coba lagi.");
        }
    }
}

function addProduct() {
    const name = (prompt("Masukkan nama produk:") || "").trim();
    const price = parseInt(prompt("Masukkan harga produk (dalam rupiah):"));
    const stock = parseInt(prompt("Masukkan stok produk:"));

    if (!name || name.length === 0 || isNaN(price) || price <= 0 || isNaN(stock) || stock <= 0) {
        alert("Input tidak valid! Nama harus diisi, harga dan stok harus angka positif.");
        return;
    }

    const id = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    products.push({ id, name, price, stock });
    alert("✅ Produk berhasil ditambahkan!");
}

function viewProducts() {
    if (products.length === 0) {
        console.log("📋 Tidak ada produk dalam katalog.");
        return;
    }

    console.log("\n=== Daftar Produk ===");
    products.forEach(product => {
        console.log(`
            ${product.id}. ${product.name} 
            Harga: Rp${product.price.toLocaleString('id-ID')} - 
            Stok: ${product.stock}`);
    });
}

function editProduct() {
    const id = parseInt(prompt("Masukkan ID produk yang ingin diedit:"));
    const product = products.find(p => p.id === id);

    if (!product) {
        alert("Produk tidak ditemukan!");
        return;
    }

    const newName = prompt(`Nama baru (${product.name}):`).trim() || product.name;
    const newPrice = parseInt(prompt(`Harga baru (${product.price}):`)) || product.price;
    const newStock = parseInt(prompt(`Stok baru (${product.stock}):`)) || product.stock;

    if (newPrice <= 0 || newStock <= 0) {
        alert("Input tidak valid! Perubahan dibatalkan.");
        return;
    }

    product.name = newName;
    product.price = newPrice;
    product.stock = newStock;

    alert("✅ Produk berhasil diperbarui!");
}

function deleteProduct() {
    const id = parseInt(prompt("Masukkan ID produk yang ingin dihapus:"));
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        alert("Produk tidak ditemukan.");
        return;
    }

    products.splice(index, 1);
    alert("✅ Produk berhasil dihapus!");
}

// Jalankan aplikasi
mainMenu();
