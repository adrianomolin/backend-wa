import { Request, Response } from 'express';

import { Order } from '../../models/Order';

export async function updateOrder(req: Request, res: Response) {
  try {
    const { orderId } = req.params;
    const { table, status, products } = req.body;

    if (!['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status)) {
      return res.status(400).json({
        error: 'Status should be one of these: WAITING, IN_PRODUCTION, DONE.'
      });
    }

    if (req.headers['demo'] === 'true') return res.sendStatus(204);

    await Order.findByIdAndUpdate(orderId, { table, status, products });

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
