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
        required:true
    }
});

const task=mongoose.model("Tasks","TaskSync");
modules.export(task);