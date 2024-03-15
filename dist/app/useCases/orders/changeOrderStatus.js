"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeOrderStatus = void 0;
const Order_1 = require("../../models/Order");
async function changeOrderStatus(req, res) {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        console.log(orderId);
        if (!['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status)) {
            return res.status(400).json({
                error: 'Status should be one of these: WAITING, IN_PRODUCTION, DONE.'
            });
        }
        if (req.headers['demo'] === 'true')
            return res.sendStatus(204);
        await Order_1.Order.findByIdAndUpdate(orderId, { status });
        res.sendStatus(204);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
exports.changeOrderStatus = changeOrderStatus;
