// SISTEM PEMESANAN TIKET TRANSPORTASI (HARI KE-15)
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); // Pastikan file User.js sudah dibuat
const Ticket = require("./models/Ticket"); // Pastikan file Ticket.js sudah dibuat

mongoose.connect("mongodb://127.0.0.1:27017/tiket", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const ticketApp = express();
ticketApp.use(express.json());
const SECRET_KEY = "supersecretkey";

// Middleware autentikasi
function authenticate(req, res, next) {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Token diperlukan." });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ error: "Token tidak valid." });
    }
}

// Registrasi pengguna
app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "Registrasi berhasil." });
});

// Login pengguna
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Email atau kata sandi salah." });
    }

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
});

// Membuat pemesanan tiket
app.post("/tickets", authenticate, async (req, res) => {
    const { jenisTransportasi, jadwalKeberangkatan, harga } = req.body;

    const ticket = new Ticket({
        userId: req.user.id,
        jenisTransportasi,
        jadwalKeberangkatan,
        harga,
    });

    await ticket.save();
    res.status(201).json({ message: "Tiket berhasil dipesan." });
});

// Melihat tiket pengguna
app.get("/tickets", authenticate, async (req, res) => {
    const tickets = await Ticket.find({ userId: req.user.id });
    res.json(tickets);
});

// Menghapus tiket
app.delete("/tickets/:id", authenticate, async (req, res) => {
    const ticket = await Ticket.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

    if (!ticket) {
        return res.status(404).json({ error: "Tiket tidak ditemukan." });
    }

    res.json({ message: "Tiket berhasil dihapus." });
});

ticketApp.listen(4000, () => console.log("Server tiket berjalan di http://localhost:4000"));