// Health check endpoint.
'use strict';

const express = require('express');
const router = express.Router();
const pkg = require('../../package.json');

// GET /health
// Returns a liveness response including the service version.
router.get('/', (req, res) => {
  res.json({ status: 'ok', version: pkg.version });
});

module.exports = router;
