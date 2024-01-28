import { asyncHandler } from '../middlewares';
import LinksController from '../controllers/LinksController';
import BaseRoutes from './BaseRouter';
import validate from '../helper/validate';
import { createLinksSchema, updateLinksSchema } from '../validators/LinksSchema';
import { ApiKeyMiddleware } from '../middlewares';
class LinksRouter extends BaseRoutes {
  private readonly apiKey = new ApiKeyMiddleware().checkApiKey();
  public routes(): void {
    this.router.get("/", this.apiKey, asyncHandler(LinksController.getLinks));
    this.router.get("/:id([0-9]{1,24})", this.apiKey, asyncHandler(LinksController.getLink));
    this.router.post("/", this.apiKey, validate(createLinksSchema), asyncHandler(LinksController.postLink));
    this.router.put("/:id([0-9]{1,24})", this.apiKey, validate(updateLinksSchema), asyncHandler(LinksController.putLink));
    this.router.delete("/:id([0-9]{1,24})", this.apiKey, asyncHandler(LinksController.deleteLink));
  }
}

export default new LinksRouter().router;