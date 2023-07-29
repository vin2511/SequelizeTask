var db = require("../models");

var Task = db.task;

const addTask = async (req, res) => {
  try {
    const taskData = req.body;
    const task = await Task.create(taskData);
    res.status(200).json({ data: task });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ Message: "Internal server error." });
  }
};

const getTaskById = async (req, res) => {
    try {
      const taskId = req.params.id; // Assuming task ID is passed as a route parameter
      const task = await Task.findByPk(taskId);
      if (!task) {
        return res.status(404).json({ Message: "Task not found." });
      }
      res.status(200).json({ data: task });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ Message: "Internal server error." });
    }
  };

  const getAllTasks = async (req, res) => {
    try {
      const tasks = await Task.findAll();
      res.status(200).json({ data: tasks });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ Message: "Internal server error." });
    }
  };

  const updateTask = async (req, res) => {
    try {
      const taskId = req.params.id; // Assuming task ID is passed as a route parameter
      const taskData = req.body; // Assuming updated task data is sent in the request body
      const task = await Task.findByPk(taskId);
      if (!task) {
        return res.status(404).json({ Message: "Task not found." });
      }
      await task.update(taskData);
      res.status(200).json({ data: task });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ Message: "Internal server error." });
    }
  };

  const deleteTask = async (req, res) => {
    try {
      const taskId = req.params.id; // Assuming task ID is passed as a route parameter
      const task = await Task.findByPk(taskId);
      if (!task) {
        return res.status(404).json({ Message: "Task not found." });
      }
      await task.destroy();
      res.status(204).end();
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ Message: "Internal server error." });
    }
  };
  
  

  
module.exports = { addTask,getAllTasks,getTaskById,updateTask,deleteTask };
