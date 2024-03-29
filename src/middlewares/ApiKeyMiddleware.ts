import { RequestHandler } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
class ApiKeyMiddleware {
    private constructor() { }

    public static checkApiKey(): RequestHandler {
        return async (req, res, next) => {
            const apiKey = req.get('API-Key');
            if (!apiKey || apiKey !== process.env.PRIVATE_API_KEY) {
                res.status(401).json({ message: 'unauthorized' });
            } else {
                next();
            }
        };
    }
}

export default ApiKeyMiddleware;
