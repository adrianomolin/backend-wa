import { Request, Response } from 'express';
import { io } from '../../..';
import { getDBModel } from '../../../tenant/utils/switchDb';

export async function createOrder(req: Request, res: Response) {
  try {
    const tenant = req.tenant;
    const { table, products } = req.body;

    const model = await getDBModel(tenant, 'Order');

    const order = await model.create({ table, products });
    const orderDetails = await order.populate('products.product');

    io.emit('orders@new', orderDetails);
    res.status(201).json(order);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
