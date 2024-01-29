import { asyncHandler } from '../middlewares';
import LinksController from '../controllers/LinksController';
import BaseRoutes from './BaseRouter';
import validate from '../helper/validate';
import { createLinksSchema, updateLinksSchema } from '../validators/LinksSchema';
import { ApiKeyMiddleware } from '../middlewares';
class LinksRouter extends BaseRoutes {
  private readonly apiKeyMiddleware = ApiKeyMiddleware.checkApiKey();

  constructor() {
    super();
  } 
  
  public routes(): void {
    this.router.get("/", this.apiKeyMiddleware, asyncHandler(LinksController.getLinks));
    this.router.get("/:id([0-9]{1,24})", this.apiKeyMiddleware, asyncHandler(LinksController.getLink));
    this.router.post("/", this.apiKeyMiddleware, validate(createLinksSchema), asyncHandler(LinksController.postLink));
    this.router.put("/:id([0-9]{1,24})", this.apiKeyMiddleware, validate(updateLinksSchema), asyncHandler(LinksController.putLink));
    this.router.delete("/:id([0-9]{1,24})", this.apiKeyMiddleware, asyncHandler(LinksController.deleteLink));
  }
}

export default new LinksRouter().router;