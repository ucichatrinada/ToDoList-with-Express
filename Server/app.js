require('dotenv').config(); // Pastikan ini ada di bagian atas
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./DB/connect");
const todoRoutes = require("./routes/todo-route");
const authRoutes = require("./routes/auth-routes");
const indexRoutes = require("./routes/index");

const TodoModel = require("./models/todo");

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

app.post('/add', (req,res)=>{
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result=> res.json(result))
    .catch(err=>res.json(err))
})
app.get('/get',(req,res) => {
    TodoModel.find()
    .then(result=>res.json(result))
    .catch(err=> res.json(err))
})
app.put('/update/:id',(req,res)=>{
    const {id} = req.params;
    console.log(id);
})
// Mendengarkan di port tertentu
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
    console.log(`Mongo URI: ${process.env.MONGO_URI}`);
});
// Endpoint API
app.get('Server running on PORT ${PORT}', async (req, res) => {
    try {
        const todos = await Todo.find(); // Ambil data dari MongoDB
        res.json(todos); // Kirimkan data sebagai JSON
    } catch (error) {
        res.status(500).json({ message: 'Error fetching todos' });
    }
});
app.delete('/api/todos/:id', (req, res) => {
    const id = req.params.id;  // Pastikan ID ditangkap dengan benar
    TodoModel.findByIdAndDelete(id)
        .then(result => {
            if (result) {
                res.json({ message: 'Todo deleted successfully' });
            } else {
                res.status(404).json({ error: 'Todo not found' });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

