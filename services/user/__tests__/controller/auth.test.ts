import request from 'supertest';

import { app } from '../../src/server';


describe('auth routes', () => {
  test('jwks ok', async () => {
    const res = await request(app).get('/auth/jwks');
    expect(res.body).toHaveProperty('keys.0.kty', 'RSA');
  });
});
