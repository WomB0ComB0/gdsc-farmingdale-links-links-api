"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiKeyMiddleware {
    constructor() { }
    static checkApiKey() {
        return async (req, res, next) => {
            const apiKey = req.get('API-Key');
            if (!apiKey || apiKey !== process.env.PRIVATE_API_KEY) {
                res.status(401).json({ message: 'unauthorized' });
            }
            else {
                next();
            }
        };
    }
}
exports.default = ApiKeyMiddleware;
//# sourceMappingURL=ApiKeyMiddleware.js.map