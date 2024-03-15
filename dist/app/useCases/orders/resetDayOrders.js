"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetDayOrders = void 0;
const Order_1 = require("../../models/Order");
async function resetDayOrders(req, res) {
    try {
        if (req.headers['demo'] === 'true')
            return res.json([]);
        const orders = await Order_1.Order.find()
            .where({ archived: false })
            .updateMany({ archived: true });
        res.json(orders);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
exports.resetDayOrders = resetDayOrders;
