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
exports.createUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = require("../../models/User");
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, password, role } = req.body;
            const salt = yield bcryptjs_1.default.genSalt();
            const passwordHash = yield bcryptjs_1.default.hash(password, salt);
            if (!name || !email || !password) {
                res.status(400).json({
                    'error': 'Name, email and password fields are required!',
                });
            }
            const user = yield User_1.User.create({
                name,
                email,
                password: passwordHash,
                role
            });
            res.status(201).json(user);
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    });
}
exports.createUser = createUser;
