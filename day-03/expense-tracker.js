//Sistem Pencatatan Pengeluaran Harian

// Array untuk menyimpan data pengeluaran
let expenses = [];

// Function untuk menambahkan pengeluaran baru
function addExpense() {
    const name = prompt("Masukan nama item");
    const amount = parseFloat(prompt("Masukan jumlah pengeluaran (Rp):"));
    const category = prompt("Masukan kategori (contoh : makanan, transportasi, hiburan):");

    if (!name || isNaN(amount) || !category) {
        alert("Input tidak valid. Coba lagi");
        return;
    }

    // Tambahkan pengeluaran ke array
    expenses.push({ name, amount, category});
    alert(`Pengeluaran berhasil ditambahkan: ${name} - Rp${amount} (${category})`);
}

    // Fungsi untuk menampilkan daftar pengeluaran
    function displayExpenses(expensesList = expenses) {
        if (expensesList.length === 0) {
            console.log("\nTidak ada pengeluaran yang tercatat.");
            return;
        }

        console.log("\nDaftar pengeluaran:");
        console.table(expensesList);
    }

    // Fungsi untuk menghitung total pengeluaran
    function calculateTotal(expensesList = expenses) {
        const total = expensesList.reduce((sum,expense) => sum + expense.amount, 0);
        console.log(`\nTotal pengeluaran: Rp${total.toFixed(2)}`);
    }

    // Fungsi untuk menyaring pengeluaran berdasarkan kategori
    function filterByCategory() {
        const category = prompt("Masukan kategori untuk disaring:").toLowerCase();
        const filteredExpenses = expenses.filter(expense => expense.category === category);

        if (filteredExpenses.length === 0) {
            console.log(`\nTidak ada pengeluaran dikategori "${category}".`);
            return;
        }

        console.log(`\nPengeluaran dikategori "${category}":`);
        displayExpenses(filteredExpenses);
        calculateTotal(filteredExpenses);
    }

    // Fungsi utama untuk mengelola menu
    function mainMenu() {
        let shouldContinue = true;

        while (shouldContinue) {
            const choice = prompt (`
                Pilih opsi :
                1. Tambahkan pengeluaran
                2. Lihat daftar pengeluaran
                3. Hitung total pengeluaran
                4. Saring pengeluaran berdasarkan kategori
                5. keluar
                `);
                
                if (!choice) { // periksa input kosong/null
                    alert("Input tidak valid. Program akan berhenti.");
                    shouldContinue = false;
                    return;
                    
                }

                switch (choice) {
                    case "1":
                        addExpense();
                        break;
                    case "2":
                        displayExpenses();
                        break;
                    case "3":
                        calculateTotal();
                        break;
                    case "4":
                        filterByCategory();
                        break;
                    case "5":
                        shouldContinue = false;
                        alert("Terimakasih telah menggunakan aplikasi ini !")
                        break;
                    default:
                        alert("Pilihan tidak valid. Silahkan coba lagi.");
                }
        }
    }

    // Menjalankan aplikasi
    mainMenu();