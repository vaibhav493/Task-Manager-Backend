const express = require("express");
const {postTask,getTasks, deleteTask, updateTask} = require("../Controller/Task/taskServices")
const {authenticateToken} = require("../Middleware/authenticateToken")
const TaskRouter = express.Router();

TaskRouter.get("/", authenticateToken, getTasks);
TaskRouter.post("/add_new_task", authenticateToken, postTask);
TaskRouter.delete("/delete_task", authenticateToken, deleteTask)
TaskRouter.patch("/update_task", authenticateToken, updateTask);




module.exports = {
  TaskRouter,
};
