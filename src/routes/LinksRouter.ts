import { asyncHandler } from '../middlewares';
import LinksController from '../controllers/LinksController';
import BaseRoutes from './BaseRouter';
import validate from '../helper/validate';
import { createLinksSchema, updateLinksSchema } from '../validators/LinksSchema';
class LinksRouter extends BaseRoutes {
  public routes(): void {
    this.router.get("/", asyncHandler(LinksController.getLinks));
    this.router.get("/:id([0-9]{1,24})", asyncHandler(LinksController.getLink));
    this.router.post("/", validate(createLinksSchema), asyncHandler(LinksController.postLink));
    this.router.put("/:id([0-9]{1,24})", validate(updateLinksSchema), asyncHandler(LinksController.putLink));
    this.router.delete("/:id([0-9]{1,24})", asyncHandler(LinksController.deleteLink));
  }
}

export default new LinksRouter().router;