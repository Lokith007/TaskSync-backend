const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  friend_id: { type: String, required: true }
});

module.exports = mongoose.model('friendship', friendshipSchema, 'friendship');
