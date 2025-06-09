const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  header: {
    type: String,
    required: true
  },
  description: String,
  dueDate: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  priorityLevel: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low'
  },
  // category: {
  //  type: String,
  //  enum: ['work', 'study', 'personal'],
  //  required: true
  // },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date
  },
  assignedTo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization'
  }
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;