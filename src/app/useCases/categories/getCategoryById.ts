import { Request, Response } from 'express';

import { Category } from '../../models/Category';

export async function getCategoryById(req: Request, res: Response) {
  try {
    const { categoryId } = req.params;
    const categories = await Category.findById(categoryId);

    res.json(categories);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
