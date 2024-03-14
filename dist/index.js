"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const socket_io_1 = require("socket.io");
const router_1 = require("./router");
const cors_1 = __importDefault(require("./app/middleware/cors"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
exports.io = new socket_io_1.Server(server);
dotenv_1.default.config();
async function start() {
    try {
        if (!process.env.DB_URI) {
            console.error('API ERROR: missing arguments to connect to database');
            return null;
        }
        mongoose_1.default.set('strictQuery', true);
        await mongoose_1.default.connect(process.env.DB_URI || '');
        app.use(cors_1.default);
        app.use(express_1.default.json());
        app.use(router_1.router);
        await app.listen(3000);
    }
    catch (e) {
        console.log(e);
    }
}
start();
exports.default = start;
