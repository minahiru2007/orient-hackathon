// LEGACY authentication module.
//
// This was the original auth approach based on API keys. It has been
// replaced by session.js and is no longer imported anywhere in the app.
// It is kept here only because nobody deleted it -- a classic piece of
// dead code that misleads new developers (and the README still points here).
'use strict';

const API_KEYS = ['old-key-1', 'old-key-2'];

function requireApiKey(req, res, next) {
  const key = req.headers['x-api-key'];
  if (!API_KEYS.includes(key)) {
    return res.status(403).json({ error: 'invalid api key' });
  }
  next();
}

module.exports = { requireApiKey };
