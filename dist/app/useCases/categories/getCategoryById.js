"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryById = void 0;
const Category_1 = require("../../models/Category");
async function getCategoryById(req, res) {
    try {
        const { categoryId } = req.params;
        const categories = await Category_1.Category.findById(categoryId);
        res.json(categories);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
exports.getCategoryById = getCategoryById;
