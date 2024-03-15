"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = require("../../models/User");
async function createUser(req, res) {
    try {
        const { name, email, password, role } = req.body;
        const salt = await bcryptjs_1.default.genSalt();
        const passwordHash = await bcryptjs_1.default.hash(password, salt);
        if (!name || !email || !password) {
            res.status(400).json({
                'error': 'Name, email and password fields are required!',
            });
        }
        if (req.headers['demo'] === 'true')
            return res.sendStatus(201).json({
                name,
                email,
                password: passwordHash,
                role
            });
        const user = await User_1.User.create({
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
}
exports.createUser = createUser;
