"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const LinksModel_1 = require("../models/LinksModel");
const Users_1 = require("../models/Users");
class Database {
    constructor() {
        this.POSTGRES_DB = process.env.POSTGRES_DATABASE;
        this.POSTGRES_HOST = process.env.POSTGRES_HOST;
        this.POSTGRES_PORT = process.env.POSTGRES_PORT;
        this.POSTGRES_USER = process.env.POSTGRES_USER;
        this.POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
        this.connectToPostgreSQL();
    }
    async connectToPostgreSQL() {
        this.sequelize = new sequelize_typescript_1.Sequelize({
            database: this.POSTGRES_DB,
            username: this.POSTGRES_USER,
            password: this.POSTGRES_PASSWORD,
            host: this.POSTGRES_HOST,
            port: this.POSTGRES_PORT,
            dialect: "postgres",
            models: [LinksModel_1.Links, Users_1.Users]
        });
        await this.sequelize
            .authenticate()
            .then(() => {
            console.log("✅ PostgreSQL Connection has been established successfully.");
        })
            .catch((err) => {
            console.log("❌ Unable to connect to the PostgreSQL database:", err);
        });
    }
}
exports.default = Database;
//# sourceMappingURL=database.js.map