import { Request, Response } from 'express';

import { Order } from '../../models/Order';

export async function resetOrderById(req: Request, res: Response) {
  try {
    const { orderId } = req.params;
    const orders = await Order.findByIdAndUpdate(orderId, { archived: true });

    res.status(201).json(orders);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
