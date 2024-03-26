import { Request, Response } from 'express';
import { getDBModel } from '../../../tenant/utils/switchDb';

export async function listAllOrders(req: Request, res: Response) {
  try {
    const tenant = req.tenant;
    const model = await getDBModel(tenant, 'Order');

    const orders = await model.find()
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
