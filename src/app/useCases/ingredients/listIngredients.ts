import { Request, Response } from 'express';

import { Ingredient } from '../../models/Ingredient';

export async function listIngredients(req: Request, res: Response) {
  try {
    const ingredients = await Ingredient.find();

    res.json(ingredients);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
