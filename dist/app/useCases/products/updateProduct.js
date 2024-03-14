"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = void 0;
const Product_1 = require("../../models/Product");
async function updateProduct(req, res) {
    try {
        const { productId } = req.params;
        const { image, name, description, category, price, ingredients } = req.body;
        const ingredientData = [];
        JSON.parse(ingredients).map((ingredient) => {
            ingredientData.push({
                ingredient: ingredient
            });
        });
        await Product_1.Product.findByIdAndUpdate(productId, {
            image,
            name,
            description,
            category,
            price,
            ingredients: ingredientData,
        });
        res.sendStatus(204);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
exports.updateProduct = updateProduct;
