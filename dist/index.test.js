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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const vitest_1 = require("vitest");
const assert_1 = __importDefault(require("assert"));
const supertest_1 = __importDefault(require("supertest"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const host = 'http://localhost:3000';
(0, vitest_1.suite)('API Key Middleware', () => {
    const request = (0, supertest_1.default)(index_1.app);
    (0, vitest_1.test)('should allow access with valid API key', async () => {
        const response = await request.get(host + '/api/links').set('API-Key', process.env.PRIVATE_API_KEY).expect(200);
        assert_1.default.equal(response.status, 200);
        assert_1.default.deepEqual(response.body, { message: 'API key is valid' });
    });
    (0, vitest_1.test)('should deny access without API key', async () => {
        const response = await request.get(host + '/api/links').expect(401);
        assert_1.default.deepEqual(response.body, { message: 'unauthorized' });
    });
    (0, vitest_1.test)('should allow access to routes without middleware', async () => {
        const response = await request.get(host).expect(200);
        assert_1.default.deepEqual(response.body, { message: 'This route does not require API key' });
    });
    (0, vitest_1.test)('should deny access with invalid API key', async () => {
        const response = await request.get(host + '/api/links').set('API-Key', 'invalid_api_key').expect(401);
        assert_1.default.deepEqual(response.body, { message: 'unauthorized' });
    });
});
//# sourceMappingURL=index.test.js.map