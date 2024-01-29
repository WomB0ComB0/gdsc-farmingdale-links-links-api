import { app } from './index';
import { test, suite } from "vitest"
import assert from 'assert';
import supertest from 'supertest';
import * as dotenv from 'dotenv';
dotenv.config();

const host = 'http://localhost:3000'

suite('API Key Middleware', () => {
  const request = supertest(app);

  test('should allow access with valid API key', async () => {
    const response = await request.get(host + '/api/links').set('API-Key', process.env.PRIVATE_API_KEY as string).expect(200);
    assert.equal(response.status, 200);
    assert.deepEqual(response.body, { message: 'API key is valid' });
  });

  test('should deny access without API key', async () => {
    const response = await request.get(host + '/api/links').expect(401);
    assert.deepEqual(response.body, { message: 'unauthorized' });
  });

  test('should allow access to routes without middleware', async () => {
    const response = await request.get(host).expect(200);
    assert.deepEqual(response.body, { message: 'This route does not require API key' });
  });

  test('should deny access with invalid API key', async () => {
    const response = await request.get(host + '/api/links').set('API-Key', 'invalid_api_key').expect(401);
    assert.deepEqual(response.body, { message: 'unauthorized' });
  });
});
