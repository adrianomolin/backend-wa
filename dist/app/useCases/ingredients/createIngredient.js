"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIngredient = void 0;
const Ingredient_1 = require("../../models/Ingredient");
async function createIngredient(req, res) {
    try {
        const { icon, name } = req.body;
        if (!name) {
            res.status(400).json({
                'error': 'Name is required',
            });
        }
        const ingredient = await Ingredient_1.Ingredient.create({ icon, name });
        res.status(201).json(ingredient);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
exports.createIngredient = createIngredient;
