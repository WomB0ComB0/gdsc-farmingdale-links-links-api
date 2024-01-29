"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinksRepo = void 0;
class LinksRepo {
    constructor(db) {
        this.db = db;
    }
    async postLink(data) {
        try {
            const { name, image, link, description } = data;
            const insertQuery = {
                text: 'INSERT INTO links (name, image, link, description) VALUES ($1, $2, $3, $4)',
                values: [name, image, link, description],
            };
            await this.db.query(insertQuery.text, insertQuery.values);
        }
        catch (error) {
            throw new Error("Failed to create link!");
        }
    }
    async putLink(data) {
        try {
            const { id, name, image, link, description } = data;
            const updateQuery = {
                text: 'UPDATE links SET name = $1, image = $2, link = $3, description = $4 WHERE id = $5',
                values: [name, image, link, description, id],
            };
            const result = await this.db.query(updateQuery.text, updateQuery.values);
            if (result.rowCount === 0) {
                throw new Error("Link not found!");
            }
        }
        catch (error) {
            throw new Error("Failed to update link!");
        }
    }
    async deleteLink(id) {
        try {
            const deleteQuery = {
                text: 'DELETE FROM links WHERE id = $1',
                values: [id],
            };
            const result = await this.db.query(deleteQuery.text, deleteQuery.values);
            if (result.rowCount === 0) {
                throw new Error("Link not found!");
            }
        }
        catch (error) {
            throw new Error("Failed to delete link!");
        }
    }
    async getLink(id) {
        try {
            const selectQuery = {
                text: 'SELECT * FROM links WHERE id = $1',
                values: [id],
            };
            const result = await this.db.query(selectQuery.text, selectQuery.values);
            if (result.rows.length === 0) {
                throw new Error("Link not found!");
            }
            return result.rows[0];
        }
        catch (error) {
            throw new Error("Failed to retrieve link!");
        }
    }
    async getLinks() {
        try {
            const selectQuery = {
                text: 'SELECT * FROM links',
            };
            const result = await this.db.query(selectQuery.text);
            return result.rows;
        }
        catch (error) {
            throw new Error("Failed to retrieve links!");
        }
    }
}
exports.LinksRepo = LinksRepo;
//# sourceMappingURL=LinksRepo.js.map