import { Request, Response } from 'express';
import { getDBModel } from '../../../tenant/utils/switchDb';

export async function deleteIngredient(req: Request, res: Response) {
  try {
    const tenant = req.tenant;
    const { ingredientId } = req.params;

    const model = await getDBModel(tenant, 'Ingredient');
    await model.findByIdAndDelete(ingredientId);

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
