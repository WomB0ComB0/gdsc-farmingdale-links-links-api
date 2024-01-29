import { asyncHandler } from '../middlewares';
import LinksController from '../controllers/LinksController';
import BaseRoutes from './BaseRouter';
import validate from '../helper/validate';
import { createLinksSchema, updateLinksSchema } from '../validators/LinksSchema';
import ApiKeyMiddleware from '../middlewares/ApiKeyMiddleware';
import Database from '../config/database';
import { LinksRepo } from '../repository/LinksRepo';

class LinksRouter extends BaseRoutes {
  private readonly apiKeyMiddleware: ReturnType<typeof ApiKeyMiddleware.checkApiKey>;
  private readonly linksController: LinksController;

  constructor() {
    super();
    const db = new Database();
    this.apiKeyMiddleware = ApiKeyMiddleware.checkApiKey();
    this.linksController = new LinksController(new LinksRepo(db));
    this.routes();
  } 
  
  public routes(): void {
    try {
      if (this.linksController) {
        this.router.get("/", this.apiKeyMiddleware, asyncHandler(this.linksController.getLinks));
        this.router.get("/:id([0-9]{1,24})", this.apiKeyMiddleware, asyncHandler(this.linksController.getLink));
        this.router.post("/", validate(createLinksSchema), asyncHandler(this.linksController.postLink));
        this.router.put("/:id([0-9]{1,24})", validate(updateLinksSchema), asyncHandler(this.linksController.putLink));
        this.router.delete("/:id([0-9]{1,24})", asyncHandler(this.linksController.deleteLink));
      } else {
        console.error('⚠️ Unable to initialize links controller');
      }
    } catch (error) {
      console.error('Error configuring routes:', error);
    }
  }
}

export default new LinksRouter().router;
