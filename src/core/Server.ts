import express from 'express'
import { type Client } from '.'
import expressPino from 'express-pino-logger'
import { AuthenticationRouter } from '../Routes/AuthenticationRouter'

export class Server {
    constructor(private readonly client: Client) {
        this.app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*')
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, API-Key')
            next()
        })
        this.app.use(express.json())
        this.app.use('/links', new OneTimePasswordRouter(client).router)
        this.app.use('/auth', new AuthenticationRouter(client).router)
        const pinos = expressPino({
            level: 'debug'
        })

        this.app.use(pinos)

        this.app.all('*', (req, res) => res.sendStatus(404))

        this.app.listen(client.config.PORT, () => {
            client.log(`Server started on PORT : ${client.config.PORT}`)
        })
    }

    private readonly app = express()
}
