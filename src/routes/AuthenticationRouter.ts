import AuthenticationController from "../controllers/AuthenticationController";
import BaseRoutes from "./BaseRouter";
import { asyncHandler } from "../middlewares";

class AuthenticationRoutes extends BaseRoutes {
  routes(): void {
    this.router.post("/login", asyncHandler(AuthenticationController.login));
    this.router.post("/register", asyncHandler(AuthenticationController.register));
  }
}

export default new AuthenticationRoutes().router;
