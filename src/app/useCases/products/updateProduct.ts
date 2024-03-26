import { Request, Response } from 'express';
import { getDBModel } from '../../../tenant/utils/switchDb';

export async function updateProduct(req: Request, res: Response) {
  try {
    const tenant = req.tenant;
    const { productId } = req.params;
    const { image, name, description, category, price, ingredients } = req.body;

    const ingredientData: object[] = [];

    const model = await getDBModel(tenant, 'Product');

    JSON.parse(ingredients).map((ingredient: string) => {
      ingredientData.push({
        ingredient: ingredient
      });
    });

    await model.findByIdAndUpdate(productId, {
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
