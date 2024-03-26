import { Request, Response } from 'express';
import { getDBModel } from '../../../tenant/utils/switchDb';

export async function listProducts(req: Request, res: Response) {
  try {
    const tenant = req.tenant;
    const model = await getDBModel(tenant, 'Product');

    const products = await model.find()
      .populate('category')
      .populate('ingredients.ingredient');

    res.json(products);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
