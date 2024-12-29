const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    jenisTransportasi: {
        type: String,
        required: true,
        enum: ["Kereta Api", "Pesawat", "Bus", "Kapal"],
    },
    jadwalKeberangkatan: {
        type: Date,
        required: true,
    },
    harga: {
        type: Number,
        required: true,
        min: 0,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Ticket", ticketSchema);