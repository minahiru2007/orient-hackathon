// Health check endpoint.
'use strict';

const express = require('express');
const router = express.Router();

// GET /health
// Returns a basic liveness response.
// NOTE: the README claims this also returns the service version, but it
// does not yet. (This is the intended starter task for a new developer.)
router.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = router;
