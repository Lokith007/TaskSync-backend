const mongoose=require('mongoose');

const RemainderSchema= new mongoose.schema({
    UserId:  {
    type: String,
    required: true,
    unique: true
  },
    TaskId :{
        type :String,
        required:true
    },
    dueTime :{
        type:Date,
        required:true
    },
    subscription:{
        type:String,
        required:true,
        default:true
    }
});

const Remainder =mongoose.model("Remainder",RemainderSchema);
module.exports=Remainder;