import { Request, Response } from 'express';
import { getDBModel } from '../../../tenant/utils/switchDb';

export async function createCategory(req: Request, res: Response) {
  try {
    const tenant = req.tenant;
    const { icon, name } = req.body;

    if (!name) {
      res.status(400).json({
        'error': 'Name is required',
      });
    }

    const model = await getDBModel(tenant, 'Category');
    const category = await model.create({ icon, name });

    res.status(201).json(category);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
