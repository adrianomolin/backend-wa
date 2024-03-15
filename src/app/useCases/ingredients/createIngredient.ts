import { Request, Response } from 'express';
import { Ingredient } from '../../models/Ingredient';

export async function createIngredient(req: Request, res: Response) {
  try {
    const { icon, name } = req.body;

    if (!name) {
      res.status(400).json({
        'error': 'Name is required',
      });
    }

    if (req.headers['demo'] === 'true') {
      return res.status(201).json({
        name,
        icon,
        _id: 'demo-' + Math.random(),
      });
    }

    const ingredient = await Ingredient.create({ icon, name });

    res.status(201).json(ingredient);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
