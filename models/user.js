const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  efficiency: {
    type: Number,
    required: true
  },
   subscription :{
    type:String
  },
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
