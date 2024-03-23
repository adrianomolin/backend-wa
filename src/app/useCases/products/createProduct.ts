import { Request, Response } from 'express';

import { Product } from '../../models/Product';
import { uploadImage } from '../../utils/uploadFile';

export async function createProduct(req: Request, res: Response) {
  try {
    const { name, description, price, category, ingredients } = req.body;

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

    if (req.headers['demo'] === 'true') return res.sendStatus(201).json({
      name,
      description,
      imagePath,
      price: Number(price),
      category,
      ingredients: ingredientData,
    });

    const product = await Product.create({
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
