const express = require ("express");
const taskRouter = express.Router();

const { addTask, getAllTasks, getTaskById, deleteTask, updateTask } = require ("../controllers/taskController")
taskRouter.post('/add',addTask);
taskRouter.get('/get',getAllTasks);
taskRouter.get('/getbyid',getTaskById);
taskRouter.delete('/:id',deleteTask);
taskRouter.patch('/update/:id',updateTask)

module.exports = taskRouter;