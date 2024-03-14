"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const isEmail_1 = __importDefault(require("validator/lib/isEmail"));
exports.User = (0, mongoose_1.model)('User', new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'Please enter an email'],
        validate: [isEmail_1.default, 'Please enter a valid email']
    },
    permissions: {
        type: Array,
        required: true,
        default: ['']
    },
    role: {
        type: String,
        required: true,
        uppercase: true,
        default: 'USER'
    },
    password: {
        type: String,
        required: [true, 'Please enter an password'],
    }
}));
