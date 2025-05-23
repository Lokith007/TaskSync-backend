const mongoose=require("mongoose");

const connectDB=async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/TaskSync");
        console.log("Database connected");
    }catch(err){
        console.log("Connection failed:"+err);
    }    
};

const userSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        unique:true
    },
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    efficiency:{
      type:Number,
      required:true
    }
});

const organizationSchema = new mongoose.Schema({
  organizationId: { 
    type: String,
    unique: true,
    required: true
  },
  organizationName: {
    type: String,
    required: true
  },
  members: [{
    type: String,
    required: true
  }],
  admin:[{
    type: String,
    required: true
  }]
});

const User=mongoose.model("Users",userSchema);
const Organization = mongoose.model('Organization', organizationSchema);

module.exports = { User, Organization };

// module.exports=User;

