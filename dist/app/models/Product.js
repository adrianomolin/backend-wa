"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
exports.Product = (0, mongoose_1.model)('Product', new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imagePath: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    ingredients: {
        required: true,
        type: [{
                ingredient: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Ingredient',
                }
            }],
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Category',
    },
}));
