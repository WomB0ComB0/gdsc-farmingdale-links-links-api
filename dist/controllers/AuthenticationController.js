"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Authentication_1 = require("../service/Authentication");
class AuthenticationController {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const token = await new Authentication_1.AuthenticationService().login(email, password);
            if (token === "") {
                return res.status(400).json({
                    status: "Bad Request!",
                    message: "Wrong email or password!",
                });
            }
            const res_token = { type: "Bearer", token: token };
            return res.status(200).json({
                status: "Ok!",
                message: "Successfully login!",
                result: res_token,
            });
        }
        catch (error) {
            return res.status(500).json({
                status: "Internal server Error!",
                message: "Internal server Error!",
            });
        }
    }
    async register(req, res) {
        try {
            const { name, username, email, password } = req.body;
            await new Authentication_1.AuthenticationService().register(email, password, name, username);
            return res.status(200).json({
                status: "Ok!",
                message: "Successfully registerd users!",
            });
        }
        catch (error) {
            return res.status(500).json({
                status: "Internal server Error!",
                message: "Internal server Error!",
            });
        }
    }
}
exports.default = new AuthenticationController();
//# sourceMappingURL=AuthenticationController.js.map