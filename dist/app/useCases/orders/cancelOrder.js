"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelOrder = void 0;
const Order_1 = require("../../models/Order");
async function cancelOrder(req, res) {
    try {
        const { orderId } = req.params;
        await Order_1.Order.findByIdAndDelete(orderId);
        res.sendStatus(204);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
exports.cancelOrder = cancelOrder;
