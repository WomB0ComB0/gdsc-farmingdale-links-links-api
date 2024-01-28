"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middlewares_1 = require("../middlewares");
const LinksController_1 = __importDefault(require("../controllers/LinksController"));
const BaseRouter_1 = __importDefault(require("./BaseRouter"));
const validate_1 = __importDefault(require("../helper/validate"));
const LinksSchema_1 = require("../validators/LinksSchema");
class LinksRouter extends BaseRouter_1.default {
    routes() {
        this.router.get("/", (0, middlewares_1.asyncHandler)(LinksController_1.default.getLinks));
        this.router.get("/:id([0-9]{1,24})", (0, middlewares_1.asyncHandler)(LinksController_1.default.getLink));
        this.router.post("/", (0, validate_1.default)(LinksSchema_1.createLinksSchema), (0, middlewares_1.asyncHandler)(LinksController_1.default.postLink));
        this.router.put("/:id([0-9]{1,24})", (0, validate_1.default)(LinksSchema_1.updateLinksSchema), (0, middlewares_1.asyncHandler)(LinksController_1.default.putLink));
        this.router.delete("/:id([0-9]{1,24})", (0, middlewares_1.asyncHandler)(LinksController_1.default.deleteLink));
    }
}
exports.default = new LinksRouter().router;
//# sourceMappingURL=LinksRouter.js.map