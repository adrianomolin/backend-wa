import { Request, Response } from 'express';
import { getDBModel } from '../../../tenant/utils/switchDb';

export async function getCategoryById(req: Request, res: Response) {
  try {
    const tenant = req.tenant;
    const { categoryId } = req.params;

    const model = await getDBModel(tenant, 'Category');
    const categories = await model.findById(categoryId);

    res.json(categories);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
