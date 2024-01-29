"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = require("express-rate-limit");
const path_1 = require("path");
const database_1 = __importDefault(require("./config/database"));
const LinksRouter_1 = __importDefault(require("./routes/LinksRouter"));
const middlewares_1 = require("./middlewares");
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
        const db = new database_1.default();
        db.createLinksTable().then(() => {
            this.app.use('/', this.limiter, express_1.default.static(this.path));
            this.app.use('/api/links', this.limiter, LinksRouter_1.default);
            this.app.use(middlewares_1.errorHandler);
        }).catch((err) => {
            console.error('⚠️ Unable to create links table', err);
        });
    }
    plugins() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    headers() {
        this.app.use(function (_req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, API-Key');
            next();
        });
    }
}
const port = 3000;
exports.app = new App().app;
exports.app.listen(port, () => {
    console.log('✅ Server started successfully!');
});
//# sourceMappingURL=index.js.map