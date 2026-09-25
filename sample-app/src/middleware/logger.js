// Request logger. Verbosity controlled by LOG_LEVEL (see config.js).
'use strict';

const config = require('./../config');

const LEVELS = { debug: 0, info: 1, warn: 2, error: 3 };

function logger(req, res, next) {
  const threshold = LEVELS[config.logLevel] ?? LEVELS.info;
  if (LEVELS.info >= threshold) {
    console.log(`${req.method} ${req.url}`);
  }
  next();
}

module.exports = logger;
