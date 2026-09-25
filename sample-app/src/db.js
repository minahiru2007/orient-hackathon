// Database layer.
//
// For this sample project the connection is stubbed so the app can run
// without a real Postgres instance installed -- but it still REQUIRES a
// DATABASE_URL to be present (see config.js), the way the real service does.
'use strict';

const config = require('./config');

let connected = false;

function connect() {
  if (!config.databaseUrl.startsWith('postgres://')) {
    // The real service runs on Postgres. A wrong URL scheme is a common
    // setup mistake, so we surface it loudly.
    console.warn(
      `[db] DATABASE_URL does not look like a Postgres URL. Got: ` +
      `${config.databaseUrl.split(':')[0]}://...`
    );
  }
  connected = true;
  return { connected };
}

const tasks = [
  { id: 1, title: 'Write onboarding docs', done: false },
  { id: 2, title: 'Fix the setup script', done: false },
];

function listTasks() {
  if (!connected) throw new Error('Database not connected. Call connect() first.');
  return tasks;
}

function addTask(title) {
  const task = { id: tasks.length + 1, title, done: false };
  tasks.push(task);
  return task;
}

module.exports = { connect, listTasks, addTask };
