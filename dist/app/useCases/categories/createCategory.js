"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = void 0;
const Category_1 = require("../../models/Category");
async function createCategory(req, res) {
    try {
        const { icon, name } = req.body;
        if (!name) {
            res.status(400).json({
                'error': 'Name is required',
            });
        }
        if (req.headers['demo'] === 'true') {
            return res.status(201).json({
                name,
                icon,
                _id: 'demo-' + Math.random(),
            });
        }
        const category = await Category_1.Category.create({ icon, name });
        res.status(201).json(category);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
exports.createCategory = createCategory;
