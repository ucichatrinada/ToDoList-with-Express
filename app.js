require('dotenv').config(); // Pastikan ini ada di bagian atas
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./DB/connect");
const todoRoutes = require("./routes/todo-route");
const authRoutes = require("./routes/auth-routes");
const indexRoutes = require("./routes/index");

const app = express();
const PORT = process.env.PORT || 3000;

// Memuat variabel lingkungan
dotenv.config();

// Menghubungkan ke database
connectDB()
    .then(() => {
        console.log("berhasil connect ke db");
    })
    .catch(() => {
        console.log("gagal konek ke db");
    });

// Middleware untuk parsing JSON
app.use(express.json());

// Menggunakan rute
app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/api", todoRoutes);

// Mendengarkan di port tertentu
app.listen(PORT, () => {
    console.log("server running on PORT " + PORT);
});
