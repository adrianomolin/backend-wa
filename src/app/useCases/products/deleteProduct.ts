import fs from 'fs';
import { Request, Response } from 'express';


import { Product } from '../../models/Product';

export async function deleteProduct(req: Request, res: Response) {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    const path = `${__dirname}/../../../../uploads/${product?.imagePath}`;

    fs.unlink(path, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('File removed: ', path);
      }
    });

    await Product.findByIdAndDelete(productId);

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
