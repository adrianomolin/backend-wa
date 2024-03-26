import { Request, Response } from 'express';
import { getDBModel } from '../../../tenant/utils/switchDb';

export async function resetOrderById(req: Request, res: Response) {
  try {
    const tenant = req.tenant;
    const { orderId } = req.params;

    const model = await getDBModel(tenant, 'Order');
    const order = await model.findByIdAndUpdate(orderId, { archived: true });

    res.status(201).json(order);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
