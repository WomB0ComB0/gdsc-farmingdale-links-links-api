import { Links } from "../models/LinksModel";

interface ILinksRepo {
  postLink(data: Links): Promise<void>
  putLink(data: Links): Promise<void>
  deleteLink(id: number): Promise<void>
  getLink(id: number): Promise<Links>
  getLinks(): Promise<Links[]>
}

export class LinksRepo implements ILinksRepo {

  public async postLink(data: Links): Promise<void> {
    try {
      await Links.create({
        image: data.image,
        link: data.link,
        name: data.name,
        description: data.description
      });
    } catch (error) {
      throw new Error("Filed to create link!");
    }
  }

  public async putLink(data: Links): Promise<void> {
    try {
      const res = await Links.findOne({
        where: {
          id: data.id
        }
      });
      if (!res) {
        throw new Error("Link not found!");
      }
      res.image = data.image
      res.link = data.link
      res.name = data.name
      res.description = data.description
    } catch (error) {
      throw new Error("Filed to update link!");
    }
  }

  public async deleteLink(id: number): Promise<void> {
    try {
      const res = await Links.findOne({
        where: {
          id: id
        }
      });
      if (!res) {
        throw new Error("Link not found!");
      }
      await res.destroy();
    } catch (error) {
      throw new Error("Filed to delete link!");
    }
  }

  public async getLink(id: number): Promise<Links> {
    try {
      const res = await Links.findOne({
        where: {
          id: id
        }
      });
      if (!res) {
        throw new Error("Link not found!");
      }
      return res;
    } catch (error) {
      throw new Error("Filed to retrieve link!");
    }
  }

  public async getLinks(): Promise<Links[]> {
    try {
      return await Links.findAll();
    } catch (error) {
      throw new Error("Filed to retrieve links!");
    }
  }
}