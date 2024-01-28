import LinksController from '@/controllers/LinksController';
import BaseRoutes from './BaseRouter';
import validate from '@/helper/validate';
import { createLinksSchema, updateLinksSchema } from '@/validators/LinksSchema';
class LinksRouter extends BaseRoutes {
  public routes(): void {
    this.router.get("/", LinksController.getLinks);
    this.router.get("/:id", LinksController.getLink);
    this.router.post("/", validate(createLinksSchema), LinksController.postLink);
    this.router.put("/:id", validate(updateLinksSchema), LinksController.putLink);
    this.router.delete("/:id", LinksController.deleteLink);
  }
}

export default new LinksRouter().router;