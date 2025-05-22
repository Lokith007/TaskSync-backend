const mongoose=require("mongoose");

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
    ref: 'Users',  
    required: true
  }]
});

const User=mongoose.model("Users",userSchema);
const Organization = mongoose.model('Organization', organizationSchema);

module.exports = { User, Organization };

// module.exports=User;

