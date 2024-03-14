"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const createCategory_1 = require("./app/useCases/categories/createCategory");
const listCategories_1 = require("./app/useCases/categories/listCategories");
const listProductsByCategory_1 = require("./app/useCases/categories/listProductsByCategory");
const deleteCategory_1 = require("./app/useCases/categories/deleteCategory");
const createProduct_1 = require("./app/useCases/products/createProduct");
const listProducts_1 = require("./app/useCases/products/listProducts");
const deleteProduct_1 = require("./app/useCases/products/deleteProduct");
const createOrder_1 = require("./app/useCases/orders/createOrder");
const listOrders_1 = require("./app/useCases/orders/listOrders");
const changeOrderStatus_1 = require("./app/useCases/orders/changeOrderStatus");
const cancelOrder_1 = require("./app/useCases/orders/cancelOrder");
const resetDayOrders_1 = require("./app/useCases/orders/resetDayOrders");
const listAllOrders_1 = require("./app/useCases/orders/listAllOrders");
const getCategoryById_1 = require("./app/useCases/categories/getCategoryById");
const createUser_1 = require("./app/useCases/users/createUser");
const listUsers_1 = require("./app/useCases/users/listUsers");
const deleteUser_1 = require("./app/useCases/users/deleteUser");
const AuthController_1 = __importDefault(require("./app/controllers/AuthController"));
const AuthMiddleware_1 = require("./app/middleware/AuthMiddleware");
const editCategory_1 = require("./app/useCases/categories/editCategory");
const createIngredient_1 = require("./app/useCases/ingredients/createIngredient");
const listIngredients_1 = require("./app/useCases/ingredients/listIngredients");
const deleteUser_2 = require("./app/useCases/ingredients/deleteUser");
const updateProduct_1 = require("./app/useCases/products/updateProduct");
const resetOrderById_1 = require("./app/useCases/orders/resetOrderById");
const multerMid = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});
exports.router = (0, express_1.Router)();
exports.router.get('/', (_req, res) => {
    return res.send('Main-Page');
});
// List categories
exports.router.get('/categories', AuthMiddleware_1.AuthMiddleware, listCategories_1.listCategories);
exports.router.get('/categories/:categoryId', AuthMiddleware_1.AuthMiddleware, getCategoryById_1.getCategoryById);
// Create category
exports.router.post('/categories', AuthMiddleware_1.AuthMiddleware, createCategory_1.createCategory);
// List product
exports.router.get('/products', AuthMiddleware_1.AuthMiddleware, listProducts_1.listProducts);
// Create Product
exports.router.post('/products', AuthMiddleware_1.AuthMiddleware, multerMid.single('image'), createProduct_1.createProduct);
exports.router.patch('/products/:productId', AuthMiddleware_1.AuthMiddleware, multerMid.single('image'), updateProduct_1.updateProduct);
// Delete product
exports.router.delete('/products/:productId', AuthMiddleware_1.AuthMiddleware, deleteProduct_1.deleteProduct);
exports.router.post('/ingredients', AuthMiddleware_1.AuthMiddleware, createIngredient_1.createIngredient);
exports.router.get('/ingredients', AuthMiddleware_1.AuthMiddleware, listIngredients_1.listIngredients);
exports.router.delete('/ingredients/:ingredientId', AuthMiddleware_1.AuthMiddleware, deleteUser_2.deleteIngredient);
// Get products by category
exports.router.get('/categories/:categoryId/products', AuthMiddleware_1.AuthMiddleware, listProductsByCategory_1.listProductByCategory);
exports.router.patch('/categories/:categoryId', AuthMiddleware_1.AuthMiddleware, editCategory_1.editCategory);
// Delete category
exports.router.delete('/categories/:categoryId', AuthMiddleware_1.AuthMiddleware, deleteCategory_1.deleteCategory);
// List orders
exports.router.get('/orders', AuthMiddleware_1.AuthMiddleware, listOrders_1.listOrders);
exports.router.get('/orders/all', AuthMiddleware_1.AuthMiddleware, listAllOrders_1.listAllOrders);
// Create order
exports.router.post('/orders', AuthMiddleware_1.AuthMiddleware, createOrder_1.createOrder);
// Change order Status
exports.router.patch('/orders/:orderId', AuthMiddleware_1.AuthMiddleware, changeOrderStatus_1.changeOrderStatus);
// Reset daily orders
exports.router.post('/orders/reset', AuthMiddleware_1.AuthMiddleware, resetDayOrders_1.resetDayOrders);
exports.router.post('/orders/reset/:orderId', AuthMiddleware_1.AuthMiddleware, resetOrderById_1.resetOrderById);
// Delete/cancel order
exports.router.delete('/orders/:orderId', AuthMiddleware_1.AuthMiddleware, cancelOrder_1.cancelOrder);
exports.router.post('/users', AuthMiddleware_1.AuthMiddleware, createUser_1.createUser);
exports.router.post('/auth', AuthController_1.default.authenticate);
exports.router.get('/users', AuthMiddleware_1.AuthMiddleware, listUsers_1.listUsers);
exports.router.delete('/users/:userId', AuthMiddleware_1.AuthMiddleware, deleteUser_1.deleteUser);
