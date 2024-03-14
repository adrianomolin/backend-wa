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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = void 0;
const Product_1 = require("../../models/Product");
const uploadFile_1 = require("../../utils/uploadFile");
function createProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, description, price, category, ingredients } = req.body;
            if (!req.file) {
                res.status(400).send('No file uploaded.');
                return;
            }
            const imagePath = yield (0, uploadFile_1.uploadImage)(req.file);
            const ingredientData = [];
            JSON.parse(ingredients).map((ingredient) => {
                ingredientData.push({
                    ingredient: ingredient
                });
            });
            const product = yield Product_1.Product.create({
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
    });
}
exports.createProduct = createProduct;
