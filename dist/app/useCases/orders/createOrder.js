"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = void 0;
const Order_1 = require("../../models/Order");
const __1 = require("../../..");
async function createOrder(req, res) {
    try {
        const { table, products } = req.body;
        const order = await Order_1.Order.create({ table, products });
        const orderDetails = await order.populate('products.product');
        if (req.headers['demo'] === 'false')
            __1.io.emit('orders@new', orderDetails);
        res.status(201).json(order);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
exports.createOrder = createOrder;
