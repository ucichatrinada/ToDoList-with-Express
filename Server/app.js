require('dotenv').config();
const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv");
const connectDB = require("./DB/connect");
const todoRoutes = require("./routes/todo-route");
const authRoutes = require("./routes/auth-routes");
const indexRoutes = require("./routes/index");

const path = require('path');

const Todo = require("./models/todo");

const app = express();
const PORT = process.env.PORT || 4000;

// Load environment variables
dotenv.config();

// Connect to database
connectDB()
    .then(() => {
        console.log("berhasil connect ke db");
    })
    .catch(() => {
        console.log("gagal konek ke db");
    });

// CORS Middleware
const corsOptions = {
    origin: 'http://localhost:5173', // Izinkan frontend dari localhost:5173
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Metode yang diizinkan
    allowedHeaders: ['Content-Type'], // Header yang diizinkan
};
app.use(cors(corsOptions));

// Middleware untuk parsing JSON
app.use(express.json());

// ** Middleware untuk melayani file statis **
app.use(express.static(path.join(__dirname, '../Todo/build'))); // Sesuaikan path dengan lokasi frontend Anda

// ** Route untuk halaman utama **
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Todo/build', 'index.html'));
});

// Routes
app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/api", todoRoutes);

// POST: Menambah task baru
app.post('/add', (req, res) => {
    console.log('Request body:', req.body); // Lihat data yang diterima dari frontend
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    Todo.create({
        title,
        description: description || '',
        completed: false,
    })
    .then(result => res.json(result))
    .catch(err => {
        console.error('Error saving task:', err);
        res.status(500).json({ error: err.message });
    });
});



// GET: Mengambil semua tasks
app.get('/get', (req, res) => {
    Todo.find()
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: err.message }));
});

// PUT: Memperbarui task
app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { task, completed } = req.body;
    Todo.findByIdAndUpdate(id, { task, completed }, { new: true })
        .then(result => {
            if (result) {
                res.json(result);
            } else {
                res.status(404).json({ message: "Task not found" });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

// DELETE: Menghapus task
app.delete('/api/todos/:id', (req, res) => {
    const id = req.params.id;
    Todo.findByIdAndDelete(id)
        .then(result => {
            if (result) {
                res.json({ message: 'Todo deleted successfully' });
            } else {
                res.status(404).json({ error: 'Todo not found' });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
    console.log(`Mongo URI: ${process.env.MONGO_URI}`);
});
