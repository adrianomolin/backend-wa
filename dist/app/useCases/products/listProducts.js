"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listProducts = void 0;
const Product_1 = require("../../models/Product");
async function listProducts(req, res) {
    try {
        const products = await Product_1.Product.find()
            .populate('category')
            .populate('ingredients.ingredient');
        res.json(products);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
exports.listProducts = listProducts;
