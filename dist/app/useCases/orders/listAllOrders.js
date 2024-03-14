"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAllOrders = void 0;
const Order_1 = require("../../models/Order");
function listAllOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orders = yield Order_1.Order.find()
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
    });
}
exports.listAllOrders = listAllOrders;
