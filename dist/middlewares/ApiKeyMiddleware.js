"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKeyMiddleware = void 0;
class ApiKeyMiddleware {
    constructor() {
        this.checkApiKey = () => {
            return async (req, res, next) => {
                const apiKey = req.get('API-Key');
                if (!apiKey || apiKey !== process.env.PRIVATE_API_KEY) {
                    res.status(401).json({ message: 'unauthorized' });
                }
                else {
                    next();
                }
            };
        };
    }
}
exports.ApiKeyMiddleware = ApiKeyMiddleware;
//# sourceMappingURL=ApiKeyMiddleware.js.map