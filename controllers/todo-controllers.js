const Todo = require('../models/todo');

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving todos', error: err.message });
  }
};

const addTodo = async (req, res) => {
  try {
    const { task } = req.body;
    const newTodo = new Todo({ task });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ message: 'Error adding todo', error: err.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error deleting todo', error: err.message });
  }
};

module.exports = { getTodos, addTodo, deleteTodo };
