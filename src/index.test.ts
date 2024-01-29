import { test, suite } from "vitest";
import * as assert from 'assert';
import * as dotenv from 'dotenv';
dotenv.config();

const host = 'http://localhost:3000';

suite('API Key Middleware', () => {

  test('should allow access with valid API key', async () => {
    const response = await fetch(host + '/api/links', {
      method: 'GET',
      headers: {
        'API-Key': process.env.PRIVATE_API_KEY as string,
      },
    });
    const responseBody = await response.json();
    
    assert.equal(response.status, 200);
    assert.deepEqual(responseBody, { message: 'Links found!', status: 'Ok!', data: []});
  });

  test('should deny access without API key', async () => {
    const response = await fetch(host + '/api/links');
    const responseBody = await response.json();

    assert.equal(response.status, 401);
    assert.deepEqual(responseBody, { message: 'unauthorized' });
  });

  test('should deny access with invalid API key', async () => {
    const response = await fetch(host + '/api/links', {
      method: 'GET',
      headers: {
        'API-Key': 'invalid_api_key',
      },
    });
    const responseBody = await response.json();

    assert.equal(response.status, 401);
    assert.deepEqual(responseBody, { message: 'unauthorized' });
  });
});


suite('Links API', () => {
  test('should create a new link', async () => {
    const response = await fetch(host + '/api/links', {
      method: 'POST',
      headers: {
        'API-Key': process.env.PRIVATE_API_KEY as string,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Google',
        link: 'https://google.com',
        description: 'Search engine',
      }),
    });
    const responseBody = await response.json();

    assert.equal(response.status, 201);
    assert.deepEqual(responseBody, { message: 'Link created!', status: 'Created!' });
  });

  test('should get all links', async () => {
    const response = await fetch(host + '/api/links', {
      method: 'GET',
      headers: {
        'API-Key': process.env.PRIVATE_API_KEY as string,
      },
    });
    const responseBody = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(responseBody, { message: 'Links found!', status: 'Ok!', data: [{
      id: 1,
      name: 'Google',
      link: 'https://google.com',
      description: 'Search engine',
      image: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
    }]});
  });

  test('should update a link', async () => {
    const response = await fetch(host + '/api/links/1', {
      method: 'PUT',
      headers: {
        'API-Key': process.env.PRIVATE_API_KEY as string,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Google',
        link: 'https://google.com',
        description: 'Search engine',
      }),
    });
    const responseBody = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(responseBody, { message: 'Link updated!', status: 'Updated!' });
  });

  test('should delete a link', async () => {
    const response = await fetch(host + '/api/links/1', {
      method: 'DELETE',
      headers: {
        'API-Key': process.env.PRIVATE_API_KEY as string,
      },
    });
    const responseBody = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(responseBody, { message: 'Link deleted!', status: 'Deleted!' });
  });

  test('should get a link', async () => {
    const response = await fetch(host + '/api/links/1', {
      method: 'GET',
      headers: {
        'API-Key': process.env.PRIVATE_API_KEY as string,
      },
    });
    const responseBody = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(responseBody, { message: 'Link found!', status: 'Ok!', data: {
      id: 1,
      name: 'Google',
      link: 'https://google.com',
      description: 'Search engine',
      image: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
    }});
  });
})