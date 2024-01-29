import { type Request, type Response, type NextFunction, RequestHandler } from 'express'

export class ApiKeyMiddleware {
    private constructor() {}
    public static checkApiKey = (): RequestHandler => {
        return async (req: Request, res: Response, next: NextFunction) => {
            const apiKey = req.get('API-Key')
            if (!apiKey || apiKey !== process.env.PRIVATE_API_KEY) {
                res.status(401).json({ message: 'unauthorized' })
            } else {
                next()
            }
        }
    }
}
