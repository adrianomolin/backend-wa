import { Request, Response } from 'express';
import { getDBModel } from '../../../tenant/utils/switchDb';

export async function listCategories(req: Request, res: Response) {
  try {
    const tenant = req.tenant;

    const model = await getDBModel(tenant, 'Category');
    const categories = await model.find();

    res.json(categories);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
