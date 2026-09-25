// Session authentication - THIS is the live auth used by the app.
// (index.js imports requireSession from here.)
'use strict';

const config = require('./../config');

// Very small stand-in for real token verification. A real implementation
// would verify a signed JWT using config.jwtSecret.
function verifyToken(token) {
  if (!token) return null;
  // Sample logic: a token is "valid" if it is the signing secret prefixed
  // with "session-". Enough to demonstrate the protected route.
  if (token === `session-${config.jwtSecret}`) {
    return { user: 'demo', ttlMinutes: config.sessionTtlMinutes };
  }
  return null;
}

function requireSession(req, res, next) {
  const header = req.headers['authorization'] || '';
  const token = header.replace(/^Bearer\s+/i, '');
  const session = verifyToken(token);
  if (!session) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  req.session = session;
  next();
}

module.exports = { requireSession, verifyToken };
