"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = require("express-rate-limit");
const path_1 = require("path");
const LinksRouter_1 = __importDefault(require("./routes/LinksRouter"));
const middlewares_1 = require("./middlewares");
const origin = process.env.NODE_ENV === 'production'
    ? 'https://gdsc-fsc-l.web.app'
    : 'http://localhost:5173';
class App {
    constructor() {
        this.path = (0, path_1.join)(__dirname, '..', 'static');
        this.limiter = (0, express_rate_limit_1.rateLimit)({
            windowMs: 15 * 60 * 1000,
            limit: 100,
            standardHeaders: 'draft-7',
            legacyHeaders: false,
        });
        this.app = (0, express_1.default)();
        this.plugins();
        this.routes();
    }
    routes() {
        this.app.use('/', this.limiter, express_1.default.static(this.path));
        this.app.use('/api/links', this.limiter, LinksRouter_1.default);
        this.app.use(middlewares_1.errorHandler);
    }
    plugins() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.options('/api/links', (_req, res) => {
            res.header('Access-Control-Allow-Origin', origin);
            res.header('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, API-Key, Authorization');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.status(200).send();
        });
        this.app.use((_req, res, next) => {
            res.header('Access-Control-Allow-Origin', origin);
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, API-Key, Authorization');
            next();
        });
    }
    headers() {
        this.app.use(function (_req, res, next) {
            res.header('Access-Control-Allow-Origin', origin);
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, API-Key');
            next();
        });
    }
}
const port = 3000;
const app = new App().app;
if (process.env.NODE_ENV === 'production') {
    app.listen(port, () => {
        console.log('✅ Server started successfully!');
    });
}
else {
    app.listen(port, () => {
        console.log(`✅ Server started successfully! http://localhost:${port}`);
    });
}
exports.default = app;
//# sourceMappingURL=index.js.map