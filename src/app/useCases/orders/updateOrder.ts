import { Request, Response } from 'express';
import { getDBModel } from '../../../tenant/utils/switchDb';

export async function updateOrder(req: Request, res: Response) {
  try {
    const tenant = req.tenant;
    const { orderId } = req.params;
    const { table, status, products } = req.body;

    const model = await getDBModel(tenant, 'Order');

    if (!['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status)) {
      return res.status(400).json({
        error: 'Status should be one of these: WAITING, IN_PRODUCTION, DONE.'
      });
    }

    await model.findByIdAndUpdate(orderId, { table, status, products });

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
