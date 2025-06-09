const express = require('express');
const router = express.Router();
const Task = require('../models/Task');



router.post('/', async (req, res) => {
  try {
    const task = new Task({ name: req.body.name });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.put('/:id/end', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    task.endDate = new Date();
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks.map(task => task.toJSON()));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
