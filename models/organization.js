const mongoose = require("mongoose");

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
  admin: [{
    type: String,
    required: true
  }]
});

const Organization = mongoose.model("Organization", organizationSchema);

module.exports = Organization;
