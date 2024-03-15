"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteIngredient = void 0;
const Ingredient_1 = require("../../models/Ingredient");
async function deleteIngredient(req, res) {
    try {
        const { ingredientId } = req.params;
        if (req.headers['demo'] === 'true')
            return res.sendStatus(204);
        await Ingredient_1.Ingredient.findByIdAndDelete(ingredientId);
        res.sendStatus(204);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
exports.deleteIngredient = deleteIngredient;
