import ogs from 'open-graph-scraper';
import { userAgent } from '../constants';
import { Request, Response } from "express";
import Database from "../config/database";
import { LinksRepo } from "../repository/LinksRepo";
class LinksController {
  private readonly linksRepo: LinksRepo;

  constructor(linksRepo: LinksRepo) {
    this.linksRepo = linksRepo;
  }

  private async fetchImageLinkFromURL(url: string): Promise<string> {
    const options = {
      url,
      fetchOptions: { headers: { 'user-agent': userAgent } }
    };

    try {
      const { result } = await ogs(options);
      return result.ogImage?.[0]?.url || 'https://placehold.co/48x48';
    } catch (error) {
      console.error('Error fetching image link:', error);
      return 'https://placehold.co/48x48';
    }
  }

  async postLink(req: Request, res: Response) {
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
    } catch (error) {
      console.error("⚠️ error posting link", error);
      res.status(500).json({ status: "Internal Server Error!", message: "Internal Server Error!" });
    }
  }

  async putLink(req: Request, res: Response) {
    try {
      const id = parseInt(req.params['id']);
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
    } catch (error) {
      console.error("⚠️ error updating link", error);
      res.status(500).json({ status: "Internal Server Error!", message: "Internal Server Error!" });
    }
  }

  async deleteLink(req: Request, res: Response) {
    try {
      const linkId = parseInt(req.params['id']);
      await this.linksRepo.deleteLink(linkId);
      res.status(200).json({ status: "Deleted!", message: "Link deleted!" });
    } catch (error) {
      console.error("⚠️ error deleting link", error);
      res.status(500).json({ status: "Internal Server Error!", message: "Internal Server Error!" });
    }
  }

  async getLink(req: Request, res: Response) {
    try {
      const linkId = parseInt(req.params['id']);
      const link = await this.linksRepo.getLink(linkId);
      if (!link) {
        res.status(404).json({ status: "Not Found", message: "Link not found" });
      } else {
        res.status(200).json({ status: "Ok!", message: "Link found!", data: link });
      }
    } catch (error) {
      console.error("⚠️ error retrieving link", error);
      res.status(500).json({ status: "Internal Server Error!", message: "Internal Server Error!" });
    }
  }

  async getLinks(_req: Request, res: Response) {
    try {
      const links = await this.linksRepo.getLinks();
      res.status(200).json({ status: "Ok!", message: "Links found!", data: links });
    } catch (error) {
      console.error("⚠️ error retrieving links", error);
      res.status(500).json({ status: "Internal Server Error!", message: "Internal Server Error!" });
    }
  }
}

const db = new Database();
export default new LinksController(new LinksRepo(db));
