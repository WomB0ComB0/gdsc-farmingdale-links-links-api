"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
class Database {
    constructor() {
        this.POSTGRES_DB = process.env.POSTGRES_DATABASE;
        this.POSTGRES_HOST = process.env.POSTGRES_HOST;
        this.POSTGRES_PORT = process.env.POSTGRES_PORT;
        this.POSTGRES_USER = process.env.POSTGRES_USER;
        this.POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
        this.pool = new pg_1.Pool({
            user: this.POSTGRES_USER,
            host: this.POSTGRES_HOST,
            database: this.POSTGRES_DB,
            password: this.POSTGRES_PASSWORD,
            port: this.POSTGRES_PORT,
        });
    }
    async query(text, values) {
        const client = await this.pool.connect();
        try {
            return await client.query(text, values);
        }
        finally {
            client.release();
        }
    }
    async createLinksTable() {
        const createTableQuery = `
      DROP TABLE IF EXISTS links;
      CREATE TABLE IF NOT EXISTS links (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        link VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL
      )
    `;
        try {
            await this.pool.query(createTableQuery);
            console.log('🎉 links table created successfully');
        }
        catch (err) {
            console.error('⚠️ error creating links table', err);
        }
    }
    async sendLinksTable(links) {
        try {
            await this.createLinksTable();
            for (const link of links) {
                const insertQuery = {
                    text: 'INSERT INTO links (name, image, link, description) VALUES ($1, $2, $3, $4) RETURNING *',
                    values: [
                        link.name,
                        link.image,
                        link.link,
                        link.description,
                    ],
                };
                await this.query(insertQuery.text, insertQuery.values);
                console.log(`✅ ${link.name} added successfully`);
            }
        }
        catch (err) {
            console.error('⚠️ error sending links', err);
            throw err;
        }
    }
}
exports.default = Database;
//# sourceMappingURL=database.js.map