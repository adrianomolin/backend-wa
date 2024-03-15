"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetOrderById = void 0;
const Order_1 = require("../../models/Order");
async function resetOrderById(req, res) {
    try {
        const { orderId } = req.params;
        if (req.headers['demo'] === 'true')
            return res.sendStatus(201);
        const order = await Order_1.Order.findByIdAndUpdate(orderId, { archived: true });
        res.status(201).json(order);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
exports.resetOrderById = resetOrderById;
