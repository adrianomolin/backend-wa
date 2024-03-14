"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ingredient = void 0;
const mongoose_1 = require("mongoose");
exports.Ingredient = (0, mongoose_1.model)('Ingredient', new mongoose_1.Schema({
    icon: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
}));
