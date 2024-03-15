import { Request, Response } from 'express';

import { Ingredient } from '../../models/Ingredient';

export async function deleteIngredient(req: Request, res: Response) {
  try {
    const { ingredientId } = req.params;

    if (req.headers['demo'] === 'true') return res.sendStatus(204);

    await Ingredient.findByIdAndDelete(ingredientId);

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
