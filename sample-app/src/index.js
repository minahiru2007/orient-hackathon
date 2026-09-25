// TaskFlow API - entry point.
'use strict';

const express = require('express');
const config = require('./config');
const db = require('./db');
const logger = require('./middleware/logger');
const healthRoutes = require('./routes/health');
const taskRoutes = require('./routes/tasks');
const { requireSession } = require('./auth/session');

const app = express();
app.use(express.json());
app.use(logger);

// Public
app.use('/health', healthRoutes);

// Protected
app.use('/tasks', requireSession, taskRoutes);

function start() {
  db.connect();
  app.listen(config.port, () => {
    console.log(`TaskFlow API listening on port ${config.port}`);
  });
}

if (require.main === module) {
  start();
}

module.exports = { app, start };
