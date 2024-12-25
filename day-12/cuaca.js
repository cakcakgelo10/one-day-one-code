// Sistem Analisis Data Cuaca

let weatherData = []; // Data cuaca akan disimpan di array ini

function mainMenu() {
    while (true) {
        const choice = prompt(`
            === SISTEM ANALISIS DATA CUACA ===
            Pilih opsi:
            1. Tambah Data Cuaca Harian
            2. Lihat Semua Data Cuaca
            3. Statistik Cuaca
            4. Pencarian Data Berdasarkan Tanggal
            5. Prediksi Cuaca Sederhana
            6. Keluar
        `);
        
        switch (choice) {
            case "1":
                addWeatherData();
                break;
            case "2":
                viewWeatherData();
                break;
            case "3":
                displayWeatherStatistics();
                break;
            case "4":
                searchWeatherByDate();
                break;
            case "5":
                predictNextDayWeather();
                break;
            case "6":
                alert("Terima kasih sudah menggunakan sistem ini.");
                return;                                       
            default:
                alert("Pilihan tidak valid. Silakan coba lagi.");
        }
    }
}

// Tambah Data Cuaca Harian
function addWeatherData() {
    const date = prompt("Masukkan tanggal (YYYY-MM-DD):").trim();
    const temperature = parseFloat(prompt("Masukkan suhu (°C):"));
    const humidity = parseFloat(prompt("Masukkan tingkat kelembaban (%):"));
    const rainfall = parseFloat(prompt("Masukkan curah hujan (mm):"));

    if (!date.match(/^\d{4}-\d{2}-\d{2}$/) || isNaN(temperature) || isNaN(humidity) || isNaN(rainfall)) {
        alert("Input tidak valid! Format tanggal harus YYYY-MM-DD, dan nilai numerik harus valid.");
        return;
    }

    if (weatherData.some(d => d.date === date)) {
        alert("Data untuk tanggal ini sudah ada. Silakan perbarui atau masukkan tanggal lain.");
        return;
    }

    weatherData.push({ date, temperature, humidity, rainfall });
    alert("✅ Data cuaca berhasil ditambahkan!");
}

// Lihat Semua Data Cuaca
function viewWeatherData() {
    if (weatherData.length === 0) {
        console.log("📋 Tidak ada data cuaca.");
        return;
    }

    console.log("\n=== Data Cuaca ===");
    console.table(weatherData);
}

// Statistik data
function displayWeatherStatistics() {
    if (weatherData.length === 0) {
        console.log("📋 Tidak ada data untuk dihitung statistik.");
        return;
    }

    const temperatures = weatherData.map(d => d.temperature);
    const humidities = weatherData.map(d => d.humidity);
    const rainfalls = weatherData.map(d => d.rainfall);

    const avgTemp = (temperatures.reduce((sum, t) => sum + t, 0) / temperatures.length).toFixed(2);
    const maxTemp = Math.max(...temperatures);
    const minTemp = Math.min(...temperatures);
    const avgHumidity = (humidities.reduce((sum, h) => sum + h, 0) / humidities.length).toFixed(2);
    const totalRainfall = rainfalls.reduce((sum, r) => sum + r, 0).toFixed(2);

    console.log(`
        === Statistik Cuaca ===
        Suhu Rata-rata: ${avgTemp}°C
        Suhu Maksimum: ${maxTemp}°C
        Suhu Minimum: ${minTemp}°C
        Kelembaban Rata-rata: ${avgHumidity}%
        Total Curah Hujan: ${totalRainfall} mm
    `);
}

// Pencarian Data Berdasarkan Tanggal
function searchWeatherByDate() {
    const date = prompt("Masukkan tanggal (YYYY-MM-DD):").trim();
    if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        alert("Format tanggal tidak valid! Gunakan format YYYY-MM-DD.");
        return;
    }

    const result = weatherData.find(d => d.date === date);

    if (!result) {
        console.log(`📋 Tidak ada data untuk tanggal ${date}.`);
        return;
    }

    console.log(`
        === Data Cuaca pada ${date} ===
        Suhu: ${result.temperature}°C
        Kelembaban: ${result.humidity}%
        Curah Hujan: ${result.rainfall} mm
    `);
}

// Prediksi cuaca sederhana
function predictNextDayWeather() {
    if (weatherData.length < 7) {
        alert("📋 Data tidak cukup untuk membuat prediksi (minimal 7 hari).");
        return;
    }

    const last7Days = weatherData.slice(-7);
    const avgTemp = (last7Days.reduce((sum, d) => sum + d.temperature, 0) / 7).toFixed(2);

    alert(`📊 Prediksi rata-rata suhu untuk hari berikutnya adalah ${avgTemp}°C.`);
}

// Menjalankan aplikasi
mainMenu();
