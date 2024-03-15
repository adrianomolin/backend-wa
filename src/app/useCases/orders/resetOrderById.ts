import { Request, Response } from 'express';

import { Order } from '../../models/Order';

export async function resetOrderById(req: Request, res: Response) {
  try {
    const { orderId } = req.params;

    if (req.headers['demo'] === 'true') return res.sendStatus(201);

    const order = await Order.findByIdAndUpdate(orderId, { archived: true });

    res.status(201).json(order);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
