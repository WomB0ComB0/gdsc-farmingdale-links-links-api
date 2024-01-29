"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate = (schema) => async (req, res, next) => {
    try {
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    }
    catch (err) {
        const error_message = JSON.parse(err.message);
        return res.status(400).json({
            status: "Bad Request!",
            message: error_message[0].message,
        });
    }
};
exports.default = validate;
//# sourceMappingURL=validate.js.map