import path from 'node:path';

import { Router } from 'express';
import multer from 'multer';

import { createCategory } from './app/useCases/categories/createCategory';
import { listCategories } from './app/useCases/categories/listCategories';
import { listProductByCategory } from './app/useCases/categories/listProductsByCategory';
import { deleteCategory } from './app/useCases/categories/deleteCategory';

import { createProduct } from './app/useCases/products/createProduct';
import { listProducts } from './app/useCases/products/listProducts';
import { deleteProduct } from './app/useCases/products/deleteProduct';

import { createOrder } from './app/useCases/orders/createOrder';
import { listOrders } from './app/useCases/orders/listOrders';
import { changeOrderStatus } from './app/useCases/orders/changeOrderStatus';
import { cancelOrder } from './app/useCases/orders/cancelOrder';
import { resetDayOrders } from './app/useCases/orders/resetDayOrders';
import { listAllOrders } from './app/useCases/orders/listAllOrders';
import { getCategoryById } from './app/useCases/categories/getCategoryById';
import { createUser } from './app/useCases/users/createUser';
import { listUsers } from './app/useCases/users/listUsers';
import { deleteUser } from './app/useCases/users/deleteUser';

import AuthController from './app/controllers/AuthController';
import { AuthMiddleware } from './app/middleware/AuthMiddleware';
import { editCategory } from './app/useCases/categories/editCategory';
import { createIngredient } from './app/useCases/ingredients/createIngredient';
import { listIngredients } from './app/useCases/ingredients/listIngredients';
import { deleteIngredient } from './app/useCases/ingredients/deleteUser';
import { updateProduct } from './app/useCases/products/updateProduct';


export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  })
});

// List categories
router.get('/categories', AuthMiddleware, listCategories);
router.get('/categories/:categoryId', AuthMiddleware, getCategoryById);

// Create category
router.post('/categories', AuthMiddleware, createCategory);

// List product
router.get('/products', AuthMiddleware, listProducts);

// Create Product
router.post('/products', AuthMiddleware, upload.single('image'), createProduct);
router.patch('/products/:productId', AuthMiddleware, upload.single('image'), updateProduct);

// Delete product
router.delete('/products/:productId', AuthMiddleware, deleteProduct);

router.post('/ingredients', AuthMiddleware, createIngredient);
router.get('/ingredients', AuthMiddleware, listIngredients);
router.delete('/ingredients/:ingredientId', AuthMiddleware, deleteIngredient);

// Get products by category
router.get('/categories/:categoryId/products', AuthMiddleware, listProductByCategory);

router.patch('/categories/:categoryId', AuthMiddleware, editCategory);

// Delete category
router.delete('/categories/:categoryId', AuthMiddleware, deleteCategory);

// List orders
router.get('/orders', AuthMiddleware, listOrders);
router.get('/orders/all', AuthMiddleware, listAllOrders);

// Create order
router.post('/orders', AuthMiddleware, createOrder);

// Change order Status
router.patch('/orders/:orderId', AuthMiddleware, changeOrderStatus);

// Reset daily orders
router.post('/orders/reset', AuthMiddleware, resetDayOrders);

// Delete/cancel order
router.delete('/orders/:orderId', AuthMiddleware, cancelOrder);

router.post('/users', AuthMiddleware, createUser);

router.post('/auth', AuthController.authenticate);

router.get('/users', AuthMiddleware, listUsers);

router.delete('/users/:userId', AuthMiddleware, deleteUser);
