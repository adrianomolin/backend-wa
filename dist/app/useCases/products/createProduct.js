"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = void 0;
const Product_1 = require("../../models/Product");
const uploadFile_1 = require("../../utils/uploadFile");
async function createProduct(req, res) {
    try {
        const { name, description, price, category, ingredients } = req.body;
        if (!req.file) {
            res.status(400).send('No file uploaded.');
            return;
        }
        const imagePath = await (0, uploadFile_1.uploadImage)(req.file);
        const ingredientData = [];
        JSON.parse(ingredients).map((ingredient) => {
            ingredientData.push({
                ingredient: ingredient
            });
        });
        const product = await Product_1.Product.create({
            name,
            description,
            imagePath,
            price: Number(price),
            category,
            ingredients: ingredientData,
        });
        res.status(201).json(product);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
exports.createProduct = createProduct;
