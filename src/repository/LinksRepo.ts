import { Links } from "@/models/LinksModel";

interface ILinksRepo {
  getLinks(data: any): Promise<Links[] | null>
  getLink(id: number): Promise<Links | null>
  createLink(data: any): Promise<Links | null>
  updateLink(id: number, data: any): Promise<Links | null>
  deleteLink(id: number): Promise<Links | null>
}