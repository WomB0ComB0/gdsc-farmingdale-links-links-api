import Database from "../config/database";
import { QueryResult } from "pg";

interface Link {
  id?: number;
  name: string;
  image: string;
  link: string;
  description: string;
}

interface ILinksRepo {
  postLink(data: Link): Promise<void>;
  putLink(data: Link): Promise<void>;
  deleteLink(id: number): Promise<void>;
  getLink(id: number): Promise<Link>;
  getLinks(): Promise<Link[]>;
}

export class LinksRepo implements ILinksRepo{
  private readonly db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  public async postLink(data: Link): Promise<void> {
    try {
      const { name, image, link, description } = data;
      const insertQuery = {
        text: 'INSERT INTO links (name, image, link, description) VALUES ($1, $2, $3, $4)',
        values: [name, image, link, description],
      };
      await this.db.query(insertQuery.text, insertQuery.values);
    } catch (error) {
      throw new Error("Failed to create link!");
    }
  }

  public async putLink(data: Link): Promise<void> {
    try {
      const { id, name, image, link, description } = data;
      const updateQuery = {
        text: 'UPDATE links SET name = $1, image = $2, link = $3, description = $4 WHERE id = $5',
        values: [name, image, link, description, id],
      };
      const result: QueryResult = await this.db.query(updateQuery.text, updateQuery.values);

      if (result.rowCount === 0) {
        throw new Error("Link not found!");
      }
    } catch (error) {
      throw new Error("Failed to update link!");
    }
  }

  public async deleteLink(id: number): Promise<void> {
    try {
      const deleteQuery = {
        text: 'DELETE FROM links WHERE id = $1',
        values: [id],
      };
      const result: QueryResult = await this.db.query(deleteQuery.text, deleteQuery.values);

      if (result.rowCount === 0) {
        throw new Error("Link not found!");
      }
    } catch (error) {
      throw new Error("Failed to delete link!");
    }
  }

  public async getLink(id: number): Promise<Link> {
    try {
      const selectQuery = {
        text: 'SELECT * FROM links WHERE id = $1',
        values: [id],
      };
      const result: QueryResult = await this.db.query(selectQuery.text, selectQuery.values);

      if (result.rows.length === 0) {
        throw new Error("Link not found!");
      }

      return result.rows[0];
    } catch (error) {
      throw new Error("Failed to retrieve link!");
    }
  }

  public async getLinks(): Promise<Link[]> {
    try {
      const selectQuery = {
        text: 'SELECT * FROM links',
      };
      const result: QueryResult = await this.db.query(selectQuery.text);

      return result.rows;
    } catch (error) {
      throw new Error("Failed to retrieve links!");
    }
  }
}
