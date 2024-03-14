"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listIngredients = void 0;
const Ingredient_1 = require("../../models/Ingredient");
async function listIngredients(req, res) {
    try {
        const ingredients = await Ingredient_1.Ingredient.find();
        res.json(ingredients);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
exports.listIngredients = listIngredients;
