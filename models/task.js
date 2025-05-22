const mongoose=require("mongoose");

const taskSchema=new mongoose.Schema({
    header:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    dueDate:{
        type:Date,
        required:true
    },
    priorityLevel:{
        type:String,
        enum: ['low', 'medium', 'high'],
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    }
});

const task=mongoose.model("Tasks","TaskSync");
modules.export(task);