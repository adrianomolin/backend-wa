import { Request, Response } from 'express';
import { getDBModel } from '../../../tenant/utils/switchDb';

export async function resetDayOrders(req: Request, res: Response) {
  try {
    const tenant = req.tenant;
    const model = await getDBModel(tenant, 'Order');

    const orders = await model.find()
      .where({ archived: false })
      .updateMany({ archived: true });

    res.json(orders);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
