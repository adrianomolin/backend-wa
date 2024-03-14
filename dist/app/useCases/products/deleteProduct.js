"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = void 0;
const fs_1 = __importDefault(require("fs"));
const Product_1 = require("../../models/Product");
async function deleteProduct(req, res) {
    try {
        const { productId } = req.params;
        const product = await Product_1.Product.findById(productId);
        const path = `${__dirname}/../../../../uploads/${product?.imagePath}`;
        fs_1.default.unlink(path, function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('File removed: ', path);
            }
        });
        await Product_1.Product.findByIdAndDelete(productId);
        res.sendStatus(204);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
exports.deleteProduct = deleteProduct;
