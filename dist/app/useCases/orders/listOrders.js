"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listOrders = void 0;
const Order_1 = require("../../models/Order");
async function listOrders(req, res) {
    try {
        const orders = await Order_1.Order.find()
            .where({ archived: false })
            .sort({ createdAt: 1 })
            .populate({
            path: 'products',
            populate: {
                path: 'product',
                model: 'Product',
                populate: {
                    path: 'category',
                    model: 'Category'
                },
            },
        });
        res.json(orders);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
exports.listOrders = listOrders;
