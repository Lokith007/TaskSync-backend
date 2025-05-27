const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
  organizationName: {
    type: String,
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  admins: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  totalTasks: {
    type: Number,
    default: 0
  }
});

const Organization = mongoose.model("Organization", organizationSchema);
module.exports = Organization;