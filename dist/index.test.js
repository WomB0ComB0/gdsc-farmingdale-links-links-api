"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const assert = __importStar(require("assert"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const host = 'http://localhost:3000';
(0, vitest_1.suite)('API Key Middleware', () => {
    (0, vitest_1.test)('should allow access with valid API key', async () => {
        const response = await fetch(host + '/api/links', {
            method: 'GET',
            headers: {
                'API-Key': process.env.PRIVATE_API_KEY,
            },
        });
        const responseBody = await response.json();
        assert.equal(response.status, 200);
        assert.deepEqual(responseBody, { message: 'Links found!', status: 'Ok!', data: [] });
    });
    (0, vitest_1.test)('should deny access without API key', async () => {
        const response = await fetch(host + '/api/links');
        const responseBody = await response.json();
        assert.equal(response.status, 401);
        assert.deepEqual(responseBody, { message: 'unauthorized' });
    });
    (0, vitest_1.test)('should deny access with invalid API key', async () => {
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
(0, vitest_1.suite)('Links API', () => {
    (0, vitest_1.test)('should create a new link', async () => {
        const response = await fetch(host + '/api/links', {
            method: 'POST',
            headers: {
                'API-Key': process.env.PRIVATE_API_KEY,
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
    (0, vitest_1.test)('should get all links', async () => {
        const response = await fetch(host + '/api/links', {
            method: 'GET',
            headers: {
                'API-Key': process.env.PRIVATE_API_KEY,
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
                }] });
    });
    (0, vitest_1.test)('should update a link', async () => {
        const response = await fetch(host + '/api/links/1', {
            method: 'PUT',
            headers: {
                'API-Key': process.env.PRIVATE_API_KEY,
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
    (0, vitest_1.test)('should delete a link', async () => {
        const response = await fetch(host + '/api/links/1', {
            method: 'DELETE',
            headers: {
                'API-Key': process.env.PRIVATE_API_KEY,
            },
        });
        const responseBody = await response.json();
        assert.equal(response.status, 200);
        assert.deepEqual(responseBody, { message: 'Link deleted!', status: 'Deleted!' });
    });
    (0, vitest_1.test)('should get a link', async () => {
        const response = await fetch(host + '/api/links/1', {
            method: 'GET',
            headers: {
                'API-Key': process.env.PRIVATE_API_KEY,
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
            } });
    });
});
//# sourceMappingURL=index.test.js.map