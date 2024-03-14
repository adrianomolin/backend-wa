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
exports.updateProduct = void 0;
const Product_1 = require("../../models/Product");
function updateProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { productId } = req.params;
            const { image, name, description, category, price, ingredients } = req.body;
            const ingredientData = [];
            JSON.parse(ingredients).map((ingredient) => {
                ingredientData.push({
                    ingredient: ingredient
                });
            });
            yield Product_1.Product.findByIdAndUpdate(productId, {
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
    });
}
exports.updateProduct = updateProduct;
