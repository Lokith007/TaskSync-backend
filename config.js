const mongoose=require("mongoose");

const connectDB=async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/TaskSync");
        console.log("Database connected");
    }catch(err){
        console.log("Connection failed:"+err);
    }    
};

module.exports=connectDB;


