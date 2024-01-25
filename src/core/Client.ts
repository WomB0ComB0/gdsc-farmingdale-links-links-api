import { config as Config } from 'dotenv'
import EventEmitter from 'events'
import type TypedEventEmmiter from 'typed-emitter'
import Baileys, { DisconnectReason, type WACallEvent, fetchLatestBaileysVersion } from '@whiskeysockets/baileys'
import { Server } from './Server'
import { type client } from '../Types'
import { type IConfig } from '../Types/Config'
import { type Boom } from '@hapi/boom'
import { AuthenticationFromDatabase } from './Auth'
import P from 'pino'
import qr from 'qr-image'
import connectDatabase from '../Database/config'

export class Client extends (EventEmitter as new () => TypedEventEmmiter<Events>) {
    private client!: client
    constructor() {
        super()
        Config()
        this.config = {
            name: process.env.NAME || 'API',
            session: process.env.SESSION || 'SESSION',
            PORT: parseInt(process.env.PORT || '3000')
        }
        new Server(this)
        connectDatabase.authenticate()
    }

    public start = async (): Promise<client> => {
        connectDatabase.authenticate()
        const { saveState, state, clearState } = await useDatabaseAuth()
        const { version } = await fetchLatestBaileysVersion()
        const result = (Object.keys(this.client) as Array<keyof typeof this.client>).reduce(
            (acc, key) => ({
                ...acc,
                [key]: this.client[key]
            }),
            this
        )
        Object.assign(this, result)
        this.ev.on('connection.update', (condition) => {
            this.condition = condition
            this.log(`Connection condition is ${condition}`)
        })
        this.ev.on('creds.update', saveState)
        return this.client
    }

    public config: IConfig
    public log = (text: string, error: boolean = false): void => {
        console.log(error ? 'ERROR' : 'OK', `[${this.config.name.toUpperCase()}]`, text)
    }

    public ev!: client['ev']
    public condition!: 'connected' | 'connecting' | 'logged_out'
    public waitForSocketOpen!: client['waitForSocketOpen']
}

\\\
