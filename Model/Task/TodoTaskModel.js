const mongoose = require("mongoose");

let TaskSchema = mongoose.Schema({
  title: String,
  description: { type: String, trim: true },
  status: { type: Boolean, default: false },
});

const taskModel = mongoose.model("task", TaskSchema);
module.exports = {
  taskModel,
};
