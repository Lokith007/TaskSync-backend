const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  efficiency: {
    type: Number,
    default: 0
  },
  organizations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization'
  }]
});

const User = mongoose.model("User", userSchema);
module.exports = User;