"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listProductByCategory = void 0;
const Product_1 = require("../../models/Product");
async function listProductByCategory(req, res) {
    try {
        const { categoryId } = req.params;
        const products = await Product_1.Product.find().where('category').equals(categoryId);
        res.json(products);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
exports.listProductByCategory = listProductByCategory;
