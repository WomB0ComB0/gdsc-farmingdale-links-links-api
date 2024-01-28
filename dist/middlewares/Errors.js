"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const CustomError_1 = require("../errors/CustomError");
const errorHandler = (err, _req, res, _next) => {
    if (err instanceof CustomError_1.CustomError) {
        const { statusCode, errors, logging } = err;
        if (logging) {
            console.error(JSON.stringify({
                code: err.statusCode,
                errors: err.errors,
                stack: err.stack,
            }, null, 2));
        }
        return res.status(statusCode).json({ errors });
    }
    console.error(JSON.stringify(err, null, 2));
    return res.status(500).json({ errors: [{ message: "Something went wrong" }] });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=Errors.js.map