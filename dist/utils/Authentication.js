"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Authentication {
    static passwordHash(password) {
        return bcrypt_1.default.hash(password, 10);
    }
    static async passwordCompare(text, encryptedText) {
        return await bcrypt_1.default.compare(text, encryptedText);
    }
    static generateToken(id, email, name, username) {
        const secretKey = process.env.JWT_SECRET_KEY || "my-secret";
        const payload = {
            userId: id,
            email: email,
            name: name,
            username: username,
        };
        const option = { expiresIn: process.env.JWT_EXPIRES_IN };
        return jsonwebtoken_1.default.sign(payload, secretKey, option);
    }
    static validateToken(token) {
        try {
            const secretKey = process.env.JWT_SECRET_KEY || "my-secret";
            return jsonwebtoken_1.default.verify(token, secretKey);
        }
        catch (err) {
            return null;
        }
    }
}
exports.default = Authentication;
//# sourceMappingURL=Authentication.js.map