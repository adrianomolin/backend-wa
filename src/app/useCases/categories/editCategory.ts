import { Request, Response } from 'express';

import { Category } from '../../models/Category';

export async function editCategory(req: Request, res: Response) {
  try {
    const { icon, name } = req.body;
    const { categoryId } = req.params;

    if (req.headers['demo'] === 'true') {
      const editedCategory = await Category.findById(categoryId);

      return res.status(200).json({
        ...editedCategory,
        icon,
        name,
      });
    };

    const category = await Category.findByIdAndUpdate(categoryId, { icon, name });

    res.status(201).json(category);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
