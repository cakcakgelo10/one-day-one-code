// Manajemen data karyawan

let employees = [
    { id: 1, name: "Reza", age: 23, position: "Software Engineer", salary: 10000000 },
    { id: 2, name: "Fakhri", age: 24, position: "Manager", salary: 5000000 },
];

function generateUniqueId() {
    return employees.length ? Math.max(...employees.map(e => e.id)) + 1 : 1;
}

function mainMenu() {
    while (true) {
        const choice = prompt(`
        === SISTEM MANAJEMEN DATA KARYAWAN ===
        Pilih opsi:
        1. Tambah Karyawan Baru
        2. Lihat Daftar Karyawan
        3. Edit Data Karyawan
        4. Hapus Data Karyawan
        5. Keluar
        `);

        switch (choice) {
            case "1":
                addEmployee();
                break;
            case "2":
                viewEmployee();
                break;
            case "3":
                editEmployee();
                break;
            case "4":
                deleteEmployee();
                break;
            case "5":
                alert("Terima kasih telah menggunakan sistem kami!");
                return;
            default:
                alert("Opsi tidak valid. Silakan coba lagi.");
        }
    }
}

function addEmployee() {
    const name = prompt("Masukkan nama karyawan:").trim();
    const age = parseInt(prompt("Masukkan usia karyawan:"));
    const position = prompt("Masukkan posisi karyawan:").trim();
    const salary = parseInt(prompt("Masukkan gaji karyawan (dalam rupiah):"));

    if (!name || name.trim() === "" || isNaN(age) || age < 18 || !position || position.trim() === "" || isNaN(salary) || salary <= 0) {
        alert("Input tidak valid! Silakan coba lagi.");
        return;
    }

    const id = generateUniqueId();
    employees.push({ id, name, age, position, salary });
    alert("✅ Karyawan berhasil ditambahkan!");
}

function viewEmployee() {
    if (employees.length === 0) {
        console.log("📋 Tidak ada data karyawan.");
    } else {
        console.table(employees);
    }
}

function editEmployee() {
    const id = parseInt(prompt("Masukkan ID karyawan yang ingin diedit:"));
    const employee = employees.find(e => e.id === id);

    if (!employee) {
        alert("Karyawan tidak ditemukan!");
        return;
    }

    const newName = prompt(`Nama baru (${employee.name}):`) || employee.name;
    const newAge = parseInt(prompt(`Usia baru (${employee.age}):`)) || employee.age;
    const newPosition = prompt(`Posisi baru (${employee.position}):`) || employee.position;
    const newSalary = parseInt(prompt(`Gaji baru (${employee.salary}):`)) || employee.salary;

    if (isNaN(newAge) || newAge < 18 || isNaN(newSalary) || newSalary <= 0) {
        alert("Input tidak valid! Perubahan dibatalkan.");
        return;
    }

    employee.name = newName.trim();
    employee.age = newAge;
    employee.position = newPosition.trim();
    employee.salary = newSalary;

    alert("✅ Data karyawan berhasil diperbarui!");
}

function deleteEmployee() {
    const id = parseInt(prompt("Masukkan ID karyawan yang ingin dihapus:"));
    const index = employees.findIndex(e => e.id === id);

    if (index === -1) {
        alert("Karyawan tidak ditemukan!");
        return;
    }

    const confirmDelete = confirm(`Apakah Anda yakin ingin menghapus data karyawan dengan ID ${id}?`);
    if (!confirmDelete) {
        alert("Penghapusan dibatalkan.");
        return;
    }

    employees.splice(index, 1);
    alert("✅ Data karyawan berhasil dihapus!");
}

// Menjalankan aplikasi
mainMenu();
