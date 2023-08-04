const { UserRegister } = require("../../Model/User/RegistrationModel");
const { taskModel } = require("../../Model/Task/TodoTaskModel");

// * Controller function to create and post new task
const postTask = async (req, res) => {
  try {
    const { title, description, status, userID } = req.body;

    const newTask = new taskModel({
      title,
      description,
      status,
    });

    await newTask.save();

    await UserRegister.findByIdAndUpdate(userID, {
      $push: { tasks: newTask._id },
    });

    res.status(201).json(newTask);
  } catch (err) {
    console.error(" Found error while creating a task:", err);
    res.status(500).json({ error: "Found error while creating a task:" });
  }
};

//* Controller to get all tasks according to user
const getTasks = async (req, res) => {
  const { email } = req.body;

  try {
    let tasks = await UserRegister.findOne({ email })
      .populate("tasks") // Populate the tasks array with actual task documents
      .exec();
    res.status(200).json(tasks.tasks);
  } catch (err) {
    res.status(400).json({ err: "error found !" });
  }
};

// * Controller to delete task
const deleteTask = async (req, res) => {
  try {
    const taskId = req.query.taskId; // Get the task ID from the URL parameter
    const task = await taskModel.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    const usersWithTask = await UserRegister.find({ tasks: taskId });

    // Loop through each user and remove the task reference from their 'tasks' array
    for (const user of usersWithTask) {
      user.tasks.pull(taskId);
      await user.save();
    }

    // Delete the task
    await task.deleteOne();

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ error: "Error deleting task" });
  }
};

//* Controller to update task
const updateTask = async (req, res) => {
  const { taskId } = req.query;

  try {
    const updatedTask = await taskModel.findByIdAndUpdate(taskId, req.body, {
      new: true,
      runValidators: true,
    });

    // Checking if the task was found and updated successfully
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Returning the updated task as the response
    return res.status(200).json({ data: updatedTask });
  } catch (err) {
    return res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  postTask,
  getTasks,
  deleteTask,
  updateTask,
};
