"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class AuthController {
    async authenticate(req, res) {
        const { email, password } = req.body;
        const user = await User_1.User.findOne({ email: email });
        if (!user) {
            return res.sendStatus(401);
        }
        const isValidPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return res.sendStatus(401);
        }
        const token = jsonwebtoken_1.default.sign({
            id: user._id,
            permissions: user.permissions,
            role: user.role
        }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return res.json({
            user: {
                _id: user._id,
                name: user.name,
                permissions: user.permissions,
                role: user.role,
            },
            token,
        });
    }
}
exports.default = new AuthController();
