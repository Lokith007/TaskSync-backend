const mongoose=require("mongoose");

const connectDB=async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/TaskSync");
        console.log("Database connected");
    }catch(err){
        console.log("Connection failed:"+err);
    }    
};

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
  subscription :{
    type:String
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