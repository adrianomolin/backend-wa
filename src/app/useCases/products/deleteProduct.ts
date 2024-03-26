import { Request, Response } from 'express';
import storage from '../../utils/storage';
import { getDBModel } from '../../../tenant/utils/switchDb';

const bucket = storage.bucket('waiterapp');

export async function deleteProduct(req: Request, res: Response) {
  try {
    const tenant = req.tenant;
    const { productId } = req.params;

    const model = await getDBModel(tenant, 'Product');

    const product = await model.findById(productId);
    if (product?.imagePath) bucket.file(product.imagePath).delete();

    await model.findByIdAndDelete(productId);

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
