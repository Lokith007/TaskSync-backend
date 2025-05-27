const mongoose=require("mongoose");



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
  priorityLevel: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  assignedTo: {
    type: String,   // references userId
    required: true
  },
  organization: {
    type: String,   // references organizationId
    required: true
  },
  completedAt: { 
    type:Date
}
});

const task=mongoose.model("Tasks",taskSchema);
modules.export=task;