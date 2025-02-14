//koversi suhu

//function konversi celcius ke fahrenheit
function celciusToFahrenheit(celcius) {
    return(celcius* 9/5) + 32;
}

//function konversi fahrenheit ke celcius
function fahrenheitToCelcius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

//meminta input dari pengguna
let conversionType = prompt("Pilih jenis konversi:\n1. Celcius ke Fahrenheit\n2. Fahrenheit ke Celcius");

if (conversionType === "1") {
    let celcius = parseFloat(prompt("Masukan suhu dalam Celcius"));
    let fahrenheit = celciusToFahrenheit(celcius);
    console.log(`${celcius}°C adalah ${fahrenheit.toFixed(2)}°F`);
    } else if (conversionType === "2") {
    let fahrenheit = parseFloat(prompt("Masukan suhu dalam Fahrenheit:"));
    let celcius = fahrenheitToCelcius(fahrenheit);
    console.log(`${fahrenheit}°F adalah ${celcius.toFixed(2)}°C`);
} else {
    console.log("Pilihan tidak valid. Silahkan coba lagi");
}