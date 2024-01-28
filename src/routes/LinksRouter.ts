import { LinksController } from '../controllers/LinksController';
import { auth } from "../middleware/AuthMiddleware";
import BaseRoutes from './BaseRouter';

class LinksRouter extends BaseRoutes {
  routes(): void {
    this.router.get("/", LinksController.index);
    this.router.get("/:id", LinksController.show);
    this.router.post("/", auth, LinksController.store);
    this.router.put("/:id", auth, LinksController.update);
    this.router.delete("/:id", auth, LinksController.delete);
  }
}

export default new LinksRouter().router;