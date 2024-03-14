"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAllOrders = void 0;
const Order_1 = require("../../models/Order");
async function listAllOrders(req, res) {
    try {
        const orders = await Order_1.Order.find()
            .where({ archived: true })
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
exports.listAllOrders = listAllOrders;
