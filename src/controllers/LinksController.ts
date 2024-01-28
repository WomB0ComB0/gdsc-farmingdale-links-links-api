import { type Request, type Response } from "express";
import { Links } from "@/models/LinksModel";
import { LinksRepo } from "@/repository/LinksRepo";

class LinksController {
  async postLink(req: Request, res: Response) {
    try {
      const links = new Links()
      const { image, link, name, description } = req.body;
      links.image = image
      links.link = link
      links.name = name
      links.description = description
      await new LinksRepo().postLink(links);
      res.status(201).json({ status: "Created!", message: "Link created!" });
    } catch (error) { res.status(500).json({ status: "Internal Server Error!", message: "Internal Server Error!", }); }
  }

  async putLink(req: Request, res: Response) {
    try {
      const id = parseInt(req.params['id'])
      const links = new Links()

      const { image, link, name, description } = req.body;
      links.id = id
      links.image = image
      links.link = link
      links.name = name
      links.description = description

      await new LinksRepo().putLink(links);
      res.status(200).json({ status: "Updated!", message: "Link updated!" });
    } catch (error) { res.status(500).json({ status: "Internal Server Error!", message: "Internal Server Error!", }); }
  }

  async deleteLink(req: Request, res: Response) {
    try {
      const id = parseInt(req.params['id'])
      await new LinksRepo().deleteLink(id);
      res.status(200).json({ status: "Deleted!", message: "Link deleted!" });
    } catch (error) { res.status(500).json({ status: "Internal Server Error!", message: "Internal Server Error!", }); }
  }

  async getLink(req: Request, res: Response) {
    try {
      const id = parseInt(req.params['id'])
      const link = await new LinksRepo().getLink(id);
      res.status(200).json({ status: "Ok!", message: "Link found!", data: link });
    } catch (error) { res.status(500).json({ status: "Internal Server Error!", message: "Internal Server Error!", }); }
  }

  async getLinks(_req: Request, res: Response) {
    try {
      const links = await new LinksRepo().getLinks();
      res.status(200).json({ status: "Ok!", message: "Links found!", data: links });
    } catch (error) { res.status(500).json({ status: "Internal Server Error!", message: "Internal Server Error!", }); }
  }
}

export default new LinksController();