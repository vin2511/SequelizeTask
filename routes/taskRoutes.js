const express = require ("express");
const taskRouter = express.Router();

const { addTask, getAllTasks, getTaskById, deleteTask, updateTask } = require ("../controllers/taskController")
taskRouter.post('/addtask',addTask);
taskRouter.get('/gettask',getAllTasks);
taskRouter.get('/gettaskbyid',getTaskById);
taskRouter.delete('deltask/:id',deleteTask);
taskRouter.patch('/updatetask/:id',updateTask)

module.exports = taskRouter;