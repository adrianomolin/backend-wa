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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = void 0;
const fs_1 = __importDefault(require("fs"));
const Product_1 = require("../../models/Product");
function deleteProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { productId } = req.params;
            const product = yield Product_1.Product.findById(productId);
            const path = `${__dirname}/../../../../uploads/${product === null || product === void 0 ? void 0 : product.imagePath}`;
            fs_1.default.unlink(path, function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('File removed: ', path);
                }
            });
            yield Product_1.Product.findByIdAndDelete(productId);
            res.sendStatus(204);
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    });
}
exports.deleteProduct = deleteProduct;
