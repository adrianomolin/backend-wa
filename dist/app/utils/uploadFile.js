"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const storage_1 = __importDefault(require("./storage"));
const bucket = storage_1.default.bucket('waiterapp-uploads');
const uploadImage = (file) => new Promise((resolve, reject) => {
    const { originalname, buffer } = file;
    const blob = bucket.file(`${Date.now()}-${originalname.replace(/\s/g, '-')}`);
    const blobStream = blob.createWriteStream({
        resumable: false
    });
    blobStream.on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        resolve(publicUrl);
    })
        .on('error', (err) => {
        console.log(err);
        reject('Unable to upload image, something went wrong');
    })
        .end(buffer);
});
exports.uploadImage = uploadImage;
