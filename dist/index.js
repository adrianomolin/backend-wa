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
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!process.env.DB_URI) {
                console.error('API ERROR: missing arguments to connect to database');
                return null;
            }
            mongoose_1.default.set('strictQuery', true);
            yield mongoose_1.default.connect(process.env.DB_URI || '');
            const port = 3001;
            app.use(cors_1.default);
            app.use(express_1.default.json());
            app.use(router_1.router);
            server.listen(port, () => console.log(`🚀 Server is running on https://localhost:${port}`));
        }
        catch (e) {
            console.log(e);
        }
    });
}
start();
module.exports = app;
