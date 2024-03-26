import { Request, Response } from 'express';
import { getDBModel } from '../../../tenant/utils/switchDb';

export async function editCategory(req: Request, res: Response) {
  try {
    const tenant = req.tenant;
    const { icon, name } = req.body;
    const { categoryId } = req.params;

    const model = await getDBModel(tenant, 'Category');
    const category = await model.findByIdAndUpdate(categoryId, { icon, name });

    res.status(201).json(category);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
