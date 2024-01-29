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
const ApiKeyMiddleware_1 = __importDefault(require("../middlewares/ApiKeyMiddleware"));
const database_1 = __importDefault(require("../config/database"));
const LinksRepo_1 = require("../repository/LinksRepo");
class LinksRouter extends BaseRouter_1.default {
    constructor() {
        super();
        this.linksController = null;
        this.apiKeyMiddleware = ApiKeyMiddleware_1.default.checkApiKey();
        this.routes();
    }
    async routes() {
        try {
            const db = new database_1.default();
            await db.createLinksTable();
            this.linksController = new LinksController_1.default(new LinksRepo_1.LinksRepo(db));
            if (this.linksController) {
                this.router.get("/", this.apiKeyMiddleware, (0, middlewares_1.asyncHandler)(this.linksController.getLinks));
                this.router.get("/:id([0-9]{1,24})", this.apiKeyMiddleware, (0, middlewares_1.asyncHandler)(this.linksController.getLink));
                this.router.post("/", (0, validate_1.default)(LinksSchema_1.createLinksSchema), (0, middlewares_1.asyncHandler)(this.linksController.postLink));
                this.router.put("/:id([0-9]{1,24})", (0, validate_1.default)(LinksSchema_1.updateLinksSchema), (0, middlewares_1.asyncHandler)(this.linksController.putLink));
                this.router.delete("/:id([0-9]{1,24})", (0, middlewares_1.asyncHandler)(this.linksController.deleteLink));
            }
            else {
                throw new Error("⚠️ Unable to initialize LinksController");
            }
        }
        catch (error) {
            console.error("⚠️ Unable to initialize LinksRouter", error);
        }
    }
}
exports.default = new LinksRouter().router;
//# sourceMappingURL=LinksRouter.js.map