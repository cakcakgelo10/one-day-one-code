// Sistem Manajemen Data Karyawan

let employees = [
    {id : 1, name : "Reza", age: 23, position: "Software Engginer", salary: 10000000},
    {id : 2, name : "Fakhri", age: 24, position: "Manager", salary: 5000000},
];

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
                alert("Terimakasih telah menggunakan sistem kami !");
                return;
            default:
                alert("Opsi tidak valid. Silahkan coba lagi.");
        }
    }
}

function addEmployee() {
    const name = prompt("Masukan nama karyawan:").trim();
    const age = parseInt(prompt("Masukan usia karyawan:"));
    const position = prompt("Masukan posisi karyawan:").trim();
    const salary = parseInt(prompt("Masukan gaji karyawan (dalam rupiah):"));

    if (!name || isNaN(age) || age <= 0 || !position || isNaN(salary) || salary <= 0) {
        alert("Input tidak valid silahkan coba lagi");
        return;
    }

    const id = employees.length ? Math.max(...employees.map(e => e.id)) + 1 : 1;
    employees.push({id, name, age, position, salary});
    alert("✅ Karyawan berhasil ditambahkan!");

}

function viewEmployee() {
    if (employees.length === 0) {
        console.log("📋 Tidak ada data karyawan.");
        return;
    }

    console.table(employees);

}

function editEmployee() {
    const id = parseInt(prompt("Masukan id karyawan yang ingin diedit:"));
    const employee = employees.find(e => e.id === id);

    if (!employee) {
        alert("Karyawan tidak ditemukan !");
        return;
    }

    const newName = prompt(`Nama baru (${employee.name}):`) || employee.name;
    const newAge = parseInt(prompt(`Usia baru (${employee.age}):`)) || employee.age;
    const newPosition = prompt(`Posisi baru (${employee.position}):`) || employee.age;
    const newSalary = parseInt(prompt(`Gaji baru (${employee.salary}):`)) || employee.salary;

    if (newAge <= 0 || newSalary <= 0) {
        alert("Input tidak valid !. Perubahan dibatalkan.");
        return;
    }

    employee.name = newName.trim();
    employee.age = newAge;
    employee.position = newPosition.trim();
    employee.salary = newSalary;

    alert("✅ Data karyawan berhasil diperbarui!");
}

function deleteEmployee() {
    const id = parseInt(prompt("Masukan ID karyawan yang ingin dihapus"));
    const index = employees.findIndex(e => e.id === id);

    if (index === -1) {
        alert("Karyawan tidak ditemukan !");
        return;
    }

    employees.splice(index, 1);
    alert("✅ Data karyawan berhasil dihapus!")
}

// menjalakan app
mainMenu();