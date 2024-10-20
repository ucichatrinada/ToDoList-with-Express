const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Menghubungkan ke MongoDB tanpa opsi yang sudah usang
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1); // Keluar dari proses jika koneksi gagal
  }
};

module.exports = connectDB;
