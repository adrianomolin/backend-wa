import { Request, Response } from 'express';
import { Product } from '../../models/Product';
import storage from '../../utils/storage';

const bucket = storage.bucket('waiterapp');

export async function deleteProduct(req: Request, res: Response) {
  try {
    const { productId } = req.params;

    if (req.headers['demo'] === 'true') return res.sendStatus(204);

    const product = await Product.findById(productId);
    if (product?.imagePath) bucket.file(product.imagePath).delete();

    await Product.findByIdAndDelete(productId);

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
