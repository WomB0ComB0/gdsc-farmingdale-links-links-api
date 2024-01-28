"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LinksModel_1 = require("../models/LinksModel");
const LinksRepo_1 = require("../repository/LinksRepo");
class LinksController {
    async postLink(req, res) {
        try {
            const links = new LinksModel_1.Links();
            const { image, link, name, description } = req.body;
            links.image = image;
            links.link = link;
            links.name = name;
            links.description = description;
            await new LinksRepo_1.LinksRepo().postLink(links);
            res.status(201).json({ status: "Created!", message: "Link created!" });
        }
        catch (error) {
            res.status(500).json({ status: "Internal Server Error!", message: "Internal Server Error!", });
        }
    }
    async putLink(req, res) {
        try {
            const id = parseInt(req.params['id']);
            const links = new LinksModel_1.Links();
            const { image, link, name, description } = req.body;
            links.id = id;
            links.image = image;
            links.link = link;
            links.name = name;
            links.description = description;
            await new LinksRepo_1.LinksRepo().putLink(links);
            res.status(200).json({ status: "Updated!", message: "Link updated!" });
        }
        catch (error) {
            res.status(500).json({ status: "Internal Server Error!", message: "Internal Server Error!", });
        }
    }
    async deleteLink(req, res) {
        try {
            const id = parseInt(req.params['id']);
            await new LinksRepo_1.LinksRepo().deleteLink(id);
            res.status(200).json({ status: "Deleted!", message: "Link deleted!" });
        }
        catch (error) {
            res.status(500).json({ status: "Internal Server Error!", message: "Internal Server Error!", });
        }
    }
    async getLink(req, res) {
        try {
            const id = parseInt(req.params['id']);
            const link = await new LinksRepo_1.LinksRepo().getLink(id);
            res.status(200).json({ status: "Ok!", message: "Link found!", data: link });
        }
        catch (error) {
            res.status(500).json({ status: "Internal Server Error!", message: "Internal Server Error!", });
        }
    }
    async getLinks(_req, res) {
        try {
            const links = await new LinksRepo_1.LinksRepo().getLinks();
            res.status(200).json({ status: "Ok!", message: "Links found!", data: links });
        }
        catch (error) {
            res.status(500).json({ status: "Internal Server Error!", message: "Internal Server Error!", });
        }
    }
}
exports.default = new LinksController();
//# sourceMappingURL=LinksController.js.map