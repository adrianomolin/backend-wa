import { Request, Response } from 'express';

import { Order } from '../../models/Order';

export async function listAllOrders(req: Request, res: Response) {
  try {
    const orders = await Order.find()
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
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
