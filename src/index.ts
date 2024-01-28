import express, { type Application, type NextFunction, type Request, type Response } from 'express'
import Database from './config/database'
import AuthenticationRouter from './routes/AuthenticationRouter'
import LinksRouter from './routes/LinksRouter'
import { join } from 'path'
class App {
  public app: Application

  constructor () {
    this.app = express()
    this.databaseSync()
    this.plugins()
    this.routes()
  }

  private readonly path = join(__dirname, '..', '..', 'static')

  protected routes (): void {
    this.app.use('/', express.static(this.path))
    this.app.use('/api/links', LinksRouter)
    this.app.use('/api/auth', AuthenticationRouter)
  }

  protected databaseSync (): void {
    const db = new Database()
    db.sequelize?.sync()
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
