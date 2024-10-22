const express = require("express");
const { validateToken, checkRole } = require("../middleware/auth");
const { getAllTodo, getTodoById, addTodo, editTodoById, deleteTodoById, deleteAllTodo } = require("../controllers/todo-controller");

const router = express.Router();

router.get("/", getAllTodo);
router.get("/:id", getTodoById);
router.post("/", validateToken, addTodo);
router.put("/:id", validateToken, editTodoById);
router.delete("/:id", validateToken, checkRole, deleteTodoById);
router.delete("/", validateToken, checkRole, deleteAllTodo);

module.exports = router;
