import { Pool } from "pg";
import * as dotenv from "dotenv";
dotenv.config();
interface Link {
  id?: number;
  name: string;
  image: string;
  link: string;
  description: string;
}

class Database {
  public pool: Pool;

  private POSTGRES_DB = process.env.POSTGRES_DATABASE as string;
  private POSTGRES_HOST = process.env.POSTGRES_HOST as string;
  private POSTGRES_PORT = process.env.POSTGRES_PORT as unknown as number;
  private POSTGRES_USER = process.env.POSTGRES_USER as string;
  private POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD as string;

  constructor() {
    this.pool = new Pool({
      user: this.POSTGRES_USER,
      host: this.POSTGRES_HOST,
      database: this.POSTGRES_DB,
      password: this.POSTGRES_PASSWORD,
      port: this.POSTGRES_PORT,
    });
  }
  public async query(text: string, values?: any[]) {
    const client = await this.pool.connect();
    try {
      return await client.query(text, values);
    } finally {
      client.release();
    }
  }
  public async createLinksTable(): Promise<void> {
    const createTableQuery = `
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
    } catch (err) {
      console.error('⚠️ error creating links table', err);
    }
  }

  public async sendLinksTable(links: Link[]): Promise<void> {
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
    } catch (err) {
      console.error('⚠️ error sending links', err);
      throw err;
    }
  }
}

export default Database;