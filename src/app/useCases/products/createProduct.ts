import { Request, Response } from 'express';
import { uploadImage } from '../../utils/uploadFile';
import { getDBModel } from '../../../tenant/utils/switchDb';

export async function createProduct(req: Request, res: Response) {
  try {
    const tenant = req.tenant;
    const { name, description, price, category, ingredients } = req.body;

    const model = await getDBModel(tenant, 'Product');

    if (!req.file) {
      res.status(400).send('No file uploaded.');
      return;
    }

    const imagePath = await uploadImage(req.file);

    const ingredientData: object[] = [];

    JSON.parse(ingredients).map((ingredient: string) => {
      ingredientData.push({
        ingredient: ingredient
      });
    });

    const product = await model.create({
      name,
      description,
      imagePath,
      price: Number(price),
      category,
      ingredients: ingredientData,
    });

    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
