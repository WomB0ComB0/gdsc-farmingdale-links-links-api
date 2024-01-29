"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const open_graph_scraper_1 = __importDefault(require("open-graph-scraper"));
const constants_1 = require("../constants");
class LinksController {
    constructor(linksRepo) {
        this.linksRepo = linksRepo;
        this.postLink = this.postLink.bind(this);
        this.putLink = this.putLink.bind(this);
        this.deleteLink = this.deleteLink.bind(this);
        this.getLink = this.getLink.bind(this);
        this.getLinks = this.getLinks.bind(this);
    }
    async fetchImageLinkFromURL(url) {
        var _a, _b;
        const options = {
            url,
            fetchOptions: { headers: { 'user-agent': constants_1.userAgent } }
        };
        try {
            const { result } = await (0, open_graph_scraper_1.default)(options);
            return ((_b = (_a = result.ogImage) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.url) || 'https://placehold.co/48x48';
        }
        catch (error) {
            console.error('Error fetching image link:', error);
            return 'https://placehold.co/48x48';
        }
    }
    async postLink(req, res) {
        try {
            const { link, name, description } = req.body;
            const image = await this.fetchImageLinkFromURL(link);
            const linkData = {
                name,
                link,
                description,
                image
            };
            await this.linksRepo.postLink(linkData);
            res.status(201).json({ status: "Created!", message: "Link created!" });
        }
        catch (error) {
            console.error("⚠️ error posting link", error);
            res.status(500).json({ status: "Internal Server Error!", message: "Internal Server Error!" });
        }
    }
    async putLink(req, res) {
        try {
            const id = parseInt(req.params['id']);
            console.log('id', id);
            const { link, name, description } = req.body;
            const image = await this.fetchImageLinkFromURL(link);
            const linkData = {
                id,
                name,
                link,
                description,
                image
            };
            await this.linksRepo.putLink(linkData);
            res.status(200).json({ status: "Updated!", message: "Link updated!" });
        }
        catch (error) {
            console.error("⚠️ error updating link", error);
            res.status(500).json({ status: "Internal Server Error!", message: "Internal Server Error!" });
        }
    }
    async deleteLink(req, res) {
        try {
            const linkId = parseInt(req.params['id']);
            await this.linksRepo.deleteLink(linkId);
            res.status(200).json({ status: "Deleted!", message: "Link deleted!" });
        }
        catch (error) {
            console.error("⚠️ error deleting link", error);
            res.status(500).json({ status: "Internal Server Error!", message: "Internal Server Error!" });
        }
    }
    async getLink(req, res) {
        try {
            const linkId = parseInt(req.params['id']);
            const link = await this.linksRepo.getLink(linkId);
            if (!link) {
                res.status(404).json({ status: "Not Found", message: "Link not found" });
            }
            else {
                res.status(200).json({ status: "Ok!", message: "Link found!", data: link });
            }
        }
        catch (error) {
            console.error("⚠️ error retrieving link", error);
            res.status(500).json({ status: "Internal Server Error!", message: "Internal Server Error!" });
        }
    }
    async getLinks(_req, res) {
        try {
            const links = await this.linksRepo.getLinks();
            res.status(200).json({ status: "Ok!", message: "Links found!", data: links });
        }
        catch (error) {
            console.error("⚠️ error retrieving links", error);
            res.status(500).json({ status: "Internal Server Error!", message: "Internal Server Error!" });
        }
    }
}
exports.default = LinksController;
//# sourceMappingURL=LinksController.js.map