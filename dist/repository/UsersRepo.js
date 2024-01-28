"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepo = void 0;
const Users_1 = require("../models/Users");
class UsersRepo {
    async save(users) {
        try {
            await Users_1.Users.create({
                name: users.name,
                username: users.username,
                password: users.password,
                email: users.email,
            });
        }
        catch (error) {
            throw new Error("Failed to create users!");
        }
    }
    async update(users) {
        try {
            const new_users = await Users_1.Users.findOne({
                where: {
                    id: users.id,
                },
            });
            if (!new_users) {
                throw new Error("Users not found");
            }
            new_users.name = users.name;
            (new_users.username = users.username),
                (new_users.password = users.password),
                (new_users.email = users.email);
            await new_users.save();
        }
        catch (error) {
            throw new Error("Failed to update users!");
        }
    }
    async delete(usersId) {
        try {
            const new_users = await Users_1.Users.findOne({
                where: {
                    id: usersId,
                },
            });
            if (!new_users) {
                throw new Error("Users not found");
            }
            await new_users.destroy();
        }
        catch (error) {
            throw new Error("Failed to delete users!");
        }
    }
    async getById(usersId) {
        try {
            const new_users = await Users_1.Users.findOne({
                where: {
                    id: usersId,
                },
            });
            if (!new_users) {
                throw new Error("Users not found");
            }
            return new_users;
        }
        catch (error) {
            throw new Error("Failed to delete users!");
        }
    }
    async getAll() {
        try {
            return await Users_1.Users.findAll();
        }
        catch (error) {
            throw new Error("Failed to feacth all data!");
        }
    }
    async findByEmail(email) {
        try {
            const new_users = await Users_1.Users.findOne({
                where: { email: email },
            });
            if (!new_users) {
                throw new Error("Users not found!");
            }
            return new_users;
        }
        catch (error) {
            throw new Error("Failed to feacth data by email!");
        }
    }
}
exports.UsersRepo = UsersRepo;
//# sourceMappingURL=UsersRepo.js.map