import { Request, Response } from 'express';
import { getDBModel } from '../../../tenant/utils/switchDb';

export async function listProductByCategory(req: Request, res: Response) {
  try {
    const tenant = req.tenant;
    const { categoryId } = req.params;

    const model = await getDBModel(tenant, 'Category');
    const products = await model.find().where('category').equals(categoryId);

    res.json(products);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
