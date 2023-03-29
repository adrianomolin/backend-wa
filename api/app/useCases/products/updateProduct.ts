import { Request, Response } from 'express';

import { Product } from '../../models/Product';

export async function updateProduct(req: Request, res: Response) {
  try {
    const { productId } = req.params;
    const { image, name, description, category, price, ingredients } = req.body;

    const ingredientData: object[] = [];

    JSON.parse(ingredients).map((ingredient: string) => {
      ingredientData.push({
        ingredient: ingredient
      });
    });

    await Product.findByIdAndUpdate(productId, {
      image,
      name,
      description,
      category,
      price,
      ingredients: ingredientData,
    });

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
