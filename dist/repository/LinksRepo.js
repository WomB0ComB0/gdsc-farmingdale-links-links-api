"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinksRepo = void 0;
const LinksModel_1 = require("../models/LinksModel");
class LinksRepo {
    async postLink(data) {
        try {
            await LinksModel_1.Links.create({
                image: data.image,
                link: data.link,
                name: data.name,
                description: data.description
            });
        }
        catch (error) {
            throw new Error("Filed to create link!");
        }
    }
    async putLink(data) {
        try {
            const res = await LinksModel_1.Links.findOne({
                where: {
                    id: data.id
                }
            });
            if (!res) {
                throw new Error("Link not found!");
            }
            res.image = data.image;
            res.link = data.link;
            res.name = data.name;
            res.description = data.description;
        }
        catch (error) {
            throw new Error("Filed to update link!");
        }
    }
    async deleteLink(id) {
        try {
            const res = await LinksModel_1.Links.findOne({
                where: {
                    id: id
                }
            });
            if (!res) {
                throw new Error("Link not found!");
            }
            await res.destroy();
        }
        catch (error) {
            throw new Error("Filed to delete link!");
        }
    }
    async getLink(id) {
        try {
            const res = await LinksModel_1.Links.findOne({
                where: {
                    id: id
                }
            });
            if (!res) {
                throw new Error("Link not found!");
            }
            return res;
        }
        catch (error) {
            throw new Error("Filed to retrieve link!");
        }
    }
    async getLinks() {
        try {
            return await LinksModel_1.Links.findAll();
        }
        catch (error) {
            throw new Error("Filed to retrieve links!");
        }
    }
}
exports.LinksRepo = LinksRepo;
//# sourceMappingURL=LinksRepo.js.map