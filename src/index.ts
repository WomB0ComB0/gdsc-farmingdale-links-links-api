import express, { type Application, type NextFunction, type Request, type Response } from 'express'
import { rateLimit } from 'express-rate-limit'
import { join } from 'path'
import LinksRouter from './routes/LinksRouter'
import { errorHandler } from './middlewares'

const origin = process.env.NODE_ENV === 'production' 
  ? 'https://gdsc-fsc-l.web.app' 
  : 'http://localhost:5173';

class App {
  public app: Application

  constructor () {
    this.app = express()
    this.plugins()
    this.routes()
  }

  private readonly path = join(__dirname, '..', 'static')
  private readonly limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
	  limit: 100,
	  standardHeaders: 'draft-7',
	  legacyHeaders: false,
  })
  
  protected routes (): void {
      this.app.use('/', this.limiter, express.static(this.path));
      this.app.use('/api/links', this.limiter, LinksRouter);
      this.app.use(errorHandler);
  }


  protected plugins (): void {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
        // Handle CORS preflight requests
        this.app.options('/api/links', (_req: Request, res: Response) => {
            res.header('Access-Control-Allow-Origin', origin);
            res.header('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, API-Key, Authorization');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.status(200).send();
        });

        // Middleware to set CORS headers for other requests
        this.app.use((_req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', origin);
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, API-Key, Authorization');
            next();
        });
  }

  protected headers (): void {
    this.app.use(function (_req: Request, res: Response, next: NextFunction) {
      res.header('Access-Control-Allow-Origin', origin)
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, API-Key')
      next()
    })
  }
}

const port: number = 3000
const app = new App().app

if (process.env.NODE_ENV === 'production') {
  app.listen(port, () => {
    console.log('✅ Server started successfully!')
  })
} else {
  app.listen(port, () => {
    console.log(`✅ Server started successfully! http://localhost:${port}`)
  })
}

export default app
