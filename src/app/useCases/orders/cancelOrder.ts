import { Request, Response } from 'express';
import { getDBModel } from '../../../tenant/utils/switchDb';

export async function cancelOrder(req: Request, res: Response) {
  try {
    const tenant = req.tenant;
    const { orderId } = req.params;

    const model = await getDBModel(tenant, 'Order');
    await model.findByIdAndDelete(orderId);

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
