"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionLogin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../../models/User");
async function sessionLogin(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'All fields are required: (email, password)' });
        }
        const user = await User_1.User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ error: 'Email not found.' });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials.' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                permissions: user.permissions,
                role: user.role,
            }
        });
    }
    catch (error) {
        res.status(500).json({ err: 'Ocorreu um erro' });
    }
}
exports.sessionLogin = sessionLogin;
