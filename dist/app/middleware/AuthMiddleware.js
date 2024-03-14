"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function AuthMiddleware(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.sendStatus(401);
    }
    const token = authorization.replace('Bearer', '').trim();
    try {
        const data = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const { id, permissions, role } = data;
        req.user = { id, permissions, role };
        return next();
    }
    catch (_a) {
        return res.sendStatus(401);
    }
}
exports.AuthMiddleware = AuthMiddleware;
