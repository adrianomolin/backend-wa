import { Request, Response } from 'express';

import { Order } from '../../models/Order';

export async function resetDayOrders(req: Request, res: Response) {
  try {
    if (req.headers['demo'] === 'true') return res.json([]);

    const orders = await Order.find()
      .where({ archived: false })
      .updateMany({ archived: true });

    res.json(orders);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
