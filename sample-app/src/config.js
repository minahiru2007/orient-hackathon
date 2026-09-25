// Central configuration. Everything the app needs is read from the
// environment here. NOTE: several of these are read in other files too.
'use strict';

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
      `The app cannot start without it.`
    );
  }
  return value;
}

const config = {
  // Port the HTTP server listens on.
  port: parseInt(process.env.PORT, 10) || 8080,

  // Database connection string. Required. Expected to be a Postgres URL,
  // e.g. postgres://user:pass@localhost:5432/taskflow
  databaseUrl: required('DATABASE_URL'),

  // Secret used to sign session tokens. Required. Without it, auth breaks.
  jwtSecret: required('JWT_SECRET'),

  // How long a login session stays valid.
  sessionTtlMinutes: parseInt(process.env.SESSION_TTL_MINUTES, 10) || 60,

  // Logging verbosity: 'debug' | 'info' | 'warn' | 'error'
  logLevel: process.env.LOG_LEVEL || 'info',
};

module.exports = config;
