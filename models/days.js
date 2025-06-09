const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true, default: Date.now },
  endDate: { type: Date },
});

taskSchema.virtual('daysSpent').get(function () {
  const end = this.endDate || new Date();
  const diff = Math.floor((end - this.startDate) / (1000 * 60 * 60 * 24));
  return diff;
});

taskSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Task', taskSchema);
