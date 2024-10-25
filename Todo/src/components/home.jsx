import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Create from './create';
import { BsFillTrashFill, BsPencilSquare } from 'react-icons/bs';

function Home() {
    const [todos, setTodos] = useState([]);

    // Mengambil data todos dari server saat komponen pertama kali dimuat
    useEffect(() => {
        fetchTodos(); // Fetch tasks pertama kali
    }, []);

    const fetchTodos = () => {
        axios.get('http://localhost:4000/get') // Periksa URL backend
            .then(result => {
                if (Array.isArray(result.data)) {
                    setTodos(result.data); // Update daftar todos
                } else {
                    console.error('Data received from API is not an array', result.data);
                    setTodos([]);
                }
            })
            .catch(err => console.error('Error fetching todos:', err));
    };

    // Fungsi untuk menambah task baru ke state
    const addTaskToList = (newTask) => {
        setTodos([...todos, newTask]); // Tambahkan task baru ke dalam state
    };

    // Fungsi untuk menghapus task
    const handleDelete = (id) => {
        axios.delete(`http://localhost:4000/api/todos/${id}`)
            .then(() => {
                setTodos(todos.filter(todo => todo._id !== id)); // Hapus task dari state
            })
            .catch(err => console.error('Error deleting todo:', err));
    };

    return (
        <div className="home">
            <h2>Todo List</h2>
            {/* Komponen Create menerima props addTaskToList */}
            <Create onAddTask={addTaskToList} />
            <br />
            {todos.length === 0 
                ? <div><h2>No Record</h2></div>
                : todos.map(todo => (
                    <div className="task" key={todo._id}>
                        <div className="checkbox">
                            <p>{todo.title}</p>
                        </div>
                        <div>
                            <span onClick={() => handleDelete(todo._id)}>
                                <BsFillTrashFill className="icon" />
                            </span>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Home;
