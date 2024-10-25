import React, { useState } from 'react';
import axios from 'axios';

function Create({ onAddTask }) {
    const [task, setTask] = useState('');

    const handleAdd = () => {
        if (!task.trim()) {
            alert('Task cannot be empty');
            return;
        }
    
        // Mengirim task baru ke server
        axios.post('http://localhost:4000/add', {
            title: task, // Mengirim 'title' ke backend
            description: '' // Opsional, tambahkan jika diperlukan
        }, {
            headers: {
                'Content-Type': 'application/json' // Set header yang diperlukan
            }
        })
        .then(result => {
            onAddTask(result.data); // Memanggil fungsi dari Home untuk update daftar task
            setTask(''); // Kosongkan input setelah menambah task
        })
        .catch(err => console.error('Error adding task:', err));
    };

    return (
        <div className="create_form">
            <input
                type="text"
                placeholder="Tambah tugas baru"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <button type="button" onClick={handleAdd}>Add</button>
        </div>
    );
}

export default Create;
