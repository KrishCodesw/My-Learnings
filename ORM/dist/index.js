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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../src/generated/prisma");
const express_1 = __importDefault(require("express"));
const Client = new prisma_1.PrismaClient;
const app = (0, express_1.default)();
app.get("/client", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield Client.user.findMany();
    res.json({ users });
}));
app.get("/todos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const users = yield Client.user.findFirst({
        where: {
            id: Number(id)
        },
        select: {
            todos: true
        }
    });
    res.json({ users });
}));
console.log("✅ Hello from your ORM app!");
function CreateUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield Client.user.create({
            data: {
                username: "ksrish",
                password: "jdwdjk3f3_3f3",
                age: 30,
                city: "keie"
            }
        });
        console.log(res);
    });
}
function DeleteUser() {
    return __awaiter(this, void 0, void 0, function* () {
        yield Client.user.delete({
            where: {
                id: 2
            }
        });
    });
}
// CreateUser();
// DeleteUser();
function UpdateUser() {
    return __awaiter(this, void 0, void 0, function* () {
        yield Client.user.update({
            where: {
                id: 3
            },
            data: {
                username: "harkirat"
            }
        });
    });
}
// UpdateUser();
function FindUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const dala = yield Client.user.findFirst({
            where: {
                id: 3
            },
            include: {
                todos: true
            }
        });
        console.log(dala === null || dala === void 0 ? void 0 : dala.password);
        console.log(dala);
    });
}
// FindUser()
app.listen(3000);
