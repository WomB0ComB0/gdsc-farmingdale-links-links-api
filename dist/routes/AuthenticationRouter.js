"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthenticationController_1 = __importDefault(require("../controllers/AuthenticationController"));
const BaseRouter_1 = __importDefault(require("./BaseRouter"));
const middlewares_1 = require("../middlewares");
class AuthenticationRoutes extends BaseRouter_1.default {
    routes() {
        this.router.post("/login", (0, middlewares_1.asyncHandler)(AuthenticationController_1.default.login));
        this.router.post("/register", (0, middlewares_1.asyncHandler)(AuthenticationController_1.default.register));
    }
}
exports.default = new AuthenticationRoutes().router;
//# sourceMappingURL=AuthenticationRouter.js.map