import { Request, Response } from 'express';
import { getDBModel } from '../../../tenant/utils/switchDb';

export async function listIngredients(req: Request, res: Response) {
  try {
    const tenant = req.tenant;

    const model = await getDBModel(tenant, 'Category');
    const ingredients = await model.find();

    res.json(ingredients);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
