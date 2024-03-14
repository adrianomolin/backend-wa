"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = require("@google-cloud/storage");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const storage = new storage_1.Storage({
    credentials: {
        'type': 'service_account',
        'private_key': process.env.GCS_PRIVATE_KEY,
        'client_email': process.env.GCS_CLIENT_EMAIL,
        'client_id': process.env.GCS_CLIENT_ID,
    },
    projectId: process.env.GCS_PROJECT_ID
});
exports.default = storage;
