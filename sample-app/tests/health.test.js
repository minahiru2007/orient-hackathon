// Health endpoint tests.
//
// The second test currently FAILS: /health does not yet return a version.
// Making it pass is the intended starter task for a newly-onboarded
// developer (and the verification step for the Orient onboarding pack).
'use strict';

const request = require('supertest');
const { app } = require('../src/index');
const pkg = require('../package.json');

describe('GET /health', () => {
  it('returns status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  it('returns the service version matching package.json', async () => {
    const res = await request(app).get('/health');
    expect(res.body.version).toBe(pkg.version);
  });
});
