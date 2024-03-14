"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editCategory = void 0;
const Category_1 = require("../../models/Category");
async function editCategory(req, res) {
    try {
        const { icon, name } = req.body;
        const { categoryId } = req.params;
        const category = await Category_1.Category.findByIdAndUpdate(categoryId, { icon, name });
        res.status(201).json(category);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
exports.editCategory = editCategory;
