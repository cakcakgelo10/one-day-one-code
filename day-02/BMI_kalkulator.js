    // kalkulator BMI

    // function untuk menghitung BMI
    function calculateBMi(weight, height) {
        return weight / (height * height);
    }

    //function untuk menentukan kategori BMI
    function getBMICategory(bmi) {
        if (bmi < 18.5) {
            return "Kurus";
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            return "Normal";
        } else if (bmi >= 25 && bmi <= 29.9) {
            return "Overweight";
        } else {
            return "Obesitas";
        }
        
    }

    // meminta input dari pengguna
    let weight = parseFloat(prompt("Masukan berat badan anda (kg):"));
    let height = parseFloat(prompt("Masukan tinggi badan anda (meter)"));

    // validasi input
    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        console.log("Input tidak valid. Pastikan anda memasukan angka positif.");
    } else {
        // Hitung BMI
        let bmi = calculateBMi(weight, height);

        // Tentukan kategori BMI
        let category = getBMICategory(bmi);

        // Tampilkan hasil
        console.log(`BMI anda adalah ${bmi.toFixed(2)}.`);
        console.log(`Kategori BMI anda: ${category}.`);
    }