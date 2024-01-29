"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLinksSchema = exports.createLinksSchema = void 0;
const zod_1 = require("zod");
exports.createLinksSchema = zod_1.z.object({
    body: zod_1.z.object({
        image: zod_1.z.string().url(),
        link: zod_1.z.string().url(),
        name: zod_1.z.string().min(5),
        description: zod_1.z.string().min(5),
    }),
});
exports.updateLinksSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string(),
    }),
    body: zod_1.z.object({
        image: zod_1.z.string().url(),
        link: zod_1.z.string().url(),
        name: zod_1.z.string().min(5),
        description: zod_1.z.string().min(5),
    }),
});
//# sourceMappingURL=LinksSchema.js.map