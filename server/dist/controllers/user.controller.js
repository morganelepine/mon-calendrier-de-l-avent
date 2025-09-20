"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const client_1 = require("@prisma/client");
const usernames_1 = require("../data/usernames");
const prisma = new client_1.PrismaClient();
class UserController {
    // GET /users
    getAll(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield prisma.user.findMany();
            return users;
        });
    }
    // GET /users/:uuid
    getOne(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const uuid = request.params.uuid;
            const user = yield prisma.user.findUnique({
                where: { uuid },
            });
            if (!user) {
                return "Unregistered user";
            }
            return user;
        });
    }
    // POST /users
    save(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uuid, score } = request.body;
            let username;
            if (usernames_1.usernames.length === 0) {
                username = "username";
            }
            const randomIndex = Math.floor(Math.random() * usernames_1.usernames.length);
            username = usernames_1.usernames[randomIndex];
            usernames_1.usernames.splice(randomIndex, 1);
            const user = yield prisma.user.create({
                data: { uuid, username, score },
            });
            return user;
        });
    }
    // DELETE /users/:uuid
    remove(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const uuid = request.params.uuid;
            const user = yield prisma.user.findUnique({
                where: { uuid },
            });
            if (!user) {
                return "This user does not exist";
            }
            yield prisma.user.delete({
                where: { uuid },
            });
            return "User has been removed";
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map