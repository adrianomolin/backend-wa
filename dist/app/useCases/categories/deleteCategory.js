"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = void 0;
const Category_1 = require("../../models/Category");
async function deleteCategory(req, res) {
    if (req.headers['demo'] === 'true')
        return res.sendStatus(204);
    try {
        const { categoryId } = req.params;
        await Category_1.Category.findByIdAndDelete(categoryId);
        res.sendStatus(204);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
exports.deleteCategory = deleteCategory;
