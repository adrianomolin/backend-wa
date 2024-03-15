"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = void 0;
const Product_1 = require("../../models/Product");
const storage_1 = __importDefault(require("../../utils/storage"));
const bucket = storage_1.default.bucket('waiterapp');
async function deleteProduct(req, res) {
    try {
        const { productId } = req.params;
        if (req.headers['demo'] === 'true')
            return res.sendStatus(204);
        const product = await Product_1.Product.findById(productId);
        if (product?.imagePath)
            bucket.file(product.imagePath).delete();
        await Product_1.Product.findByIdAndDelete(productId);
        res.sendStatus(204);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
exports.deleteProduct = deleteProduct;
