import express, { type Application, type NextFunction, type Request, type Response } from 'express'
import { rateLimit } from 'express-rate-limit'
import { join } from 'path'
import Database from './config/database'
import LinksRouter from './routes/LinksRouter'
import { errorHandler } from './middlewares'

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
    const db = new Database()
    db.createLinksTable().then(() => {
      this.app.use('/', this.limiter, express.static(this.path));
      this.app.use('/api/links', this.limiter, LinksRouter);
      this.app.use(errorHandler);
    }).catch((err) => {
      console.error('⚠️ Unable to create links table', err);
    });
  }


  protected plugins (): void {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  protected headers (): void {
    this.app.use(function (_req: Request, res: Response, next: NextFunction) {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, API-Key')
      next()
    })
  }
}

const port: number = 3000
const app = new App().app

app.listen(port, () => {
  console.log('✅ Server started successfully!')
})
