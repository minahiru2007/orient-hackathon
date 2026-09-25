// Task routes. Mounted under /tasks (session-protected in index.js).
'use strict';

const express = require('express');
const db = require('../db');
const router = express.Router();

// GET /tasks
router.get('/', (req, res) => {
  res.json({ tasks: db.listTasks() });
});

// POST /tasks  { title }
router.post('/', (req, res) => {
  const { title } = req.body || {};
  if (!title) {
    return res.status(400).json({ error: 'title is required' });
  }
  const task = db.addTask(title);
  res.status(201).json(task);
});

module.exports = router;
