    //TO-DO LIST

    let tasks = []; // array untuk menyimpan daftar tugas

    function mainMenu() {
        let shouldContinue = true;

        while (shouldContinue) {
            const choice = prompt(`
                === TO-DO LIST ===
                Pilih opsi:
                1. Tambah tugas baru
                2. Lihat daftar tugas
                3. Tandai tugas sebagai selesai
                4. Hapus tugas
                5. Keluar
            `);
            switch (choice) {
                case "1":
                    addTask();
                    break;
                case "2":
                    displayTask();
                    break;
                case "3":
                    markTaskComplete();
                    break;
                case "4":
                    deleteTask();
                    break;
                case "5":
                    shouldContinue = false;
                    alert("Terima kasih! Selamat beristirahat. 😴");
                    break;
                default:
                    alert("Opsi tidak valid. Silahkan coba lagi.");
            }
        }
    }

    function addTask() {
        const description = prompt("Masukan deskripsi tugas:");
        if (description === null || description.trim() === "") {
            alert("Deskripsi tugas tidak boleh kosong !");
            return;
        }

        tasks.push({ description, completed: false });
        alert(`✅ Tugas "${description}" berhasil ditambahkan !`);
    }

    function displayTask() {
        if (tasks.length === 0) {
            alert("📋 Daftar tugas kosong.");
            return;
        }

        let taskList = "📋 Daftar tugas:\n";
        tasks.forEach((task, index) => {
            const status = task.completed ? "[✔]" : "[ ]";
            taskList += `${index + 1}. ${status} ${task.description}\n`;
        });
        alert(taskList);
    }

    function markTaskComplete() {
        displayTask();
        const taskNumber = prompt("Masukan nomor tugas yang ingin ditandai selesai:");

        if (taskNumber === null || isNaN(taskNumber) || taskNumber < 1 || taskNumber > tasks.length) {
            alert("Nomor tugas tidak valid.");
            return;
        }

        tasks[taskNumber - 1].completed = true;
        alert(`✅ Tugas "${tasks[taskNumber - 1].description}" Telah selesai !`);
    }

    function deleteTask() {
        displayTask();
        const taskNumber = prompt("Masukan nomor tugas yang ingin dihapus:");

        if (taskNumber === null || isNaN(taskNumber) || taskNumber < 1 || taskNumber > tasks.length) {
            alert("Nomor tugas tidak valid !");
            return;
        }

        const deletedTask = tasks.splice(taskNumber - 1, 1);
        alert(`🗑️ Tugas "${deletedTask[0].description}" berhasil dihapus !`);
    }

    mainMenu();
