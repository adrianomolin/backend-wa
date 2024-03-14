"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCategories = void 0;
const Category_1 = require("../../models/Category");
async function listCategories(req, res) {
    try {
        const categories = await Category_1.Category.find();
        res.json(categories);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
exports.listCategories = listCategories;
