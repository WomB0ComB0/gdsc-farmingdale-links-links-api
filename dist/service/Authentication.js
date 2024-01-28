"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const Users_1 = require("../models/Users");
const UsersRepo_1 = require("../repository/UsersRepo");
const Authentication_1 = __importDefault(require("../utils/Authentication"));
class AuthenticationService {
    async login(email, password) {
        const users = await new UsersRepo_1.UsersRepo().findByEmail(email);
        if (!users) {
            throw new Error("Bad Request!");
        }
        let compare = await Authentication_1.default.passwordCompare(password, users.password);
        if (compare) {
            return Authentication_1.default.generateToken(users.id, users.email, users.name, users.username);
        }
        return "";
    }
    async register(email, password, name, username) {
        try {
            const hashedPassword = await Authentication_1.default.passwordHash(password);
            const new_users = new Users_1.Users();
            new_users.email = email;
            new_users.password = hashedPassword;
            new_users.username = username;
            new_users.name = name;
            await new UsersRepo_1.UsersRepo().save(new_users);
        }
        catch (error) {
            throw new Error("Error login!");
        }
    }
}
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=Authentication.js.map